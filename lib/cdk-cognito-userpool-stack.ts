import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';

// extended stack environment props
import { ICdkCognitoUserpoolStackProps } from '../bin/stack-environment-types';

export class CdkCognitoUserpoolStack extends Stack {
  constructor(scope: Construct, id: string, props: ICdkCognitoUserpoolStackProps) {
    super(scope, id, props);

    /**
     * @googleClientId  Getting clientid from secrets manager instead of saving in project.
     * @googleClientSecret  Getting clientsecret from secrets manager instead of saving in project.
     */
    const googleClientId = secretsmanager.Secret.fromSecretNameV2(this, 'clientid', props.googleClientId);
    const googleClientSecret = secretsmanager.Secret.fromSecretNameV2(this, 'clientsecret', props.googleClientSecret);

    /**
     * @userpool Creating a configured userpool to store users.
     */
    const userPool = new cognito.UserPool(this, 'userpool', {
      userPoolName: props.userPoolName,
      removalPolicy: RemovalPolicy.RETAIN,
      accountRecovery: cognito.AccountRecovery.NONE,
      signInAliases: {
        email: true,
        username: true,
        phone: false,
        preferredUsername: false,
      },
      email: cognito.UserPoolEmail.withSES({
        fromEmail: props.email.fromEmail,
        fromName: props.email.fromName,
        replyTo: props.email.replyTo,
      }),
      userInvitation: {
        emailSubject: props.userInvitation.emailSubject,
        emailBody: props.userInvitation.emailBody,
      },
      standardAttributes: {
        nickname: { required: true },
        email: { required:true },
        profilePicture: { required: false },
      },
      autoVerify: {
        email: true,
      },
    });

    /**
     * @googleLogin Creating a google login client to register on userpool.
     */
    const googleLogin = new cognito.UserPoolIdentityProviderGoogle(this, 'google-login', {
      userPool,
      clientId: googleClientId.secretValue.toString(),
      clientSecret: googleClientSecret.secretValue.toString(),
      attributeMapping: {
        nickname: cognito.ProviderAttribute.GOOGLE_NAME,
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
      },
    });
    userPool.registerIdentityProvider(googleLogin);

    /**
     * @userPoolClient Creating a client for users to interact with.
     */
    const userPoolClient = new cognito.UserPoolClient(this, 'userpool-client', {
      userPoolClientName: props.userPoolClientName,
      userPool,
      accessTokenValidity: Duration.hours(props.accessTokenValidity),
      idTokenValidity: Duration.hours(props.idTokenValidity),
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.PROFILE],
      },
    });
    userPoolClient.node.addDependency(googleLogin);

    /**
     * @domainCertificate Get domain certificate to add custom domain to userpool.
     */
    const domainCertificate = certificatemanager.Certificate.fromCertificateArn(this, 'certificate', props.domainCertificateArn);
    userPool.addDomain('userpool-domain', {
      customDomain: {
        domainName: props.domainName,
        certificate: domainCertificate,
      },
    });
  }
}

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import devEnvironmentConfig from '../bin/dev-stack-config';
import * as Stack from '../lib/cdk-cognito-userpool-stack';

const app = new cdk.App();
const stack = new Stack.CdkCognitoUserpoolStack(app, 'MyTestStack', devEnvironmentConfig);
const template = Template.fromStack(stack);

test('UserPool', () => {
  template.hasResourceProperties('AWS::Cognito::UserPool', {
    UserPoolName: 'userpool',
    AccountRecoverySetting: {
      RecoveryMechanisms: [
        {
          Name: 'admin_only',
        },
      ],
    },
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: true,
      InviteMessageTemplate: {
        EmailMessage: 'email body',
        EmailSubject: 'email subject',
      },
    },
    AliasAttributes: [
      'email',
    ],
    AutoVerifiedAttributes: [
      'email',
    ],
    EmailConfiguration: {
      EmailSendingAccount: 'DEVELOPER',
      From: 'your name <noreply@domain.com>',
      ReplyToEmailAddress: 'support@domain.com',
    },
    EmailVerificationMessage: 'The verification code to your new account is {####}',
    EmailVerificationSubject: 'Verify your new account',
    Schema: [
      {
        Mutable: true,
        Name: 'nickname',
        Required: true,
      },
      {
        Mutable: true,
        Name: 'email',
        Required: true,
      },
      {
        Mutable: true,
        Name: 'picture',
        Required: false,
      },
    ],
  });
});

test('UserPoolIdentityProviderGoogle', () => {
  template.hasResourceProperties('AWS::Cognito::UserPoolIdentityProvider', {
    ProviderName: 'Google',
    ProviderType: 'Google',
    AttributeMapping: {
      nickname: 'name',
      email: 'email',
      picture: 'picture',
    },
  });
});

test('UserPoolClient', () => {
  template.hasResourceProperties('AWS::Cognito::UserPoolClient', {
    ClientName: 'userpool-client',
    AccessTokenValidity: 480,
    IdTokenValidity: 480,
    TokenValidityUnits: {
      AccessToken: 'minutes',
      IdToken: 'minutes',
    },
    AllowedOAuthFlows: [
      'implicit',
    ],
    AllowedOAuthFlowsUserPoolClient: true,
    AllowedOAuthScopes: [
      'profile',
      'openid',
    ],
  });
});

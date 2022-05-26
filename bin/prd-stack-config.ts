import { ICdkCognitoUserpoolStackProps } from './stack-environment-types';

const prdEnvironmentConfig: ICdkCognitoUserpoolStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkCognitoUserpool',
  },
  environment: 'prd',
  userPoolName: 'userpool',
  userPoolClientName: 'userpool-client',
  googleClientId: 'google-clientid-secret',
  googleClientSecret: 'google-clientsecret-secret',
  accessTokenValidity: 8,
  idTokenValidity: 8,
  domainName: 'domain-name',
  domainCertificateArn: 'arn::::',
  email: {
    fromEmail: 'noreply@domain.com',
    fromName: 'your name',
    replyTo: 'support@domain.com',
    region: 'eu-west-1',
  },
  userInvitation: {
    emailSubject: 'email subject',
    emailBody: 'email body',
  },
};

export default prdEnvironmentConfig;
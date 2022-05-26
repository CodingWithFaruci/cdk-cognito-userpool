import { StackProps } from 'aws-cdk-lib';

export interface ICdkCognitoUserpoolStackProps extends StackProps {
  environment: string,
  userPoolName: string,
  userPoolClientName: string,
  googleClientId: string,
  googleClientSecret: string,
  accessTokenValidity: number,
  idTokenValidity: number
  domainName: string,
  domainCertificateArn: string,
  email: {
    fromEmail: string,
    fromName: string,
    replyTo: string,
    region: string,
  },
  userInvitation: {
    emailSubject: string,
    emailBody: string,
  }
}
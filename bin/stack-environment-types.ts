import { StackProps } from 'aws-cdk-lib';

export interface ICdkCognitoUserpoolStackProps extends StackProps {
  environment: string
}
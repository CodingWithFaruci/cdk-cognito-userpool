import { ICdkCognitoUserpoolStackProps } from './stack-environment-types';

const prdEnvironmentConfig: ICdkCognitoUserpoolStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkCognitoUserpool',
  },
  environment: 'prd',
};

export default prdEnvironmentConfig;
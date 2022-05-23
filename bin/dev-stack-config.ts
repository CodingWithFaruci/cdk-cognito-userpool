import { ICdkCognitoUserpoolStackProps } from './stack-environment-types';

const devEnvironmentConfig: ICdkCognitoUserpoolStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkCognitoUserpool',
  },
  environment: 'dev',
};

export default devEnvironmentConfig;
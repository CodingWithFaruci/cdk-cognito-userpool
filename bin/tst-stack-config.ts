import { ICdkCognitoUserpoolStackProps } from './stack-environment-types';

const tstEnvironmentConfig: ICdkCognitoUserpoolStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'CdkCognitoUserpool',
  },
  environment: 'tst',
};

export default tstEnvironmentConfig;
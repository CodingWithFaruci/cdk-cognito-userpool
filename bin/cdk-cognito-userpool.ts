#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCognitoUserpoolStack } from '../lib/cdk-cognito-userpool-stack';

// importing configuration based on environment
import devEnvironmentConfig from './dev-stack-config';
import tstEnvironmentConfig from './tst-stack-config';
import prdEnvironmentConfig from './prd-stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new CdkCognitoUserpoolStack(app, 'cdk-cognito-userpool-dev', devEnvironmentConfig);
new CdkCognitoUserpoolStack(app, 'cdk-cognito-userpool-tst', tstEnvironmentConfig);
new CdkCognitoUserpoolStack(app, 'cdk-cognito-userpool-prd', prdEnvironmentConfig);
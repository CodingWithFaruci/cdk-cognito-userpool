#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCognitoUserpoolStack } from '../lib/cdk-cognito-userpool-stack';

// importing configuration based on environment
import environmentConfig from './stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new CdkCognitoUserpoolStack(app, 'cdk-cognito-userpool', environmentConfig);
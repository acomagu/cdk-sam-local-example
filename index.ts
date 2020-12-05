import * as apigateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';

class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, 'Func', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda-handler'),
    });

    const api = new apigateway.RestApi(this, 'Api');
    api.root.addMethod('GET', new apigateway.LambdaIntegration(handler));
  }
}

new MyStack(new cdk.App(), 'MyStack');

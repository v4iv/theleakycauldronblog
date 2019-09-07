---
templateKey: article-page
title: Use Serverless Lambda API Gateway for Binary Response
date: 2019-09-07T12:39:59.122Z
cover: /img/serverless-binary-transfer-thomas-griesbeck.jpg
meta_title: Leverage Serverless Lambda API Gateway for Binary Response
meta_description: >-
  Leverage Serverless Framework to configure Lambda API Gateway for Binary
  Response.
tags:
  - Serverless
  - Lambda
  - API Gateway
  - NodeJS
---
Serverless framework is an amazing tool, but a few things either works differently or is not present at all. One of those not so straight things is [sending binary data via API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-payload-encodings.html). It took me a while to get how to do this, so I thought I should make it easier for the next Person.

All you have to do is reconfigure your response, add a few plugins, make the required settings, and just run it!

## Setting up the Response

For that, lets suppose, that we are making a lambda function that does some processing on the image and returns the image in binary format.

Lets say there's a function that does the processing on the image and returns it to a variable. So ideally this'll be how you'd write it.

```javascript
 module.exports.handler = async (event, context, callback) => {
    const data = processImageAndReturn()

    const image = new Buffer(data, 'base64');

    callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: image,
    })
};
```

But to make it work through API Gateway, we need to add two things to our response, base64 string as body and `isBase64Encoded` flag enabled.

```javascript
 module.exports.handler = async (event, context, callback) => {
    const data = processImageAndReturn()

    const image = new Buffer(data, 'base64');

    callback(null, {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: image.toString('base64'),
        isBase64Encoded: true,
    })
};
```

## Adding a few Plugins

Next, we install two plugins [`serverless-apigw-binary`](https://github.com/maciejtreder/serverless-apigw-binary) and [`serverless-apigwy-binary`](https://github.com/ryanmurakami/serverless-apigwy-binary) to our project.

```bash
yarn add serverless-apigw-binary serverless-apigwy-binary
```

or

```bash
npm install serverless-apigw-binary serverless-apigwy-binary --save
```

and add them to our plugins list in `serverless.yml`

```yaml
plugins:
  - serverless-apigw-binary
  - serverless-apigwy-binary
  - serverless-offline
  - ...
```

## Configuring our serverless.yml

Now we need to add the following to `serverless.yml`

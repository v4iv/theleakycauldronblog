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

For the lets suppose that we are making a lambda function that does some

## Add a few Plugins

...

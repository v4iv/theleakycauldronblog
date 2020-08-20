---
templateKey: article-page
title: Use Serverless Lambda API Gateway for Binary Response
slug: use-serverless-lambda-api-gateway-for-binary-response
author: Vaibhav Sharma
author_link: https://theleakycauldronblog.com
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
The [Serverless Framework](https://serverless.com) is an amazing tool, but a few things either work differently or are not present at all. One of those not so straight things is [sending binary data via API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-payload-encodings.html). It took me a while to get how to do this, so I thought I should make it easier for the next person.

All you have to do is reconfigure your response, add a few plugins, make the required settings, and just run it!

## Setting up the Response

For that, let's suppose that we are making a lambda function that does some processing on the image and returns the image in binary format.

Let's say there's a function that does the processing on the image and returns it to a variable. In case of a regular express server, this is how you'd write it.

```javascript
 module.exports.handler = async (event, context, callback) => {
    const data = processImageAndReturn()
    /* for example
    const data = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABRNJREFUeNrkV19oHEUYn2/vLs8L0gchyoWIf1okexFU9OXuRfAPeBFRbNFctFK1sUnwwbc2om8KuVQQqujlCEGFQq61IPbBO62ICm02ok2hD66I9EGQfe3tzH5+Mzu7O5vbS2pLH8SDycxsZr/v9/37zbeM/d9/cL0v7n3h0yrjgjEesgLNFs2bp1/q3TQAY0fOlIucz5W4kIqdSHkEQCoviGjNROgxjh0Iw2X369e8GwYw+uZZG4VYKnLRGAkEK0mlAY+UaRARgGgPAhnSngAQGAKCuLDx7exQINZOym8/2nVYwdpgAA2JFQkuKtgQQdfDfI7639q6Oj3YmHz4/fq/BnDHO+ccy4IuSSnLfaQEcnymUcCgTzFa2wRqvfLQ8cY1Ayi/+6ODltUFABuUtZAoj2ZzsEHlyiuQhYisNfngcn1XAKPHL9ihBesk3I59CbGrcz0QuR/1IdBgwdCOKbjW5APN8o4AQrDmSUoZY+OkQB1bjC0z4p94YVBZXlhsGktDAdz64S82WjCHkHUzsDSz0HSJqSFderRs0spTiTuYMfX77m86uQBCme3AlOvRCHG8IGArqASzbV5IwuOSxyruV4cW6FwnEz8jXPSbywVAiTcdK0+zW1tOyr3lJ2Yuf1Afo22FKSvBT4STcjpTc88c9J1HTpARVIJmvkAqi8nyzCOiPZ9cwmI/YBaN0tWAFWgWRDq8zxnSTIQz88fSYysZSt6/ts6EKBMB1X49Oe07j39ExBV2ae8wociISCkaTA7UazLi/E/zbuKBW1YvV83EQkjdB0mpY2v89dOtRPn0Zw2ZsDSU8oknP7bJC8Qd4GznWsypdvmnaLoIjYyP4w4GEIykNe56dd0p9HmbLJxmFtQurj3v6zAtAaBjckGchjnVK891iilrRTUcazXr2vSCBuGQYoYh1LZWn/MNoX6WC9AgJm0HDiMioJf1wcRinYyQhqVJ78tkcylha1utZ/xtVi0P5YIhV6BZBXZc/2gCAeN2YVAnnvBktm+deMq/p/G5TX3B4r4Da5Jg2M+dF2WJujEtxAZgDnOqc2YO/L1/vEeJyEwSkmvL4AIS2KZSXFQJ+PJJm67krgwHJfYEzVNaVBvks6SU0TAgA8UbpGKAHkJ6kyXpY4HLLKvy53uPKuV3Hj5FmW/pbFcv1Pc+u7qopXTQvCHNUKRc4MkSzFaB0optOlCNgKjDHr146vfFqmK10Te+tKnxmA+pM0KL2VlGxmP7nm57rM9d0OCHdjsAnVwiohDYwMVvpT73oR90Sv1gs3i174eBcHg/mKC5XiBCKqnOiIgpEElXJEkHAtWa+cBDW+2jFk0RkOyUmCYk6pLGzv8w5+Xm6J7WpUVScswiJiQATDJj2BeMB3KWbEjKCcSIbMVMALIdUw0q9YjUH6q2jJSjZEIJRjMiebl54fsjC0Ov479m7qZYUswTUkrLMC0GyJaacRXHnVNuXwAq8d7atSMCDKdQ8cLglZxhSrM7Yjv1BRCT1BRZ7+8K4Mqhez1yVY2E+GheyQZrhjkeSMkrxaP3vuSOje9m3WtuSq/MVlzq4+S122MxTcPwzjj1AGxTriqp5n5z2L3uD5Pxt8/VORetMOA2DVYMokSU3wgQJ6JIvxGsKAF9IqplFobNzbOv+Df8ZXTb0a6NnNcxENOFQFRlFchShEwlyNITLnFFmwCsbH5x0L9p34bUF1RHyAuq1tWXkmAX1w702H/t948AAwB2KniI5bC6ZgAAAABJRU5ErkJggg==";
    end example */

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

    /* for example
    const data = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABRNJREFUeNrkV19oHEUYn2/vLs8L0gchyoWIf1okexFU9OXuRfAPeBFRbNFctFK1sUnwwbc2om8KuVQQqujlCEGFQq61IPbBO62ICm02ok2hD66I9EGQfe3tzH5+Mzu7O5vbS2pLH8SDycxsZr/v9/37zbeM/d9/cL0v7n3h0yrjgjEesgLNFs2bp1/q3TQAY0fOlIucz5W4kIqdSHkEQCoviGjNROgxjh0Iw2X369e8GwYw+uZZG4VYKnLRGAkEK0mlAY+UaRARgGgPAhnSngAQGAKCuLDx7exQINZOym8/2nVYwdpgAA2JFQkuKtgQQdfDfI7639q6Oj3YmHz4/fq/BnDHO+ccy4IuSSnLfaQEcnymUcCgTzFa2wRqvfLQ8cY1Ayi/+6ODltUFABuUtZAoj2ZzsEHlyiuQhYisNfngcn1XAKPHL9ihBesk3I59CbGrcz0QuR/1IdBgwdCOKbjW5APN8o4AQrDmSUoZY+OkQB1bjC0z4p94YVBZXlhsGktDAdz64S82WjCHkHUzsDSz0HSJqSFderRs0spTiTuYMfX77m86uQBCme3AlOvRCHG8IGArqASzbV5IwuOSxyruV4cW6FwnEz8jXPSbywVAiTcdK0+zW1tOyr3lJ2Yuf1Afo22FKSvBT4STcjpTc88c9J1HTpARVIJmvkAqi8nyzCOiPZ9cwmI/YBaN0tWAFWgWRDq8zxnSTIQz88fSYysZSt6/ts6EKBMB1X49Oe07j39ExBV2ae8wociISCkaTA7UazLi/E/zbuKBW1YvV83EQkjdB0mpY2v89dOtRPn0Zw2ZsDSU8oknP7bJC8Qd4GznWsypdvmnaLoIjYyP4w4GEIykNe56dd0p9HmbLJxmFtQurj3v6zAtAaBjckGchjnVK891iilrRTUcazXr2vSCBuGQYoYh1LZWn/MNoX6WC9AgJm0HDiMioJf1wcRinYyQhqVJ78tkcylha1utZ/xtVi0P5YIhV6BZBXZc/2gCAeN2YVAnnvBktm+deMq/p/G5TX3B4r4Da5Jg2M+dF2WJujEtxAZgDnOqc2YO/L1/vEeJyEwSkmvL4AIS2KZSXFQJ+PJJm67krgwHJfYEzVNaVBvks6SU0TAgA8UbpGKAHkJ6kyXpY4HLLKvy53uPKuV3Hj5FmW/pbFcv1Pc+u7qopXTQvCHNUKRc4MkSzFaB0optOlCNgKjDHr146vfFqmK10Te+tKnxmA+pM0KL2VlGxmP7nm57rM9d0OCHdjsAnVwiohDYwMVvpT73oR90Sv1gs3i174eBcHg/mKC5XiBCKqnOiIgpEElXJEkHAtWa+cBDW+2jFk0RkOyUmCYk6pLGzv8w5+Xm6J7WpUVScswiJiQATDJj2BeMB3KWbEjKCcSIbMVMALIdUw0q9YjUH6q2jJSjZEIJRjMiebl54fsjC0Ov479m7qZYUswTUkrLMC0GyJaacRXHnVNuXwAq8d7atSMCDKdQ8cLglZxhSrM7Yjv1BRCT1BRZ7+8K4Mqhez1yVY2E+GheyQZrhjkeSMkrxaP3vuSOje9m3WtuSq/MVlzq4+S122MxTcPwzjj1AGxTriqp5n5z2L3uD5Pxt8/VORetMOA2DVYMokSU3wgQJ6JIvxGsKAF9IqplFobNzbOv+Df8ZXTb0a6NnNcxENOFQFRlFchShEwlyNITLnFFmwCsbH5x0L9p34bUF1RHyAuq1tWXkmAX1w702H/t948AAwB2KniI5bC6ZgAAAABJRU5ErkJggg==";
    end example */

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

Now we need to add the following to `serverless.yml`. First, to the provider section, add `apiGateway`

```yaml
provider:
  name: aws
  runtime: nodejs8.10
  stage: dev
  apiGateway:
    binaryMediaTypes:
      - '*/*'
```

then we add `apigwBinary` to custom section

```yaml
custom:
  serverless-offline:
    port: 8000
  apigwBinary:
    types:           #list of mime-types
      - 'image/png'
      - 'image/jpeg'
```

and finally to the functions section, `contentHandling: CONVERT_TO_BINARY` is added to the handler's route

```yaml
functions:
  screenshot:
    handler: src/index.handler
    timeout: 50
    events:
      - http:
          method: get
          path: image
          cors: true
          contentHandling: CONVERT_TO_BINARY

```

Now run it, to test it and you should be done.

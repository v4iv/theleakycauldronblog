---
templateKey: article-page
title: Writing Tests for Authenticated APIs in Django REST Framework
date: '2018-04-13T12:17:50+05:30'
cover: /img/django.png
tags:
  - Django
  - DRF
  - API
  - Testing
  - Authentication
meta_title: Writing Tests for Authenticated Routes in Django REST Framework
meta_description: >-
  How to write tests for Django OAuth Toolkit Authenticated APIs in Django REST
  Framework.
---
If you are new to Django Rest Framework and Django Oauth Toolkit and are having trouble writing automated tests for your `is_authenticated` APIs, you have come to the write place. The problem arises because for a token to be generated we need to first create an application and then retrieve it's `client_id` and `client_secret` before sending it along with username and password for generating `access_token`.

Before beginning though we're gonna work on the following assumptions:

* There's a model called Books.
* There's a `generic.ListAPIView`, with URL name `contacts:list` 
* The permission on the URL is `is_authenticated` 

Now that, that's out of the way, we can begin the fun part.

In your `tests.py` file we create a class called BookListTest:

```
from rest_framework.test import APITestCase




class BookListTest(APITestCase):

    pass


```

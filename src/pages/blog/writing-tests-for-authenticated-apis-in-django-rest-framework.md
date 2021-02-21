---
templateKey: article-page
title: Writing Tests for Authenticated APIs in Django REST Framework
slug: writing-tests-for-authenticated-apis-in-django-rest-framework
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: '2018-04-13T12:17:50+05:30'
cover: /img/authenticated_api_testing.jpg
metaTitle: Writing Tests for Authenticated Routes in Django REST Framework
metaDescription: >-
  How to write tests for Django OAuth Toolkit Authenticated APIs in Django REST
  Framework.
tags:
  - django
  - API
  - testing
  - authentication
  - python
---
If you are new to [Django Rest Framework](http://www.django-rest-framework.org/) and [Django OAuth Toolkit](http://dot.evonove.it/) and are having trouble writing automated tests for your `is_authenticated` APIs, you have come to the right place. The problem arises because for a token to be generated we need to first create an application and then retrieve its `client_id` and `client_secret` before sending it along with username and password for generating `access_token`.

Before beginning, though we're gonna work on the following assumptions:

* There's a model called Books.
* There's a `generic.ListAPIView`, with URL name `books:list` 
* The permission on the URL is `is_authenticated` 

Now that, that's out of the way, we can begin the fun part.

In your `tests.py` file we create a class called BookListTest:

```python
from rest_framework.test import APITestCase




class BookListTest(APITestCase):

    pass
```

To begin testing, we need a few things set up first, to do so we use the `setUp` method. Here we will, first create a `test user`, set up a dummy `application`, then create `two dummy book entries`, and finally define our `fetch url`.

```python
class BookListTest(APITestCase):
    def setUp(self):
        # Create a Test User.
        self.test_user = User.objects.create_user('test','user','testuser', 'test@example.com','testpassword')
        # Set Up a Test Application
        self.application = Application(
            name = "Test Application",
            redirect_uris = "http://localhost",
            user = self.test_user,
            client_type = Application.CLIENT_CONFIDENTIAL,
            authorization_grant_type = Application.GRANT_AUTHORIZATION_CODE,
        )
        self.application.save()
        # Create Entries in our model to fetch the list of.
        self.foo_book = Book(
            title = "foo"
            author = "bar author"
        )
        self.foo_book.save()
        self.bar_book = Book(
            title = "bar"
            author = "foo author"
        )
        self.bar_book.save()
        # URL to fetch the list of the books.
        self.fetch_url = reverse("books:list")
```

Everything we write in the above function is created at the beginning of every Test. Now let's come to writing the actual test. To do that we'll need an `access_token`, and will have to set the `authorization header` with the `bearer token`.

```python
class BookListTest(APITestView):
    def setUp(self):
    ...
    def test_list_books(self):
        """
        Ensure we can list all the books.
        """
        # Create A Token
        tok = AccessToken.objects.create(
            user = self.test_user,
            token = '1234567890',
            application = self.application,
            scope = 'read write',
            expires = timezone.now() + datetime.timedelta(days=1)
        )
        # Set Authorization Header
        auth_headers = {
            'HTTP_AUTHORIZATION': 'Bearer ' + tok.token,
        }
        response = self.client.get(self.fetch_url, format='json', **auth_headers)
        # Make assertions
        self.assertEqual(response.status_code, status.HTTP_200_OK)
```

And that's it, just run the test. But before you do that, make sure you have required `imports`. You will need the following imports:

* `User`, `Book` Models
* from `django.urls`, `reverse`
* from `django.utils`, `timezone`
* from `oauth2_provider.models`, `Application` and `AccessToken` models
* from `rest_framework`, `status`
* `datetime`
* from `rest_framework.test`, `APITestCase`

Happy Testing.

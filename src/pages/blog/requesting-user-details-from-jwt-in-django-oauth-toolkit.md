---
templateKey: article-page
title: Requesting User details from JWT in Django OAuth Toolkit
slug: requesting-user-details-from-jwt-in-django-oauth-toolkit
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: '2018-04-16T09:28:22+05:30'
cover: /img/user_info_jwt.jpg
metaTitle: Requesting User details from JWT in Django OAuth Toolkit
metaDescription: >-
  Learn to write an API to fetch the details of currently logged in user, using
  the Authorization Token, in Django Oauth Toolkit
tags:
  - authentication
  - API
  - django
  - python
  - javascript
---
We always require an API to fetch the details of the current user. This API, unfortunately, isn't provided by default in Django OAuth Toolkit. But worry not, it's fairly easy to write this API, and that is what we'll do. But before we begin, let's clarify some assumptions:

* This tutorial is written with Django 2.0 specific commands in mind (eg. Path)
* This is for someone who has Django OAuth Toolkit already up and running in the project.
* This tutorial doesn't mention imports and will have to be done by developer accordingly.

Now that that's clear, let's begin.

## Setting up the Authentication Backend and Middlewares

Before we begin writing `API View`, make sure to add the following in the `settings.py` of the project. First, we add `AUTHENTICATION_BACKENDS`

```python
AUTHENTICATION_BACKENDS = (
    'oauth2_provider.backends.OAuth2Backend',
    # Not required for DOT, but required for Admin
    'django.contrib.auth.backends.ModelBackend',
)
```

Then we add relevant `MIDDLEWARE` for the OAuth Toolkit:

```python
MIDDLEWARE = (
    '...',
    # If you use SessionAuthenticationMiddleware, be sure it appears before OAuth2TokenMiddleware.
    # SessionAuthenticationMiddleware is NOT required for using DOT.
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'oauth2_provider.middleware.OAuth2TokenMiddleware',
    '...',
)
```

These steps are essentials for getting `request.user` function, which will be required while writing the `API View`.

## Writing the API

In the `views.py` we'll write a `generic Retrieve API View` which when called along with the authorization token will return the User details. For that, we'll first write a `serializer` that will define our JSON response.

### Serializer for the User

For our JSON response let's take id, first name, last name, email, and username. In the `serializers.py` file write the following Model Serializer class

```python
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username')
```

### The Retrieve API View

In the `views.py` file we'll write the UserDetail View:

```python
class UserDetailView(generics.RetrieveAPIView):
    """
    Use this endpoint to retrieve user.
    """
    # Set the AUTH_USER_MODEL in settings.py file to make it work with custom user models as well.
    model = settings.AUTH_USER_MODEL
    serializer_class = UserDetailSerializer
    # Set the permission class if not already set by default
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, *args, **kwargs):
        return self.request.user
```

### The API Path

Now that the tough part is over we'll write the URL Path for the API. In your `urls.py` add the following URL pattern.

```python
urlpatterns = [
    '...'
    path('api/me/', UserDetailView.as_view(), name='me'),
]
```

That's all for the coding part, now when you call the `http://localhost:8000/api/me/?format=json` with Authorization Header, you'll get the ID, First Name, Last Name, Email and Username of the user associated with the JSON Web Token.

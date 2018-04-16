---
templateKey: article-page
title: Requesting User details from JWT in Django OAuth Toolkit
date: '2018-04-16T09:28:22+05:30'
cover: /img/dot.png
tags:
  - Authorization
  - Oauth Toolkit
  - Django
  - DRF
  - API
meta_title: Requesting User details from JWT in Django OAuth Toolkit
meta_description: >-
  Learn to write an API to fetch the details of currently logged in user, using
  the Authorization Token, in Django Oauth Toolkit
---
We always require an API to fetch the details of the current user. This API unfortunately isn't provided by default in Django OAuth Toolkit. But worry not, it's fairly easy to write this API, and that is what we'll do.

## Setting up the Authentication Backend and Middlewares

Before we begin writing `API View`, first make sure to add the following in the `settings.py` of the project. First we add `AUTHENTICATION_BACKENDS`

```
AUTHENTICATION_BACKENDS = (
    'oauth2_provider.backends.OAuth2Backend',
    // Not required for DOT, but required for Admin
    'django.contrib.auth.backends.ModelBackend',
)
```

Then we add relevant `MIDDLEWARE` for the OAuth Toolkit:

```
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
For our JSON response let's take id, first name, last name, email and username. In the serializers.py file write the following Model Serializer class

```
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username')
```

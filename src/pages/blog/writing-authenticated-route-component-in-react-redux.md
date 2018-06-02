---
templateKey: article-page
title: Writing Authenticated Route Component in React Redux
date: '2018-06-02T09:21:12+05:30'
cover: /img/react-redux.png
tags:
  - React
  - Redux
  - ReactRouter
  - Authentication
meta_title: Writing Authenticated Route Component in React Redux
meta_description: >-
  Writing Authenticated Routes which will redirect to signin page if the user is
  not authenticated and once signed in it'll redirect back to the same page.
---
How to write an Authenticated Route component which will redirect to Sign In Page if user isn't authenticated and once authentication is complete, it'll redirect them back to the same page, this is a problem most new React developers face. Today we learn to do just that.

But before we begin, lets clear out some assumptions:

* This is not a react-redux authentication tutorial, we assume you already have authentication mechanism set up.
* The Redux association is just to get the "authenticated"(bool) state, and you can use any state management you like.
* We are using React Router v4

Now that, that's out of the way lets begin by creating the most important part, the `AuthenticatedRoute` component.

## Creating AuthenticatedRoute Component

`AuthenticatedRoute` component is, component which basically takes the props of `Route` and an additional boolean prop, `authenticated`, which determines if the Component is to be rendered or the user needs to be redirected.

```
import React from "react";
import {Route, Redirect} from "react-router-dom";

export default function AuthenticatedRoute({
                                               component: Component,
                                               authenticated,
                                               ...rest
                                           }) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === true ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Redirect to={`/signin?redirectTo=${props.match.path}`}/>
                )
            }
        />
    );
}
```
It also stores the actual path as a parameter in the signin path `/signin?redirectTo=<path>` so that when the user signs in it'll redirect to that path.

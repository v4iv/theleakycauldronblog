---
templateKey: article-page
title: Writing Authenticated Route Component in React Redux
slug: writing-authenticated-route-component-in-react-redux
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: '2018-06-02T09:21:12+05:30'
cover: /img/react_redux_authenticated_routes.jpg
metaTitle: Writing Authenticated Route Component in React Redux
metaDescription: >-
  Writing Authenticated Routes which will redirect to signin page if the user is
  not authenticated and once signed in it'll redirect back to the same page.
tags:
  - react js
  - redux
  - authentication
  - javascript
---
How to write an Authenticated Route component which will redirect to Sign In Page if a user isn't authenticated and once authentication is complete, it'll redirect them back to the same page, this is a problem most new React developers face. Today we learn to do just that.

But before we begin, lets clear out some assumptions:

* This is not a beginner react-redux authentication tutorial, we assume you already have an authentication mechanism set up.
* The Redux association is just to get the "authenticated"(bool) state, and you can use any state management you like.
* We are using React Router v4
* You may need to modify it according to your project.

Now that, that's out of the way lets begin by creating the most important part, the `AuthenticatedRoute` component.

## Creating AuthenticatedRoute Component

`AuthenticatedRoute` component is a component which takes the props of `Route` and an additional boolean prop, `authenticated`, which determines if the Component is to be rendered or the user needs to be redirected.

```javascript
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

It also stores the actual path as a parameter in the sign in path `/signin?redirectTo=<path>` so that when the user signs in it'll redirect to that path.

## Redirecting to the URL Param after Sign In

To redirect to the param that we set, we need to first edit the `signinUser(username, password)` action, by adding a third argument, redirect.

```javascript
...

export function signinUser(username, password, redirect = '/'){
// Authentication Logic
...
}
```

we set a default value for the third argument so that in case no value is provided it'll redirect to the home page. Now for the actual redirection.

```javascript
export function signinUser(username, password, redirect = '/'){
    return function(dispatch){
        dispatch(authRequest);
            return axios.post(
                ...
            ).then((response) => {
                dispatch(authSuccess(response));
                // Redirect
                window.location = redirect;
            }).catch(error => {
                dispatch(authFailure(error));
            });
    }
}
```

## Parsing the URL Parameter

To get the `redirectTo` param's value from`/signin?redirectTo=<path>`, we need to install a package called `query-string`.

```bash
yarn add query-string
```

or

```bash
npm install query-string --save
```

now in our Sign In Container, in the function that handles Sign In request, we access the URL param and pass it to `signinUser` function.

```javascript
...
import queryString from 'query-string';

class SignInContainer extends Component {
    handleSignIn(event) {
        event.preventDefault();
        const redirectTo = queryString.parse(this.props.location.search).redirectTo;
        this.props.actions.signinUser(this.state.data.username, this.state.data.password, redirectTo);
    }
}
```

## Using AuthenticatedRoute in our Router

Now it's time to use the AuthenticatedRoute Component, it's very easy to do and works exactly like Route from react-router-dom. It only takes one extra parameter, `authenticated`, which is a boolean that determines if the user is authenticated or not.

```javascript
...
import AuthenticatedRoute from './component/AuthenticatedRoute';

const store = configureStore();
const {sessionReducer: {session: {authenticated}}} = store.getState();

class App extends Component {
render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path='/signin' component={SignInPage}/>
                            <AuthenticatedRoute exact path='/' 
                                                component={HomePage}
                                                authenticate={authenticated}/>
                            ...
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
```

And that's it! We're all set.

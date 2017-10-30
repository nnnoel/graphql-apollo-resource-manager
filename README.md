# Resource Manager App

### Author: Noel Colon

This is a working full-stack React app demo (as well as a WIP) using the latest versions of GraphQL and Apollo 2.0

> See the live version here: https://resource-manager-app-ssjctonqih.now.sh (if it takes a while to load, just give it a minute or two for the server to wake up)

The purpose of this app is to provide a local hub of queryable community ran programs that are maintained by service administrators.
This is essentially a subset of an older [project](https://github.com/nnnoel/bounty_for_studyedge) with a focus on learning best practices with GraphQL + Apollo.

Uses a number of redux related libraries such as [redux-thunk](https://github.com/gaearon/redux-thunk) middleware for handling apollo mutation lifecycle states and [async action handlers](https://medium.com/@machadogj/async-action-creators-with-redux-thunk-83af81994250), [redux-persist](https://github.com/rt2zz/redux-persist) for rehydrating auth sessions, [react-redux-form](https://github.com/davidkpiano/react-redux-form), and react-router v4 with [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux/). Greatly influenced by https://github.com/Carlows/alt-market


Tech Features:
-
- React 16
- React Router 4
- Apollo client 2.0
- Apollo express server (1.1) with GraphQL and Mongoose schemas
- Mongoose 4
- JWT 8 for admin authentication
- Redux 3.7
- Redux persist 5
- Redux thunk 2 for apollo mutation lifecycle states (Apollo does not provide network statuses for mutations, unlike queries)
- React Redux Form 1.15
- Persisted data using a live MongoDB instance hosted by [mLab](https://mlab.com/welcome/)
- [Grommet](https://github.com/grommet/grommet) 1.8 for UI components
- Enzyme 3
> bootstraped using create-react-app (1.4.1)

App features:
-
- Lazy pagination using Apollo + GraphQL queries
- Admin login portal
- An admin dashboard with accessibility to live programs
- Admins can perform authenticated CRUD operations in dashboard as well as approve
- Public list directory for guest to search for a filter current programs
- Guests can submit their programs to be listed
 and disapprove of submitted/pending programs [WIP]

This is purely for demonstration purposes

An interactive GraphiQL instance can be accessed here: [https://server-mqgjsyysqo.now.sh/graphiql](https://server-mqgjsyysqo.now.sh/graphiql?query=query%20%7B%0A%20%20test%0A%7D)

To test
```
query {
  test
}
```

Introspection query
```
{
  __schema {
    types {
      name
    }
  }
}
```

Sign in as an admin
```
mutation SignInAdmin($username: String!, $password: String!) {
    signInAdmin(username: $username, password: $password) {
      token
      isAuthenticated
    }
  }
```
With query variables:
`{"username": "admin", "password": "admin"}`

Check out the [server models](https://github.com/nnnoel/graphql-apollo-resource-manager/tree/master/server/src/data/models) for more details.

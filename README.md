# Resource Manager App

### Author: Noel Colon

This is a demoable full-stack React + Graphql + Apollo webapp.

Live: https://resource-manager-app-aussmfifmq.now.sh
>The server tends to sleep after extended periods of inactivity. Give it a minute or two prior to a delay.

The purpose of this app is to provide a local hub of queryable community ran programs that are maintained by service administrators.
This is essentially a subset of an older [project](https://github.com/nnnoel/bounty_for_studyedge) with a focus on learning Graphql + Apollo.

Uses a number of redux related libs for persisting state, [async store](https://medium.com/@machadogj/async-action-creators-with-redux-thunk-83af81994250), thunk for apollo mutation lifecycle hooks, and [react-redux-form](https://github.com/davidkpiano/react-redux-form). Greatly influenced by https://github.com/Carlows/alt-market.

Tech Features:
-
- JWT for admin authentication
- Redux persist for maintaining sessions
- Redux thunk for apollo mutation lifecycle hooks (Apollo does not provide network statuses for mutations, unlike queries)
- Express server for GraphQL & Mongoose schemas
- Persisted data using a live MongoDB instance hosted by [mLab](https://mlab.com/welcome/)
- [Grommet](https://github.com/grommet/grommet) for UI components

App features:
-
- Pagination using Apollo + Graphql queries
- An admin dashboard with accessibility to live programs
- Admin login portal
- Guests can manually search and filter programs
- Guests can submit their programs to be listed (feature)
- Admins can perform authenticated CRUD operations in dashboard as well as approve and disapprove of submitted/pending programs

This is purely for demonstration purposes

An interactive GraphiQL instance is also available: [https://server-ivvvopzdti.now.sh/graphiql](https://server-ivvvopzdti.now.sh/graphiql?query=query%20%7B%0A%20%20test%0A%7D)

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

Check out the server schema for more
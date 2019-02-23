import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./component/AddBook";
import AddAuthor from "./component/AddAuthor";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <AddAuthor />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;

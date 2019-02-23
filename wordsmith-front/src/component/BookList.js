import React, { Component } from "react";
import { graphql } from "react-apollo";
import Book from "./Book";
import "../../src/assets/styles/table.scss";
import { Container } from "semantic-ui-react";
import { getBooksQuery } from "../queries/queries";

//  first construct a query
class BookList extends Component {
  render() {
    const { books, loading } = this.props.data;
    return (
      <Container text>
        <div className="table">
          <div className="table__headers">Book lists</div>
          <div className="table__body">
            {!loading
              ? books.map((book, i) => <Book book={book} key={i} />)
              : null}
          </div>
        </div>
      </Container>
    );
  }
}
export default graphql(getBooksQuery)(BookList);

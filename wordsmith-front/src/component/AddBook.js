import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  Input,
  Dropdown,
  Container,
  Header,
  ButtonContent,
  Button
} from "semantic-ui-react";
import { getAuthorsQuery, AddBookMutation } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, genre } = this.state;
    this.props.AddBookMutation({
      variables: {
        name: name,
        genre: genre,
        authorId: "5c6f9b05be5bab020da4d54f"
      }
    });
  };
  render() {
    const { getAuthorsQuery } = this.props;
    const { authors, loading } = getAuthorsQuery;
    const { name, genre } = this.state;
    return (
      <Container text>
        <div>
          <Header as="h2">
            <Header.Content>Add Book</Header.Content>
          </Header>
          <Input
            value={name}
            name="name"
            onChange={this.handleChange}
            placeholder="Book name..."
          />
          <br />
          <br />
          <Input
            value={genre}
            name="genre"
            onChange={this.handleChange}
            placeholder="Book genre..."
          />
          <br />
          <br />
          <Dropdown text="Author" pointing="left">
            {!loading ? (
              <Dropdown.Menu>
                {authors.map((author, i) => (
                  <Dropdown.Item key={i}>{author.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            ) : null}
          </Dropdown>
        </div>
        <br />
        <br />
        <Button onClick={this.onSubmit}>
          <ButtonContent>Add book</ButtonContent>
        </Button>
      </Container>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(AddBookMutation, { name: "AddBookMutation" })
)(AddBook);

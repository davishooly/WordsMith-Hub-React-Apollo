import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import { AddAuthorMutation } from "../queries/queries";
import {
  Input,
  Container,
  Header,
  ButtonContent,
  Button
} from "semantic-ui-react";

class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: ""
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    const { AddAuthorMutation } = this.props;
    const { name, age } = this.state;
    AddAuthorMutation({
      variables: {
        name,
        age: parseInt(age)
      }
    });
  };

  render() {
    const { name, age } = this.state;
    return (
      <Container text>
        <div>
          <Header as="h2">
            <Header.Content>Add Author</Header.Content>
          </Header>
          <Input
            value={name}
            name="name"
            onChange={this.handleInputChange}
            placeholder="Book name..."
          />
          <br />
          <br />
          <Input
            value={age}
            name="age"
            onChange={this.handleInputChange}
            placeholder="Book genre..."
          />
        </div>
        <br />
        <br />
        <Button onClick={this.onSubmit}>
          <ButtonContent>Add Author</ButtonContent>
        </Button>
      </Container>
    );
  }
}

export default compose(
  graphql(AddAuthorMutation, { name: "AddAuthorMutation" })
)(AddAuthor);

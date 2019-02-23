import gql from "graphql-tag";

export const getAuthorsQuery = gql`
  {
    authors {
      name
    }
  }
`;
export const getBooksQuery = gql`
  {
    books {
      name
      genre
    }
  }
`;

export const AddBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    AddBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      id
    }
  }
`;

export const AddAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    AddAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`;

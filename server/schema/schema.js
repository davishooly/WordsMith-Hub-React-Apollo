const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/books");
const Author = require("../models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorsType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorsType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

// can be the entry point object
// each graphql object has a name and a field associated with it
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        const { id } = args;
        return Book.findById(id);
      }
    },
    author: {
      type: AuthorsType,
      args: {
        name: {
          type: GraphQLString
        },
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // return _.find(authors, { name: args.name });
        const { name, id } = args;
        return Author.findById(id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorsType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    AddAuthor: {
      type: AuthorsType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const { name, age } = args;
        let author = new Author({
          name: name,
          age: age
        });
        return author.save();
      }
    },
    AddBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const { name, genre, authorId } = args;
        let books = Book({
          name,
          genre,
          authorId
        });
        return books.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

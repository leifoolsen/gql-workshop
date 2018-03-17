import {makeExecutableSchema} from 'graphql-tools';

// Some fake data
const books = [
  {
    title: 'Harry Potter and the Sorcerer\'s stone',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    title: 'The awesome',
    author: 'Knowit Sør',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    books: [Book] 
    booksByTitle(title: String!): Book
  }
  type Mutation {
    addBook(title: String!, author: String!): Book
  }
  type Book { 
    title: String, 
    author: String,
  }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    booksByTitle: (root, {title}) => books.find((t) => t.title === title)
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        title: args.title,
        author: args.author
      };
      books.push(newBook);
      return newBook;
    },
  },
};

// Put together a schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

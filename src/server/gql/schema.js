import {makeExecutableSchema} from 'graphql-tools';

const RootQuery = `
  type RootQuery {
    hello_world: String!
   }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery],
  resolvers: {
    RootQuery: {
      hello_world: () => 'Hi from GraphQL!!!'
    }
  }
});

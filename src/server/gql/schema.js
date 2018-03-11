import {makeExecutableSchema} from 'graphql-tools';
import {merge} from 'lodash';
import UtleggMelding from './schemas/utleggSchema';
import {enhetResolver} from './resolvers/enhetResolver';
import {utleggResolver} from './resolvers/utleggResolver';

const RootQuery = `
  type RootQuery  {
    utlegg(ubnr: Float!): UtleggMelding
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const resolvers = merge(utleggResolver, enhetResolver);

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...UtleggMelding],
  resolvers
});

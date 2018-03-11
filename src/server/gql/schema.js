import {makeExecutableSchema} from 'graphql-tools';
import {merge} from 'lodash';
import UtleggMelding from './schemas/utleggSchema';
import Postboks from './schemas/postboksSchema';
import {enhetResolver} from './resolvers/enhetResolver';
import {utleggResolver} from './resolvers/utleggResolver';
import {postboksResolver} from './resolvers/postboksResolver';
import Stottetildeling from './schemas/stottetildelingSchema';
import {stottetildelingResolver} from './resolvers/stottetildelingResolver';
import {naceResolver} from './resolvers/NaceResolver';
import Nacekoder from './schemas/naceSchema';

const RootQuery = `
  type RootQuery  {
    utlegg(ubnr: Float!): UtleggMelding
    stottetildelingListe: [Stottetildeling]
    nacekodeListe: [Nacekoder]
  }
`;

const Mutation = `
  type Mutation  {
    insertPostboks(input: Nypostboks!): Response
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: Mutation
  }
`;

const resolvers = merge(utleggResolver, enhetResolver, postboksResolver, stottetildelingResolver, naceResolver);

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Mutation, ...UtleggMelding, Postboks, ...Stottetildeling, ...Nacekoder],
  resolvers
});

import Enhet from './enhetSchema';

const UtleggMelding = `
  type UtleggMelding {
    utleggUid: Int
    ubnr: Float!
    utleggstype: String
    ubmeldnr: Int
    datoUtleggsforretning: String  #TODO: lage date scalar type
    trekkprosent: Float
    trekkbelop: Int
    trekkvaluta: String # TODO lage enum scalar type,
    periodeStart: String #TODO: lage date scalar type
    periodeSlutt: String
    slettekode: String
    datoSlettet: String #TODO: lage date scalar type
    utleggMeldingRolleIdentList: [UtleggMeldingRolleIdent]
  }
  
  type UtleggMeldingRolleIdent {
    utleggRolleIdentUid: Int
    rolletype: String # TODO: lage enum scalar type
    identtype: String # TODO: lage enum scalar type
    ident: String!
    enhet: Enhet
    adresse: String
    postnr: String
    poststed: String
    landkode: String
    refSaksnr: String
  }
`;

export default [UtleggMelding, Enhet];

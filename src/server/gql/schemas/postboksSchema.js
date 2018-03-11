const Postboks = `
  type Postboks {
    adresseID: String
    status: String
  }
  input Nypostboks {
  nummer: String!
  postnr: String!
  kommunenr: String!
  anleggsnavn: String!
  }
  
  type Response {
    adresseID: Float
    status: String
  }
`;

export default Postboks;

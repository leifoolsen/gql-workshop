/* eslint-disable prettier/prettier */
import React from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import SearchField from '../components/SearchField';
// import Rofs from './Rofs';

const UTLEGG_QUERY = gql`
  query utleggQuery($ubnr: Float!) {
    utlegg(ubnr: $ubnr) {
      ubnr
      utleggUid
      utleggstype
      ubmeldnr
      datoUtleggsforretning
      trekkprosent
      trekkbelop
      trekkvaluta
      periodeStart
      periodeSlutt
      slettekode
      datoSlettet
      utleggMeldingRolleIdentList {
        utleggRolleIdentUid
        rolletype
        identtype
        adresse
        postnr
        poststed
        landkode
        refSaksnr
        enhet {
          name1
          name2
          slettetAar
          slettetLnr
          forradr1
          forradr2
          forradrPostnr
          forradrLandkode
          enhetstype
        }
      }
    }
  }
`;

const SearchResult = ({result}) => { // eslint-disable-line react/prop-types
  const divStyle = {
    background: '#eee',
    padding: '20px',
    margin: '20px'
  };
  const headerStyle = {
    margin: '20px',
    padding: '20px'
  };

  const printUtleggMelding = (melding, index) =>
    (
      <tr key={index}>
        <td style={divStyle}>{melding.rolletype}</td>
        <td style={divStyle}>{melding.utleggRolleIdentUid}</td>
        <td style={divStyle}>{melding.refSaksnr}</td>
        {melding.enhet !== null ? (
          <td style={divStyle}>{melding.enhet.name1}</td>
        ) : (
          <td style={divStyle}>ÆSJDA, INGEN ENHETSNAVN HER</td>
        )}
      </tr>
    );

  if (result && result.utleggMeldingRolleIdentList) {
    return (
      <table>
        <caption style={{fontSize: '20px', fontWeight: 'bold'}}>UBNR:&nbsp;{result.ubnr}</caption>
        <tbody>
          <tr>
            <th style={headerStyle}>Rolletype</th>
            <th style={headerStyle}>UtleggRolleIdentUid</th>
            <th style={headerStyle}>Saksøkernr</th>
            <th style={headerStyle}>Enhetsnavn</th>
          </tr>
          {result.utleggMeldingRolleIdentList.map((melding, index) => printUtleggMelding(melding, index))}
        </tbody>
      </table>
    );
  }
  return null;
};

class Utlegg extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResult: {},
      loading: false
    };
    this.search = this.search.bind(this);
  }

  search(value) {
    // eslint-disable-next-line consistent-return
    const asyncQuery = async (v) => {
      this.setState({loading: true});
      try {
        const result = await this.props.client.query({ // eslint-disable-line react/prop-types
          query: UTLEGG_QUERY,
          variables: {ubnr: v}
        });
        return result;
      }
      catch (e) {
        console.error('ÆSJDAAAA, utlegget du søker på finnes ikke'); // eslint-disable-line no-console
      }
    };

    if (value) {
      asyncQuery(value).then((result) => {
        this.setState({searchResult: result.data.utlegg, loading: result.loading});
      });
    }

    return null;
  }

  render() {
    return (
      <div>
        <SearchField label="Søk utlegg" value="20178888888891" onSearch={this.search} />
        {this.state.loading ? (
          <h1 style={{fontSize: '50px'}}>Loading...</h1>
        ) : (
          <SearchResult result={this.state.searchResult} />
        )}
        {/* <Rofs /> */}
      </div>
    );
  }
}

export default withApollo(Utlegg);

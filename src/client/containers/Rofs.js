import React from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';

const ROFS_QUERY = gql`
{stottetildelingListe {
  tildelingId
  fylkesnummer
  naering
  ubmeldnr
  stottemottakerOrganisasjonsnummer
  stottemottakerNavn
  }
}`;

const RofsSearchResult = ({result}) => { // eslint-disable-line react/prop-types
  const divStyle = {
    background: '#eee',
    padding: '20px',
    margin: '20px'
  };
  const headerStyle = {
    margin: '20px',
    padding: '20px'
  };

  const printStottetildeling = (stottetildeling, index) =>
    (
      <tr key={index}>
        <td style={divStyle}>{stottetildeling.tildelingId}</td>
        <td style={divStyle}>{stottetildeling.fylkesnummer}</td>
        <td style={divStyle}>{stottetildeling.naering}</td>
        <td style={divStyle}>{stottetildeling.stottemottakerOrganisasjonsnummer}</td>
        <td style={divStyle}>{stottetildeling.stottemottakerNavn}</td>

      </tr>
    );

  if (result && result.stottetildelingListe) {
    return (
      <table>
        <tbody>
          <tr>
            <th style={headerStyle}>TildelingId</th>
            <th style={headerStyle}>Fylkesnummer</th>
            <th style={headerStyle}>Nacekode</th>
            <th style={headerStyle}>Stottemottaker organisasjonsnummer</th>
            <th style={headerStyle}>Stottemottaker Navn</th>
          </tr>
          {result.stottetildelingListe.map((stottetildeling, index) => printStottetildeling(stottetildeling, index))}
        </tbody>
      </table>
    );
  }
  return null;
};

class Rofs extends React.Component {
  state = {
    searchResult: {},
    loading: false
  };

  componentDidMount() {
    this.search();
  }

  search() {
    console.log('searching...');     // eslint-disable-line no-console
    // eslint-disable-next-line consistent-return
    const asyncQuery = async () => {
      this.setState({loading: true});
      try {
        const result = await this.props.client.query({ // eslint-disable-line react/prop-types
          query: ROFS_QUERY
        });
        return result;
      }
      catch (e) {
        console.error('ÆSJDAAAA, Kallet mot rofs feila', e); // eslint-disable-line no-console
      }
    };

    asyncQuery().then((result) => {
      this.setState({searchResult: result.data, loading: result.loading});
    });

    return null;
  }

  render() {
    return (
      <div>
        <h1>Rofsdata</h1>
        {this.state.loading ? (
          <h1 style={{fontSize: '50px'}}>Loading Rofsdata...</h1>
        ) : (
          <RofsSearchResult result={this.state.searchResult} />
        )}
      </div>
    );
  }
}

export default withApollo(Rofs);

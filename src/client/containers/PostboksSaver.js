import React from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';

const POSTBOKS_QUERY = gql`
mutation postboksMutation($input: Nypostboks!) {
  insertPostboks(input: $input) {
    adresseID
    status
  }
} 
`;

class PostboksSaver extends React.Component {
  state = {
    loading: false,
    respons: null,
    kommunenr: '123',
    postnr: '3820',
    anleggsnavn: 'Wow such anlegg',
    nummer: '345'
  };


  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  onSubmit() {
    const {nummer, postnr, kommunenr, anleggsnavn} = this.state;
    this.setState({loading: true});
    return this.props.client.mutate({ // eslint-disable-line react/prop-types
      mutation: POSTBOKS_QUERY,
      variables: {input: {nummer, anleggsnavn, postnr, kommunenr}}
    })
      .then((res) => {
        this.setState({respons: res.data.insertPostboks, loading: res.loading});
      })
      .catch((error) => console.log(error));
  }

  showResult = (result) => {
    if (result) {
      return (
        <h1>
          Du har opprettet en ny postboksadresse med ID {result.adresseID} og status {result.status}
        </h1>

      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <label htmlFor="nummer">
          Nummer
        </label>
        <input
          type="text"
          name="nummer"
          defaultValue={this.state.nummer}
          onChange={this.onChange}
        />
        <label htmlFor="anleggsnavn">
          Anleggsnavn
        </label>
        <input
          type="text"
          name="anleggsnavn"
          defaultValue={this.state.anleggsnavn}
          onChange={this.onChange}
        />
        <label htmlFor="postnr">
          Postnr
        </label>
        <input
          type="text"
          name="postnr"
          defaultValue={this.state.postnr}
          onChange={this.onChange}
        />
        <label htmlFor="kommunenr">
          Kommunenr
        </label>
        <input
          type="text"
          name="kommunenr"
          defaultValue={this.state.kommunenr}
          onChange={this.onChange}
        />
        <button onClick={() => this.onSubmit()}>Lagre</button>
        {this.state.loading ?
          <h1 style={{fontSize: '50px'}}>Loading...</h1> : this.showResult(this.state.respons)}
      </div>
    );
  }
}

export default withApollo(PostboksSaver);


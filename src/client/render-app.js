import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import App from './containers/App';

//
// if (port !== undefined) -> scheme://host:port/path
// if (port === undefined) -> scheme://host/path
const toURI = (scheme, host, port, path) => `${scheme}://${host}${port ? `:${port}` : ''}${path}`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: toURI(process.env.SCHEME, process.env.HOST, process.env.PORT, process.env.API_PATH)
  }),
  cache: new InMemoryCache()
});

const renderApp = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    document.getElementById('app')
  );
};

const start = () => {
  renderApp(App);
};

export default start;

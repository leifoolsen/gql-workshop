import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import config from '../config/index';
import {clientErrorHandler, errorHandler, logErrors, notFound} from './middlewares/error-handlers';
import {schema} from '../server/gql/schema';
import normalizeProxyConfig from '../server/utils/normalize-proxy-config';
import logger from '../server/logger/logger';

const setupApp = () => {
  const {isDev, isTest} = config;
  const webRoot = process.env.WEB_ROOT || path.join(process.cwd(), 'src');

  logger.info('NODE_ENV   :', process.env.NODE_ENV);
  logger.info('webRoot    :', webRoot);
  logger.info('contentBase:', config.server.contentBase);

  const app = express();
  app.set('env', process.env.NODE_ENV);
  app.disable('x-powered-by');
  app.use(logger.expressMiddleware); // Requestlogger

  // Enable CORS with various options
  app.use(cors());

  // Use helmet to secure Express with various HTTP headers
  app.use(helmet());

  // Prevent HTTP parameter pollution.
  app.use(hpp());

  if (config.server.compression) {
    // Compress all requests
    // compression middleware compresses your server responses which makes them
    // smaller (applies also to assets). You can read more about that technique
    // and other good practices on official Express.js docs http://mxs.is/googmy

    // eslint-disable-next-line global-require
    const compression = require('compression');
    app.use(compression());
  }

  // Activate this if you want to log incoming requests
  // app.use((req, res, next) => {
  //   logger.debug(`Incoming request for ${req.url}`);
  //   next();
  // });

  // Proxy
  if (config.useProxy) {
    const proxy = require('http-proxy-middleware'); // eslint-disable-line global-require
    const {context, options} = normalizeProxyConfig(config.server.proxy);

    app.use(proxy(context, {
      ...options,
      onProxyReq(req) {
        logger.info(`Proxy to: ${req.path}`);
      }
    }));
  }
  else {
    if (isDev) {
      app.use(
        '/graphiql',
        graphiqlExpress({
          endpointURL: '/graphql'
        })
      );
    }
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
  }

  if (config.server.historyApiFallback) {
    // See: https://github.com/bripkens/connect-history-api-fallback
    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware.
    const history = require('connect-history-api-fallback'); // eslint-disable-line global-require
    app.use(history(config.server.historyApiFallback));
  }

  // application routes
  let middleware = null;

  if (isDev && !isTest) {
    // Hot Module Reloading
    const hmr = require('./middlewares/hmr.js'); // eslint-disable-line global-require
    middleware = hmr(app);

    app.get('*', (req, res) => res.sendFile(path.join(webRoot, config.server.contentBase, 'index.html')));
  }
  else {
    // TODO: Ikke sikkert at dette er korrekt oppsett for å kjøre tester
    app.use(config.server.publicPath, express.static(path.join(webRoot, config.server.contentBase)));
    app.get('*', (req, res) => res.sendFile('index.html'));
  }

  // Error handling, see: https://expressjs.com/en/guide/error-handling.html
  app.use(notFound);
  app.use(logErrors);          // Log errors
  app.use(clientErrorHandler); // Client error handler
  app.use(errorHandler);       // Catch all error handler

  return {app, middleware};
};

export default setupApp;

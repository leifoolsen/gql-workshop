import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import logger from '../server/logger/logger';
import {clientErrorHandler, errorHandler, logErrors, notFound} from './middlewares/error-handlers';
import {schema} from '../server/gql/schema';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);

// VIKTIG!!
// Denne koden kan ikke pakkes inn i en funksjon - da virker ikke HMR :-(

const app = express();
app.set('env', process.env.NODE_ENV);
app.disable('x-powered-by');
app.use(logger.expressMiddleware); // Requestlogger
app.use(cors());
app.use(helmet());
app.use(hpp());

// Aktiver denne blokken dersom du har behov for å se hvilke requester som kommer inn
// app.use((req, res, next) => {
//   logger.debug(`Incoming request for ${req.url}`);
//   next();
// });

// Graphql
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// Needed for ping
app.get('/', (req, res) => res.type('json').json({
  status: 200,
  message: 'OK',
  time: (new Date()).toISOString()
}));

// Error handling, see: https://expressjs.com/en/guide/error-handling.html
app.use(notFound);
app.use(logErrors);          // Log errors
app.use(clientErrorHandler); // Client error handler
app.use(errorHandler);       // Catch all error handler

export default app;

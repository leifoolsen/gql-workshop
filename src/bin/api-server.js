/**
 * Hot Server
 * Skal ikke brukes i produksjon, kun for utvikling
 * @see https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0
 * @see https://hackernoon.com/creating-a-structured-hot-reloadable-graphql-api-with-express-js-de62c859643
 * @see https://github.com/ericclemmons/webpack-hot-server-example
 */

import chalk from 'chalk';
import http from 'http';
import config from '../config/index';
import app from './api-app';
import logger from '../server/logger/logger';
import './middlewares/process-events';
import {handleServerError} from './middlewares/server-events';

// Create a server instance
const server = http.createServer(app);
let currentApp = app;

const start = (done = () => {}) => {
  const {scheme, host, port} = config.apiServer;

  server.on('error', (err) => handleServerError(scheme, port, host, err));

  server.listen(port, host, (err) => {
    if (err) {
      logger.error(chalk.red('☠'), err);
      process.exit(1);
    }
    else {
      logger.info(chalk.green('✓'), `API server started @ ${scheme}://${host}:${port}`);
      done(app, server);
    }
  });
};

// Handle HMR
if (module.hot) {
  module.hot.accept('./api-app', () => {
    logger.info(chalk.yellow('🔁'), 'HMR Reloading...');

    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });

  start(() => {
    logger.info(chalk.green('✓'), 'Server-side HMR Enabled!');
  });
}
else {
  logger.info(chalk.yellow('☔'), 'Server-side HMR Not Enabled!');
}

export default start;

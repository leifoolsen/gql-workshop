import chalk from 'chalk';
import http from 'http';
import config from '../config/index';
import setupApp from './app';
import logger from '../server/logger/logger';
import './middlewares/process-events';
import {handleServerError} from './middlewares/server-events';

const {scheme, host, port} = config.server;
const serverPort = process.env.OPENSHIFT_NODEJS_PORT || port || 8080;
const serverHost = process.env.OPENSHIFT_NODEJS_IP || host || '127.0.0.1';

const middlewareCheck = (middleware, done) => {
  if (middleware) {
    // Wait for devMiddleware to finish
    middleware.waitUntilValid(() => {
      logger.info(`${chalk.green('✓')}`, 'Webpack is in a valid state');
      logger.info(`${chalk.green('✓')}`, 'Client-side HMR enabled');
      done();
    });
  }
  else {
    done();
  }
};

// Create a server instance
const {app, middleware} = setupApp();
const server = http.createServer(app);

const start = (done = () => {}) => {
  middlewareCheck(middleware, () => {
    server.on('error', (err) => handleServerError(scheme, serverPort, serverHost, err));

    server.listen(serverPort, serverHost, (err) => {
      if (err) {
        logger.error(chalk.red('☠'), err);
        process.exit(1);
      }
      else {
        logger.info(chalk.green('✓'), `Server stared @ ${scheme}://${host}:${port}`);
        done(app, server);
      }
    });
  });
};

export default start;

import chalk from 'chalk';
import logger from '../../server/logger/logger';

/**
 * Handle HTTP server "error" event.
 */
const handleServerError = (scheme, port, host, error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(chalk.red('☠'), `${scheme}://${host}:${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(chalk.red('☠'), `${scheme}://${host}:${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export {handleServerError};

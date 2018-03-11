import chalk from 'chalk';
import logger from '../../server/logger/logger';

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript exception bubbles all the way
 * back to the event loop. By default, Node.js handles such exceptions by printing the stack trace to
 * stderr and exiting.
 *
 * Note: The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated resources
 * (e.g. file descriptors, handles, etc) before shutting down the process. It is not safe to resume normal
 * operation after 'uncaughtException'.
 *
 * reason <Error> | <any> The object with which the promise was rejected (typically an Error object).
 * p the Promise that was rejected.
 * @see https://nodejs.org/api/process.html#process_event_unhandledrejection
 */
process.on('unhandledRejection', (reason, p) => {
  logger.error(`${chalk.red('☠')}`, 'Unhandled Rejection at:', p, 'reason:', reason.stack || reason);
});

/**
 * The 'unhandledRejection' event is emitted whenever a Promise is rejected and no error handler is
 * attached to the promise within a turn of the event loop.
 *
 * err error object
 * @see https://nodejs.org/api/process.html#process_event_uncaughtexception
 */
process.on('uncaughtException', (err) => {
  logger.error(`${chalk.red('☠')}`, 'Server Uncaught Exception ', err);
  process.exit(1);
});

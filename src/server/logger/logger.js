import path from 'path';
import fs from 'fs';
import winston from 'winston';
import config from '../../config';

let logPath = 'No Application log!';

const transports = [
  new winston.transports.Console({
    level: config.logger.console.level,
    silent: config.logger.console.silent,
    colorize: true,
    timestamp: true,
    prettyPrint: true
  })
];

if (!config.logger.file.silent) {
  logPath = path.isAbsolute(config.logger.file.filename)
    ? config.logger.file.filename
    : path.resolve(process.cwd(), config.logger.file.filename);

  const dir = path.dirname(logPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  transports.push(new winston.transports.File({
    level: config.logger.file.level,
    filename: logPath,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    tailable: true,
    maxsize: 10 * 1024 * 1024,
    maxFiles: 10,
    json: false
  }));
}

const logger = new winston.Logger({
  levels: {
    // RFC5424 syslog levels
    // https://tools.ietf.org/html/rfc5424
    emerg: 0,   // system is unusable
    alert: 1,   // action must be taken immediately
    crit: 2,    // action must be taken immediately
    error: 3,   // error conditions
    warn: 4,    // warning conditions
    notice: 5,  // normal but significant condition
    info: 6,    // informational condition
    verbose: 6, // informational condition - not part of RFC5424
    debug: 7,   // debug condition
    silly: 7,   // silly condition - not part of RFC5424
  },
  transports
});

// TODO: bytt ut med Morgan eller Winston requestlogg
logger.expressMiddleware = function expressMiddleware(req, res, next) {
  if (req.url.includes('__webpack') && process.env.NODE_ENV === 'development') {
    return next();
  }

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const defaultMessage = `${ip} - ${req.method} ${req.url}`;
  const startTimestemp = Date.now();
  const waitingTimePrintInterval = 5000;

  let waitingTime = 0;
  const intervalId = setInterval(() => {
    waitingTime += waitingTimePrintInterval;
    logger.verbose(`${defaultMessage} - wait for ${waitingTime / 1000}s...`);
  }, waitingTimePrintInterval);

  const printExecutionTime = (statusCode = '') => {
    const message = `${defaultMessage} - ${statusCode} - ${(Date.now() - startTimestemp) / 1000}s`;
    if (res.statusCode < 400) {
      logger.info(message);
    } else {
      logger.warn(message);
    }
    clearInterval(intervalId);
  };

  req.on('end', () => printExecutionTime(res.statusCode));
  req.on('close', () => printExecutionTime('[closed by user]'));

  return next();
};

// logger.emerg('EMERGENCY LOG, system is unusable');
// logger.alert('ALERT LOG, action must be taken immediately');
// logger.crit('CRIT LOG, action must be taken immediately');
// logger.error('ERROR LOG, error conditions');
// logger.warn('WARNING LOG, warning conditions');
// logger.notice('NOTICE LOG, normal but significant condition');
// logger.info('INFO LOG, informational condition');
// logger.debug('DEBUG LOG, debug condition');

logger.info(`Application logs file: ${logPath}`);

export default logger;

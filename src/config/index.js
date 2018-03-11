/*
 * Shared configuration Express and Webpack
 *
 * NODE_ENV: 'test' || 'development' || 'production'
 *
 * argv (NODE_ENV flags):
 *   --hot
 *   --env.dev
 *   --env.prod
 *
 * NODE_ENV + argv flags combined:
 *   'test' + (env.dev || env.prod)
 *   'development' + ('' || hot)
 *   'production' + ''
 *
 * isDev  = NODE_ENV === 'development' || (NODE_ENV === 'test' && !env.prod);
 * isProd = NODE_ENV === 'production'  || (NODE_ENV === 'test' && env.prod);
 *
 * config.default.json + (config.test.json || config.development.json || config.production.json)
 *
 */

import path from 'path';
import nconf from 'nconf';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const nodeEnv = process.env.NODE_ENV;
const configPath = path.resolve(process.cwd(), 'src', 'config');

nconf
  .argv()
  .env()
  .file(nodeEnv, {file: path.join(configPath, `config.${nodeEnv}.json`)})
  .file('default', {file: path.join(configPath, 'config.default.json')})
  .load();

// isDev and isProd should not be true at the same time
const isTest = nodeEnv === 'test';
const isDev = nodeEnv === 'development' || (isTest && !nconf.get('env:prod'));
const isProd = nodeEnv === 'production' || (isTest && nconf.get('env:prod')) || false;
const isHot = (nodeEnv === 'development' && nconf.get('hot')) || false;
const useProxy = nconf.get('proxy') || false;
const logger = nconf.get('server:logger');
const server = nconf.get('server:server');
const apiServer = nconf.get('server:apiServer') || null;

// Server
server.scheme = server.scheme || 'http';
server.apiPath = server.apiPath || '/api';
if (!server.publicPath.endsWith('/')) {
  server.publicPath = path.join(server.publicPath, '/');
}

// API Server
if (apiServer) {
  apiServer.scheme = apiServer.scheme || 'http';
}

export default Object.freeze({
  isTest,
  isDev,
  isProd,
  isHot,
  useProxy,
  logger,
  server,
  apiServer,
});

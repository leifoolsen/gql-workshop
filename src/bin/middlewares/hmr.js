/**
 * Create & configure a webpack compiler
 * @param app
 * @returns {*}
 */
module.exports = function hmr(app) {
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
  const webpackConfig = require('../../../tools/webpack/webpack.config.babel'); // eslint-disable-line global-require
  const logger = require('../../server/logger/logger').default; // eslint-disable-line global-require

  // Attach the dev middleware to the compiler & the server
  const compiler = webpack(webpackConfig);
  compiler.apply(new webpack.ProgressPlugin());

  const devMiddleware = webpackDevMiddleware(compiler, {
    logger,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: 'minimal', // See: https://webpack.js.org/configuration/stats/
    noInfo: true,
  });

  app.use(devMiddleware);

  if (process.env.NODE_ENV !== 'test') {
    // Attach the hot middleware to the compiler & the server
    app.use(webpackHotMiddleware(compiler));
  }

  return devMiddleware;
};

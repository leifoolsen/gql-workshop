/**
 * Webpack config to run server side HMR and to bundle server side code
 *
 * @see https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0
 * @see https://hackernoon.com/creating-a-structured-hot-reloadable-graphql-api-with-express-js-de62c859643
 * @see https://github.com/ericclemmons/webpack-hot-server-example
 * @See https://jlongster.com/Backend-Apps-with-Webpack--Part-I
 * @See https://jlongster.com/Backend-Apps-with-Webpack--Part-II
 */

import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import config from '../../src/config';

const {isDev, isProd} = config;
const {publicPath} = config.server;
const root = process.cwd();
const src = path.join(root, 'src');
const bin = path.join(src, 'bin');
const server = path.join(src, 'server');
const includes = [bin, server];
const outputPath = isProd ? path.join(root, 'dist', 'bin') : path.join(root, 'build');

// Setup the entry for development/prodcution
const entry = () => {
  // Development
  let result = {
    server: [
      'babel-polyfill',
      'webpack/hot/poll?1000',
      path.join(bin, 'api-server.js'),
    ],
  };

  // Prodcution
  if (isProd) {
    result = {
      server: [
        'babel-polyfill',
        path.join(bin, 'server.js')
      ]
    };
  }

  return result;
};

const plugins = () => {
  const result = [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'server',
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ];

  if (isDev) {
    result.push(new StartServerPlugin({
      name: 'server.js',
      signal: false, // See: https://github.com/ericclemmons/start-server-webpack-plugin/issues/22
    }));

    result.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isProd) {
    result.push(new CopyWebpackPlugin([
      {
        from: path.join(bin, 'index.js'),
        to: path.join(outputPath, 'index.js')
      }
    ]));
  }

  return result;
};

module.exports = {
  context: src,
  devtool: isProd ? '#source-map' : '#eval-source-map', // https://webpack.js.org/configuration/devtool/
  name: 'server',
  watch: isDev,
  stats: 'minimal', // https://webpack.js.org/configuration/stats/
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    modules: [
      src,
      'node_modules'
    ],
    descriptionFiles: ['package.json'],
    extensions: [
      '.js',
      '.json'
    ]
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  entry: entry(),
  output: {
    path: outputPath,
    publicPath: publicPath, // eslint-disable-line object-shorthand
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    pathinfo: !isProd,
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: includes,
      },
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['env', {modules: false}]],
              plugins: [
                'syntax-dynamic-import',
                'transform-object-rest-spread',
                'transform-regenerator',
                'transform-runtime',
                'transform-class-properties',
              ]
            }
          }
        ],
        include: includes
      },
    ],
  },
  plugins: plugins(),
};

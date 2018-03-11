import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../../src/config';

const {isDev, isTest, isProd} = config;
const {scheme, host, port, publicPath, contentBase, apiPath} = config.server;
const root = process.cwd();
const src = path.join(root, 'src');
const client = path.join(src, 'client');
const includes = [client];
const outputPath = path.join(root, 'dist');

const extractTextPlugin = new ExtractTextPlugin({
  filename: 'style.css',
  disable: isDev
});

const vendors = [
  'babel-polyfill',
  'apollo-cache-inmemory',
  'apollo-client',
  'apollo-link-http',
  'axios',
  'base-64',
  'graphql-tag',
  'intl',
  'lodash',
  'prop-types',
  'react',
  'react-apollo',
  'react-dom',
  'react-intl',
  'react-router-dom',
  'uuid'
];

const removeEmptyKeys = (obj) => {
  const result = {};
  Object.entries(obj).forEach((entry) => {
    const [key, value] = entry;
    if (!(value === null || value.length === 0)) {
      result[key] = value;
    }
  });
  return result;
};

// Setup the entry for development/prodcution
const entry = () => {
  // Development
  let result = {
    vendor: vendors,
    app: [
      'webpack-hot-middleware/client?reload=true',
      path.join(client, 'index.js')
    ],
  };

  // Prodcution
  if (!isDev) {
    result = {
      vendor: vendors,
      app: [path.join(client, 'index.js')],
    };
  }

  return result;
};

const output = () => removeEmptyKeys({
  path: path.join(outputPath, contentBase),
  publicPath: publicPath, // eslint-disable-line object-shorthand
  filename: isProd ? '[name].[chunkhash].js' : '[name].js', // Don't use hashes in dev mode
  chunkFilename: isProd ? '[name].[chunkhash].chunk.js' : '[name].chunk.js',
  hotUpdateMainFilename: isProd ? 'hot-update.[hash:6].json' : '',
  hotUpdateChunkFilename: isProd ? 'hot-update.[hash:6].js' : '',
  pathinfo: !isProd,
});

const devPlugins = () => [
  new HtmlWebpackPlugin({
    inject: true,
    xhtml: true,
    template: path.join(client, 'index.html'),
    favicon: path.join(client, 'favicon.ico'),
  }),
].concat(!isTest ? [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
] : []);

const prodPlugins = () => [
  new HtmlWebpackPlugin({
    inject: true,
    xhtml: true,
    template: path.join(client, 'index.html'),
    favicon: path.join(client, 'favicon.ico'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  }),
];

const plugins = () => [
  // CommonsChunk analyzes everything in your bundles, extracts common bits into files together.
  // See: https://webpack.js.org/plugins/commons-chunk-plugin/
  // See: https://webpack.js.org/guides/code-splitting-libraries/
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => module.context && module.context.includes('node_modules'),
  }),

  // Mulig at denne må benyttes i utviklingsmodus. Lar den stå utkommentert en stund
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: (module) => {
  //     if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
  //       return false;
  //     }
  //     return module.context && module.context.includes('node_modules');
  //   }
  // }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),

  new ExtractTextPlugin({
    filename: 'style.css',
    disable: isDev
  }),

  new webpack.EnvironmentPlugin({
    BUILD_TARGET: 'client',
    NODE_ENV: process.env.NODE_ENV,
    SCHEME: scheme,
    HOST: host,
    PORT: port,
    PUBLIC_PATH: publicPath,
    API_PATH: apiPath,
    __DEV__: isDev,
  }),

  // As of moment 2.18, all locales are bundled together with the core library.
  // You can use the IgnorePlugin to stop any locale being bundled with moment
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /webpack-stats\.json$/),

].concat(isProd ? prodPlugins() : devPlugins());

module.exports = {
  devtool: isProd ? '#source-map' : '#eval-source-map', // https://webpack.js.org/configuration/devtool/
  context: src,
  name: 'client',
  target: 'web',
  cache: isDev,
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    modules: [
      src,
      'node_modules'
    ],
    descriptionFiles: [
      'package.json'
    ],
    extensions: [
      '.js',
      '.json'
    ],
    unsafeCache: isProd,
  },
  entry: entry(),
  output: output(),
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: includes,
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: isDev,
              presets: [
                [
                  'env',
                  {
                    modules: false,
                  }
                ],
                'react'
              ],
              plugins: [
                'react-hot-loader/babel',
                'syntax-dynamic-import',
                'transform-object-rest-spread',
                'transform-regenerator',
                'transform-runtime',
                'transform-class-properties',
              ]
            }
          }
        ],
        include: includes,
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        include: includes,
        use: extractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {sourceMap: isDev}
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: isDev ? '[path]-[name]_[local]' : '[name]_[local]_[hash:5]', // [hash:base64]
                modules: true,
                sourceMap: isDev
              }
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: isDev}
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: isDev}
            }
          ]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
};

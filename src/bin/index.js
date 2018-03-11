// Allows you to use the full set of ES6 features on server-side (place it before anything else)
require('babel-polyfill');

// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel.
require('babel-register');

// server.js is bundled. can't use __dirname from app.js
process.env.WEB_ROOT = __dirname.endsWith('bin') ? __dirname.replace(/\w+[.!?]?$/, '') : __dirname;

// Start the server
const start = require('./server.js').default;

module.exports = start();

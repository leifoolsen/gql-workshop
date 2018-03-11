import polyfill from './polyfill';
import start from './render-app';

// Add polyfills
polyfill()
  .then(() => {
    start(); // Start the app
  })
  .catch((err) => {
    console.error('Error loading polyfills:', err); // eslint-disable-line no-console
  });

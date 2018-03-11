/**
 * Polyfill on demand using import()
 * @See https://webpack.js.org/guides/code-splitting-async/
 * @See http://anzorb.com/we-dont-need-your-polyfills/
 * @see https://hackernoon.com/polyfills-everything-you-ever-wanted-to-know-or-maybe-a-bit-less-7c8de164e423
 * @see http://anujnair.com/blog/13-conditionally-load-multiple-polyfills-using-webpack-promises-and-code-splitting
 * @see http://2ality.com/2017/02/babel-preset-env.html
 */
import 'babel-polyfill';
import 'core-js/es6/promise';
import 'core-js/fn/object/assign';
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/weak-map';
import 'core-js/es6/set';

export default async function polyfill() {
  const promises = [];

  if (!window.requestAnimationFrame) {
    promises.push(await import('raf/polyfill'));
  }

  if (!window.Proxy) {
    promises.push(await import('harmony-reflect'));
  }

  if (!window.Intl) {
    promises.push(await import('intl'));
    promises.push(await import('intl/locale-data/jsonp/en.js'));
    promises.push(await import('intl/locale-data/jsonp/nb.js'));
  }

  if (typeof Element.prototype.closest !== 'function') {
    promises.push(await import('closest'));
  }

  // Trenger foreløpig ikke denne
  // ie11:  'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  // if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent))
  //   promises.push(await import('./utils/ie11-polyfill'));
  // }

  // ... other polyfills

  return Promise.all(promises);
}

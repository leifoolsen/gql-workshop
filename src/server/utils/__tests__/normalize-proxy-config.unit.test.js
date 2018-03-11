import normalizeProxyConfig from '../normalize-proxy-config';


describe('Normalize proxy config', () => {
  test('config  #1', () => {
    const proxyConfig = {
      '/api': 'http://localhost:3000'
    };
    const expected = {
      context: '/api',
      options: {
        target: 'http://localhost:3000',
      }
    };
    expect(normalizeProxyConfig(proxyConfig)).toEqual(expected);
  });

  test('config #2', () => {
    const proxyConfig = {
      '/api': {
        secure: false,
        target: 'http://localhost:3000',
        changeOrigin: true,
        logLevel: 'debug'
      }
    };

    const expected = {
      context: '/api',
      options: {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    };
    expect(normalizeProxyConfig(proxyConfig)).toEqual(expected);
  });

  test('config #3', () => {
    const proxyConfig = {
      context: ['/auth', '/api'],
      options: {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    };

    const expected = {
      context: ['/auth', '/api'],
      options: {
        changeOrigin: true,
        target: 'http://localhost:3000'
      }
    };
    expect(normalizeProxyConfig(proxyConfig)).toEqual(expected);
  });
});

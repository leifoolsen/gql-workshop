import axios from 'axios';
import config from '../../../src/config';
import start from '../../../src/bin/server';

//
// if (port !== undefined) -> scheme://host:port/path
// if (port === undefined) -> scheme://host/path
const toURI = (scheme, host, port, path = '') => `${scheme}://${host}${port ? `:${port}` : ''}${path}`;

describe('Server', () => {
  describe('Start og stopp', () => {
    test('skal starte og stoppe server', (done) => {
      start((app, server) => {
        expect(app).toBeDefined();
        expect(server).toBeDefined();

        // Vurder å benytte shutdown middleware.
        // Se: http://dillonbuchanan.com/programming/gracefully-shutting-down-a-nodejs-http-server/
        server.close((err) => {
          expect(err).not.toBeDefined();
        });
        done();
      });
    }, 20000);
  });

  describe('Request/Response', () => {
    let serverInstance;

    beforeAll((done) => {
      start((app, server) => {
        serverInstance = server;
        done();
      });
    }, 20000);

    afterAll((done) => {
      serverInstance.close(() => {
        done();
      });
    });

    test('get the root path', async () => {
      const request = axios.create({
        baseURL: toURI(config.server.scheme, config.server.host, config.server.port),
        headers: {Accept: 'text/html'}
      });

      const response = await request.get(config.server.publicPath);
      expect(response.status).toBe(200);
    });
  });
});

import start from '../../../src/bin/api-server';

describe('API Server', () => {
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
    });
  });
});

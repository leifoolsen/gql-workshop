const importFresh = require('import-fresh');

describe('Config', () => {
  describe('development', () => {
    let env;

    beforeAll(() => {
      env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
    });

    afterAll(() => {
      process.env.NODE_ENV = env;
    });

    test('NODE_ENV="development', () => {
      expect(process.env.NODE_ENV).toEqual('development');
    });

    test('skal returnere konfigurasjon for NODE_ENV="development', () => {
      expect(process.env.NODE_ENV).toEqual('development');
      const config = importFresh('../index.js');
      expect(config).toMatchSnapshot();
    });
  });

  describe('test', () => {
    let env;

    beforeAll(() => {
      env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'test';
    });

    afterAll(() => {
      process.env.NODE_ENV = env;
    });

    test('NODE_ENV="test', () => {
      expect(process.env.NODE_ENV).toEqual('test');
    });

    test('skal returnere konfigurasjon for NODE_ENV="test', () => {
      const config = importFresh('../index.js');
      expect(config).toMatchSnapshot();
    });
  });

  describe('production', () => {
    let env;

    beforeAll(() => {
      env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      process.env.NODE_ENV = env;
    });

    test('NODE_ENV="production', () => {
      expect(process.env.NODE_ENV).toEqual('production');
    });

    test('skal returnere konfigurasjon for NODE_ENV="production', () => {
      const config = importFresh('../index.js');
      expect(config).toMatchSnapshot();
    });
  });
});

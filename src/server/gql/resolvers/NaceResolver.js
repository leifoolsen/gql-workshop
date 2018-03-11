import {hentNacekoder} from '../remote-api';

export const naceResolver = {
  RootQuery: {
    nacekodeListe: async () => hentNacekoder()
  }
};


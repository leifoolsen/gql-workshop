import {hentUtlegg} from '../remote-api';

export const utleggResolver = {
  RootQuery: {
    utlegg: async (_, {ubnr}) => {
      const _utlegg = await hentUtlegg(ubnr);
      return _utlegg.utleggMelding;
    }
  }
};

import {hentEnhetDetaljer} from '../remote-api';

export const enhetResolver = {
  UtleggMeldingRolleIdent: {
    enhet: async (utleggMeldingRolleIdent) => hentEnhetDetaljer(utleggMeldingRolleIdent.ident)
  }
};

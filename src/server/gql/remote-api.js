import axios from 'axios';
import base64 from 'base-64';

const enhetUrl = (orgnr) => `http://fte-ed-felleskomponenter-tt1.ose-npc.brreg.no/enhet/${orgnr}/detaljer`;
const utleggUrl = (ubnr) => `http://utl-utleggapi-utlegg-tt1.ose-npc.brreg.no/utlegg/${ubnr}`;
const utleggCred = base64.encode('utlegg-api-user:sikkertpassord');

const requestData = async ({url, options = undefined, catch404 = true}) => {
  try {
    const {data} = await axios.get(url, options);
    return data;
  }
  catch (err) {
    if (err.response && err.response.status === 404 && !catch404) {
      return null;
    }
    throw err;
  }
};

const hentEnhetDetaljer = async (orgnr) => requestData({url: enhetUrl(orgnr), catch404: false});

const hentUtlegg = async (ubnr) => requestData({
  url: utleggUrl(ubnr),
  options: {
    headers: {
      Authorization: `Basic ${utleggCred}`
    }
  }
});

export {hentEnhetDetaljer, hentUtlegg};

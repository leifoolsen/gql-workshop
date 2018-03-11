import axios from 'axios';
import base64 from 'base-64';

const enhetUrl = (orgnr) => `http://fte-ed-felleskomponenter-tt1.ose-npc.brreg.no/enhet/${orgnr}/detaljer`;
const utleggUrl = (ubnr) => `http://utl-utleggapi-utlegg-tt1.ose-npc.brreg.no/utlegg/${ubnr}`;
const postboksUrl = 'http://fta-aeb-adresse-tt1.ose-npc.brreg.no/adresse/postboks';
const stottetildelingUrl = 'http://rofs-register-rofs-tt1.ose-npc.brreg.no/rofs/stottetildeling/nob';
const naceUrl = 'http://kodelister-domene-felleskomponenter-tt1.ose-npc.brreg.no/nacekoder/nob';
const utleggCred = base64.encode('utlegg-api-user:sikkertpassord');
const postboksCred = base64.encode('adresse-updater:securepassword');

const requestData = async ({url, options = undefined, catch404 = true}) => {
  try {
    const {data} = await axios.get(url, options);
    return data;
  }
  catch (err) {
    if (err.response.status === 404 && !catch404) {
      return null;
    }
    throw err;
  }
};

const hentEnhetDetaljer = async (orgnr) => requestData({url: enhetUrl(orgnr), catch404: false});

const hentStottetildeling = async () => requestData({url: stottetildelingUrl, catch404: false});

const hentNacekoder = async () => requestData({url: naceUrl, catch404: false});

const hentUtlegg = async (ubnr) => requestData({
  url: utleggUrl(ubnr),
  options: {
    headers: {
      Authorization: `Basic ${utleggCred}`
    }
  }
});

const lagrePostboks = async (nypostboks) => axios(postboksUrl, {
  headers: {
    Authorization: `Basic ${postboksCred}`,
    'Content-Type': 'application/json',
  },
  method: 'POST',
  data: JSON.stringify(nypostboks)
});

export {hentEnhetDetaljer, hentUtlegg, lagrePostboks, hentStottetildeling, hentNacekoder};

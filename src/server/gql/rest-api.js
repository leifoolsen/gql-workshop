/*
 * Denne modulen benytter vi kun for å verifisere at vi får data fra tjenestene
 * Vi skal ikke eksponere et Rest-api
 */
import express from 'express';
import bodyParser from 'body-parser';
import {hentUtlegg, hentEnhetDetaljer} from './remote-api';

const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

apiRouter.get('/utlegg', async (req, res, next) => {
  try {
    const result = await hentUtlegg('20178888888891');
    res.type('json').json(result);
  } catch (e) {
    next(e);
  }
});

apiRouter.get('/enhet', async (req, res, next) => {
  try {
    const result = await hentEnhetDetaljer('810305002');
    res.type('json').json(result);
  } catch (e) {
    next(e);
  }
});

export {apiRouter};

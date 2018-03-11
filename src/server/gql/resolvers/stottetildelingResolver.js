import {hentStottetildeling} from '../remote-api';

export const stottetildelingResolver = {
  RootQuery: {
    stottetildelingListe: async () => hentStottetildeling()
  }
};


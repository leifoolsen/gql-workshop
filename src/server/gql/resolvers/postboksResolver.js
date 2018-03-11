import {lagrePostboks} from '../remote-api';

export const postboksResolver = {
  Mutation: {
    insertPostboks: async (_, args) => {
      const res = await lagrePostboks(args.input);
      return res.data;
    }
  }
};

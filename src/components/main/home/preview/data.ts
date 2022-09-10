import { FbRun, FbUser } from '../../../../firebase/types';

export type PokemonPreviewType = {
  currentUser: FbUser;
  run: FbRun;
};

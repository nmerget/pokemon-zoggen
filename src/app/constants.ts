import { NavigationItem } from './types';

export const DefaultMenuItems: NavigationItem[] = [
  {
    label: 'Startseite',
    link: '/home',
  },
  {
    label: 'Pokemon-Suche',
    link: '/search',
  },
];

export const APP_NAME = 'Pokemon Zoggen';

export const FIREBASE_COLLECTION_CURRENT = 'current';
export const FIREBASE_COLLECTION_RUN_GROUPS = 'run-groups';
export const FIREBASE_COLLECTION_RUNS = 'runs';
export const FIREBASE_COLLECTION_RUN_POKEMON = 'runPokemon';
export const FIREBASE_COLLECTION_RUN = 'run';
export const FIREBASE_COLLECTION_USERS = 'users';

export const SETTING_ADMIN = 'Admin';
export const SETTING_LOGOUT = 'Logout';

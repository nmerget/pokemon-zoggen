import { configureStore, Reducer } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { constants, firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import localReducer from '../features/local/localSlice';
import { FirestoreScheme } from '../firebase/types';

export const store = configureStore({
  reducer: {
    local: localReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer as Reducer<FirestoreScheme>,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [constants.actionTypes.LOGIN],
      },
    }),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

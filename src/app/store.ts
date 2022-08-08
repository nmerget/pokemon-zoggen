import { configureStore, Reducer } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";

import localReducer from "../features/local/localSlice";
import { constants, firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import { FirebaseScheme, FirestoreScheme } from "../services/types";

export const store = configureStore({
  reducer: {
    local: localReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,

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
    }).concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/react';
import Loading from './components/loading';
import { store } from './app/store';
import { FIREBASE_COLLECTION_USERS } from './app/constants';
import Admin from './components/admin';

const fbConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: FIREBASE_COLLECTION_USERS,
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  enableClaims: true, // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

const db = firebase.firestore();
const auth = firebase.auth();

if (window.location.hostname !== 'localhost') {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DNS,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
    enabled: true,
    beforeSend: (event) => event,
  });
} else {
  const host = 'localhost';
  db.useEmulator(host, 8080);
  auth.useEmulator(`http://${host}:9099`);
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

const App = React.lazy(() => import('./App'));
const LoginSection = React.lazy(
  () => import('./components/main/login-section'),
);
const RunsDashboard = React.lazy(() => import('./components/runs/dashboard'));
const RunsEdit = React.lazy(() => import('./components/runs/edit'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <App />
                </Suspense>
              }
            >
              <Route
                path="login"
                element={
                  <Suspense fallback={<Loading />}>
                    <LoginSection />
                  </Suspense>
                }
              />
              <Route
                path="admin"
                element={
                  <Suspense fallback={<Loading />}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route
                path="home"
                element={
                  <Suspense fallback={<Loading />}>
                    <RunsDashboard />
                  </Suspense>
                }
              />
              <Route
                path="runs/:runGroupId"
                element={
                  <Suspense fallback={<Loading />}>
                    <RunsDashboard />
                  </Suspense>
                }
              />
              <Route
                path="runs/:runGroupId/:runId"
                element={
                  <Suspense fallback={<Loading />}>
                    <RunsEdit />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

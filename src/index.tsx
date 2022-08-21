import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { store } from "./app/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

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
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  enableClaims: true, // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);
const db = firebase.firestore();
const auth = firebase.auth();

if (import.meta.env.DEV) {
  db.useEmulator("localhost", 8080);
  auth.useEmulator("http://localhost:9099");
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

const App = React.lazy(() => import("./App"));
const LoginSection = React.lazy(
  () => import("./components/main/login-section")
);
const RunsDashboard = React.lazy(() => import("./components/runs/dashboard"));
const RunsEdit = React.lazy(() => import("./components/runs/edit"));

Sentry.init({
  dsn: "https://675a282618e7466583a138794b439f91@o1188887.ingest.sentry.io/6309083",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  enabled: import.meta.env.PROD,
  beforeSend: (event) => {
    if (window.location.hostname === "localhost") {
      return null;
    }
    return event;
  },
});

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
                path="runs"
                element={
                  <Suspense fallback={<Loading />}>
                    <RunsDashboard />
                  </Suspense>
                }
              />
              <Route
                path="runs/:runId"
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
  document.getElementById("root")
);

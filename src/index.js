import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import Root from 'routes/Root';
import ScrollToTop from 'react-router-scroll-top';

import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import 'theme/global.css';

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

import { FIREBASE_CONFIG } from './constants/Firebase';

require('dotenv').config();

firebase.initializeApp(FIREBASE_CONFIG);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
// const initialState = {}
const store = createStore(rootReducer, composeWithDevTools())

// react-redux-firebase config
const rrfConfig = {
  preserveOnLogout: ['questions'],
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ScrollToTop>
            <Root />
          </ScrollToTop>
        </ThemeProvider>
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

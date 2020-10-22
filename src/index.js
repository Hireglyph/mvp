import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyCHBwhWkJ5HJK7ysF-1Lm1am2nNSVpgu2k",
  authDomain: "hireglyph-mvp.firebaseapp.com",
  databaseURL: "https://hireglyph-mvp.firebaseio.com",
  projectId: "hireglyph-mvp",
  storageBucket: "hireglyph-mvp.appspot.com",
  messagingSenderId: "586323933398",
  appId: "1:586323933398:web:9d76ec76de22fbb61ff177",
  measurementId: "G-MJ44J6CCBK"
};

firebase.initializeApp(firebaseConfig);

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
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

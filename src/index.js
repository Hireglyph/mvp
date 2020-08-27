import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyAYqCxpFJLywRpUCu4qRhCy3A51RA0Ak_c",
  authDomain: "quivia-mvp.firebaseapp.com",
  databaseURL: "https://quivia-mvp.firebaseio.com",
  projectId: "quivia-mvp",
  storageBucket: "quivia-mvp.appspot.com",
  messagingSenderId: "674335150395",
  appId: "1:674335150395:web:100d6e63d678415f85e71e",
  measurementId: "G-TNYM7DDDXF"
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

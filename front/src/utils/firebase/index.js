import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import useFirebaseAuth from './useFirebaseAuth';
import useDbUser from './useDbUser';
import useDbProjects from './useDbProjects';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
console.info('%cFirebase initialized', 'color: blue');

// Firebase
export default firebase;

// Constants
export const db = firebase.firestore();

// Hooks
export { useFirebaseAuth };
export { useDbUser };
export { useDbProjects };

// Contexts
export const AuthUserContext = React.createContext(null);
export const DbUserContext = React.createContext(null);
export const DbProjectsContext = React.createContext(null);

// Helper functions
export const generateCredential = password =>
    firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, password);

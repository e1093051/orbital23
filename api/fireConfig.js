import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8rkgg-QboOH1JaESJzNyogY3FTMEeKAs",
  authDomain: "nusocialize.firebaseapp.com",
  projectId: "nusocialize",
  storageBucket: "nusocialize.appspot.com",
  messagingSenderId: "262204232571",
  appId: "1:262204232571:web:2312a5bd34c62c68fba3de",
  measurementId: "G-JQ86584KJQ",
  storageBucket: "nusocialize.appspot.com"
};

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
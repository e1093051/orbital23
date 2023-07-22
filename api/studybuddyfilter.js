//reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload
//reference to: https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
//reference to: https://stackoverflow.com/questions/51481192/firestore-update-all-documents-in-collections




import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';
import React, { Component, useState, useRef } from 'react';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);



export async function studybuddyfilter(filterModule, filterPlace) {
  let query = collection(db, "NUS", "studybuddy", "post");
  let querySnapshot = (await getDocs(query)).docs;
  if (filterModule !== "") {
    querySnapshot = querySnapshot.filter(doc => {
      const course = doc.data().course || "";
      return course == filterModule;
    });
    console.log("Hehe");
  }
  if (filterPlace !== "") {
    querySnapshot = querySnapshot.filter(doc => {
      const year = doc.data().place || "";
      return year == filterPlace;
    });
  }
  return querySnapshot;
}
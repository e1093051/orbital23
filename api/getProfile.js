// reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload


import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc } from "firebase/firestore";


export const getProfile = async () => {
  const docRef = doc(db, "NUS", "users",`${auth.currentUser.uid}`, "profile");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

// reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload


import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore"; 


export const setBio = async ({ bio }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS", "users",`${auth.currentUser.uid}`, "profile"), {
      bio: bio
    });
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setGender = async ({ gender }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS","users",`${auth.currentUser.uid}`, "profile"), {
      gender: gender
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setMajor = async ({ major, showMajor }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS","users",`${auth.currentUser.uid}`, "profile"), {
      major: major,
      showMajor: showMajor
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setCourse = async ({ course, showCourse }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS","users",`${auth.currentUser.uid}`, "profile"), {
      course: course,
      showCourse: showCourse
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setCountryAndRegion = async ({ countryAndRegion, showCountryAndRegion }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS","users",`${auth.currentUser.uid}`, "profile"), {
      countryAndRegion: countryAndRegion,
      showCountryAndRegion: showCountryAndRegion
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setHobby = async ({ hobby, showHobby }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS","users",`${auth.currentUser.uid}`, "profile"), {
      hobby: hobby,
      showHobby: showHobby
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setYear = async ({ year, showYear }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS","users",`${auth.currentUser.uid}`, "profile"), {
      year: year,
      showYear: showYear 
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

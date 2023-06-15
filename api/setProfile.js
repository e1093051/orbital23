// reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload


import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore"; 


export const setBio = async ({ bio }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
      bio: bio,
      rejected: [],  //who the user is rejected by
      accepted: [],  //who the user is accepted
      waiting: [],  //who the user is waiting for reply
      recommended: [],  //who the user is waiting to be recommended
      friend: [auth.currentUser.uid],
      avoid: [auth.currentUser.uid],  //the union of rejected, accepted, waiting, recommended and friend
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

export const setGender = async ({ gender }, onSuccess, onError) => {
  try { 
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
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
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
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
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
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
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
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
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
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
    const snapShot = await (getDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid)));
    const profileData = snapShot.data();
    let show = 0;
    if (profileData.showMajor == true) {
      show += 1;
    }
    if (profileData.showYear == true) {
      show += 1;
    }
    if (profileData.showCourse == true) {
      show += 1;
    }
    if (profileData.showCountryAndRegion == true) {
      show += 1;
    }
    if (profileData.showHobby == true) {
      show += 1;
    }
    await setDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
      year: year,
      showYear: showYear,
      show: show, 
    },
    {merge: true});
    return onSuccess();
  } catch (error){
    return onError(error);
  }
}

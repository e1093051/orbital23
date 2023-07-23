// reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload


import { auth, storage } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export const logIn = async ( {email, password}, firstTimeUser, onSuccess, onError) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser.emailVerified) {
      if (auth.currentUser.photoURL == null) {
        return firstTimeUser(user);
      }
      return onSuccess(user);
    }
    Alert.alert("email is not verified");
    return signOut(auth, auth.currentUser);
  } catch(error) {
    return onError(error);
  }
}

export const signUp = async ( {name, email, password}, onSuccess, onError) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      await sendEmailVerification(auth.currentUser);
      await updateProfile(auth.currentUser, {displayName: name});
      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
}

export const resetPassword = async ( {email}, onSuccess, onError) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}


export const setProfilePicture = async ( {image}, onSuccess, onError ) => {
  try {
    const blob = await ((fetch(image))
    .then((response)=> response.blob()));
    const user = ref (storage, `NUS/users/${auth.currentUser.uid}`);
    const reference = ref(user, 'profile.jpg');
    await uploadBytesResumable(reference, blob);
    const url = await getDownloadURL(reference);
    await updateProfile(auth.currentUser, {photoURL:url});
    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.photoURL);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const setDefaultProfilePicture = async ( onSuccess, onError ) => {
  try {
    const url = "https://firebasestorage.googleapis.com/v0/b/nusocialize.appspot.com/o/Standard_Profile.png?alt=media&token=11e9b82d-f80f-4b76-89d1-a68c1ef05dc3";
    await updateProfile(auth.currentUser, {photoURL:url});
    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.photoURL);
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}




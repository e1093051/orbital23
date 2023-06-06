// reference to: https://github.com/purfectliterature/simplist/tree/main

import { auth, firebase } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';


export const logIn = async ( {email, password}, onSuccess, onError) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser.emailVerified) {
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
      await updateProfile(auth.currentUser, {name});
      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
}

export const resetPassword = async ( {email}, onSuccess, onError) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Password reset email sent");
    return onSuccess;
  } catch (error) {
    return onError(error);
  }
}


// reference to: https://github.com/purfectliterature/simplist/tree/main

import { auth } from './fireConfig'
import { firebase } from "./fireConfig";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';


export const logIn = async ( {email, password}, onSuccess, onError) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return onSuccess(user);
  } catch(error) {
    return onError(error);
  }
}

export const signUp = async ( {name, email, password}, onSuccess, onError) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      await updateProfile(auth.currentUser, {name});
      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
}


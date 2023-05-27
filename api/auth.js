// reference to: https://github.com/purfectliterature/simplist/tree/main

import firebase from "./fireConfig"
import auth from "./fireConfig"


export const logIn = async ( {email, password}, onSuccess, onError) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return onSuccess(user);
  } catch(error) {
    return onError(error);
  }
}
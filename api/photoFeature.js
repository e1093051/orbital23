import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';

export const photoFeatureAPI = async ( {photo}, onSuccess, onError ) => {
  try {
    const blob = await ((fetch(photo))
    .then((response)=> response.blob()));
    const user = ref (storage, `NUS/users/${auth.currentUser.uid}`);
    const reference = ref(user, 'profile.jpg');
    await uploadBytesResumable(reference, blob);
    const url = await getDownloadURL(reference);
    await updateProfile(auth.currentUser, {photoFeatureURL:url});
    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.photoURL);
    onSuccess(url);
  } catch (error) {
    return onError(error);
  }
}



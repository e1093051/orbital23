import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";



export const photoFeatureAPI = async ( {image}, onSuccess, onError ) => {
  try {
    const blob = await ((fetch(image))
    .then((response)=> response.blob()));
    const user = ref (storage, `NUS/users/${auth.currentUser.uid}`);
    const reference = ref(user, 'picture.jpg');
    await uploadBytesResumable(reference, blob);
    const url = await getDownloadURL(reference);
    await setDoc(doc(db, "NUS", "users", "Forum",`${auth.currentUser.uid}`), {
       photoFeatureURL: url 
      }, { merge: true }
    )
    onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const lastPostTimestampAPI = async (onSuccess, onError) => {
  try {
    await setDoc(
      doc(db, "NUS", "users", "Forum", `${auth.currentUser.uid}`),
      {
        lastPostTimestamp: serverTimestamp(),
      },
      { merge: true }
    );
    onSuccess();
  } catch (error) {
    onError(error);
  }
};

export const likesAPI = async (onSuccess, onError) => {
  try {
    await setDoc(
      doc(db, "NUS", "users", "Forum", `${auth.currentUser.uid}`),
      {
        likes: [],
      },
      { merge: true }
    );
    onSuccess();
  } catch (error) {
    onError(error);
  }
};




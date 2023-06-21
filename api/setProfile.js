// reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload


import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';


export const showMajorAPI = async ({ showMajor }) => {
  await updateDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
    showMajor: showMajor
  });
}


export const showCourseAPI = async ({ showCourse }) => {
  await updateDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
    showCourse: showCourse
  });
}


export const showHobbyAPI = async ({ showHobby }) => {
  await updateDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
    showHobby: showHobby
  });
}



export const showCountryAndRegionAPI = async ({ showCountryAndRegion }) => {
  await updateDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
    showCountryAndRegion: showCountryAndRegion
  });
}


export const showYearAPI = async ({ showYear }) => {
  await updateDoc(doc(db, "NUS", "users","profile",`${auth.currentUser.uid}`), {
    showYear: showYear
  });
}




export const updateName = async ({ name }) => {
  await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
    name: name,
  },
    { merge: true });
}

export const updatePhoto = async () => {
  const [image, setImage] = useState(null);
  const [hasChangedPicture, setHasChangedPicture] = useState(false);

  const setProfilePicture = () => {
    if (hasChangedPicture) {
      Authentication.setProfilePicture(
        { image },
        () => navigation.navigate('Form1'),
        (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later'))
      )
    }
    else {
      Authentication.setDefaultProfilePicture(
        () => navigation.navigate('Form1'),
        (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later'))
      )
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasChangedPicture(true);
    }
  };
}


export const setNameAndPhoto = async () => {
  await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
    name: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL
  },
    { merge: true });
}

export const setBio = async ({ bio }, onSuccess, onError) => {
  try {
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      bio: bio,
      rejected: [],  //who the user is rejected by
      accepted: [],  //who the user is accepted
      waiting: [],  //who the user is waiting for reply
      recommended: [],  //who the user is waiting to be recommended
      invite: [], //the invitation the user received, showin in request page
      friend: [auth.currentUser.uid],
      avoid: [auth.currentUser.uid],  //the union of rejected, accepted, waiting, recommended and friend
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const setGender = async ({ gender }, onSuccess, onError) => {
  try {
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      gender: gender
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}


export const setMajor = async ({ major, showMajor }, onSuccess, onError) => {
  try {
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      major: major,
      showMajor: showMajor
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const setCourse = async ({ course, showCourse }, onSuccess, onError) => {
  try {
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      course: course,
      showCourse: showCourse
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const setCountryAndRegion = async ({ countryAndRegion, showCountryAndRegion }, onSuccess, onError) => {
  try {
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      countryAndRegion: countryAndRegion,
      showCountryAndRegion: showCountryAndRegion
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const setHobby = async ({ hobby, showHobby }, onSuccess, onError) => {
  try {
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      hobby: hobby,
      showHobby: showHobby
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const setYear = async ({ year, showYear }, onSuccess, onError) => {
  try {
    const snapShot = await (getDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`)));
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
    await setDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      year: year,
      showYear: showYear,
      show: show,
    },
      { merge: true });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}

export const showHobby = async ({ showHobby }) => {
  await updateDoc(doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`), {
    showHobby: showHobby
  });
}


export const updateHobby = async ({ hobby }, onSuccess, onError) => {
  try {
    await updateDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
      hobby: hobby,
    });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
}
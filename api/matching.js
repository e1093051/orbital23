//reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload
//reference to: https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
//reference to: https://stackoverflow.com/questions/51481192/firestore-update-all-documents-in-collections




import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';
import React, { Component, useState, useRef } from 'react';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion } from "firebase/firestore";

const getData = (uid) => {
  getDoc(doc(db, "NUS/users", uid, "profile"))
    .then(docSnap => setProfileData(docSnap.data()));
}


export async function initializeMatch() {
  profileRef = collection(db, "NUS", "users", "profile");
  const querySnapshot = await getDocs(collection(db, "NUS", "users", "profile"));
  querySnapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, {
      match: true
    });
  });
}

export async function setMatchValue() {
  const profileRef = collection(db, "NUS", "users", "profile");
  const q = query(profileRef, where("avoid", "array-contains", auth.currentUser.uid));
  const querySnapshot = await (getDocs(q));
  //const querySnapshot = await getDocs(collection(db, "NUS", "users", "profile"));
  querySnapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, {
      match: false
    });
  });
}


export async function updateRecommendAndPoint(recommendList, pointList) {
  await setDoc(doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`), {
    recommend: recommendList,
    point: pointList
  },
    { merge: true });
}

export async function updateAvoid(uid) {
  await updateDoc(doc(db, "NUS", "users", "profile", `${uid}`), {
    avoid: arrayUnion(auth.currentUser.uid),
  })
}

async function score(profileData1, profileData2) {
  let point = 0;
  if (profileData1.major == profileData2.major) {
    point += 1;
  }
  if (profileData1.countryAndRegion == profileData2.countryAndRegion) {
    point += 1;
  }
  if (profileData1.year == profileData2.year) {
    point += 1;
  }
  for (let i = 0; i < profileData1.course.length; i++) {
    if ((profileData2.course).includes(profileData1.course[i])) {
      point += 0.2;
    }
  }
  for (let i = 0; i < profileData1.hobby.length; i++) {
    if ((profileData2.hobby).includes(profileData1.hobby[i])) {
      point += 0.2;
    }
  }
  return point;
}

async function generateRecommendList(recommendList, pointList, data, point) {
  if (recommendList.length == 0) {
    await recommendList.push(data);
    await pointList.push(point);
    console.log(recommendList);
    console.log(pointList);
  }
  else {
    if (point > pointList[0]) {
      await pointList.splice(0, 0, point);
      await recommendList.splice(0, 0, data);
    }
    else if (point < pointList[pointList.length - 1]) {
      await pointList.push(point);
      await recommendList.push(data);
    }
    else {
      for (i = 0; i < pointList.length - 1; i += 1) {
        if (point < pointList[i] && (point > pointList[i + 1] || point == pointList[i + 1])) {
          await pointList.splice(i + 1, 0, point);
          await recommendList.splice(i + 1, 0, data);
          i = pointList.length;
        }
      }
    }
  }
  await updateRecommendAndPoint(recommendList, pointList);
}


export async function generateMatchingPool() {
  await initializeMatch();
  await setMatchValue();
  const profileData = await getDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid))
    .then(docSnap => docSnap.data());
  const recommendList = profileData.recommend;
  const pointList = profileData.point;
  profileRef = collection(db, "NUS", "users", "profile");
  const q = query(profileRef, where("match", "==", true));
  const querySnapshot = await (getDocs(q));
  if (querySnapshot.size != 0) {
    const q1 = query(profileRef, where("show", "==", 5), where("match", "==", true));
    const querySnapshot1 = await (getDocs(q1));

    if (querySnapshot1.size != 0) {
      const index = Math.floor(Math.random() * querySnapshot1.size);
      console.log(querySnapshot1.docs[index].id, querySnapshot1.docs[index].data());
      const point = await (score(profileData, querySnapshot1.docs[index].data()));
      await generateRecommendList(recommendList, pointList, querySnapshot1.docs[index].id, point);
      await updateAvoid(querySnapshot1.docs[index].id);
    }


    else {
      const q2 = query(profileRef, where("show", "==", 4), where("match", "==", true));
      const querySnapshot2 = await (getDocs(q2));
      if (querySnapshot2.size != 0) {
        const index = Math.floor(Math.random() * querySnapshot2.size);
        console.log(querySnapshot2.docs[index].id);
        console.log(querySnapshot2.docs[index].id, querySnapshot2.docs[index].data());
        const point = await (score(profileData, querySnapshot2.docs[index].data()));
        await generateRecommendList(recommendList, pointList, querySnapshot2.docs[index].id, point);
        await updateAvoid(querySnapshot2.docs[index].id);
      }
      else {
        const q3 = query(profileRef, where("show", "==", 3), where("match", "==", true));
        const querySnapshot3 = await (getDocs(q3));
        if (querySnapshot3.size != 0) {
          const index = Math.floor(Math.random() * querySnapshot3.size);
          console.log(querySnapshot3.docs[index].id);
          console.log(querySnapshot3.docs[index].id, querySnapshot3.docs[index].data());
          const point = await (score(profileData, querySnapshot3.docs[index].data()));
          await generateRecommendList(recommendList, pointList, querySnapshot3.docs[index].id, point);
          await (updateAvoid(querySnapshot3.docs[index].id));
        }
        else {
          const index = Math.floor(Math.random() * querySnapshot.size);
          console.log(querySnapshot.docs[index].id);
          console.log(querySnapshot.docs[index].id, querySnapshot.docs[index].data());
          const point = await (score(profileData, querySnapshot.docs[index].data()));
          await generateRecommendList(recommendList, pointList, querySnapshot.docs[index].id, point);
          await (updateAvoid(querySnapshot.docs[index].id));
        }
      }
    }
  }
  else {
    console.log("no match");
  }
}


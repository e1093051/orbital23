//reference to: https://github.com/purfectliterature/simplist/tree/main
//reference to: https://github.com/ProProgramming101/expo-firebase-image-upload
//reference to: https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
//reference to: https://stackoverflow.com/questions/51481192/firestore-update-all-documents-in-collections




import { auth, firebase, storage, db } from './fireConfig'
import { Alert } from 'react-native';
import React, { Component, useState, useRef } from 'react';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";

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



export async function updateRecommendAndPoint(recommendList, pointList) {
  await setDoc(doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`), {
    recommend: recommendList,
    point: pointList
  },
    { merge: true });
}

export async function updatePoint(pointList) {
  await setDoc(doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`), {
    point: pointList
  },
    { merge: true });
}

export async function updateAvoid(uid) {
  await updateDoc(doc(db, "NUS", "users", "profile", uid), {
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
  let modified = false;

  if (recommendList.length == 0) {
    recommendList.push(data);
    pointList.push(point);
    modified = true;
    //console.log(recommendList);
    //console.log(pointList);
  } else {
    if (point >= pointList[0]) {
      pointList.splice(0, 0, point);
      recommendList.splice(0, 0, data);
      modified = true;
      //console.log(recommendList);
      //console.log(pointList);
    } else if (point <= pointList[pointList.length - 1]) {
      pointList.push(point);
      recommendList.push(data);
      modified = true;
      //console.log(recommendList);
      //console.log(pointList);
    } else {
      let i;
      for (i = 0; i < pointList.length - 1; i += 1) {
        if (point < pointList[i] && (point > pointList[i + 1] || point == pointList[i + 1])) {
          pointList.splice(i + 1, 0, point);
          recommendList.splice(i + 1, 0, data);
          modified = true;
          i = pointList.length;
          console.log("Hello");
        }
      }
    }
  }

  if (modified) {
    await updateRecommendAndPoint(recommendList, pointList);
  }
}

export async function generateMatchingPool() {
  const profileData = await getDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid))
    .then(docSnap => docSnap.data());
  const recommendList = profileData.recommend;
  const pointList = profileData.point;
  profileRef = collection(db, "NUS", "users", "profile");

  const q = query(profileRef, where("show", "!=", 6)); //change to show me on recommendation later
  const querySnapshot = await (getDocs(q));
  const filteredUsers = querySnapshot.docs.filter(doc => {
    const avoidList = doc.data().avoid || [];
    return !avoidList.includes(auth.currentUser.uid);
  });
  if (filteredUsers.length != 0) {
    const q1 = query(profileRef, where("show", "==", 5));
    const querySnapshot1 = await (getDocs(q1));
    const filteredUsers1 = querySnapshot1.docs.filter(doc => {
      const avoidList = doc.data().avoid || [];
      return !avoidList.includes(auth.currentUser.uid);
    });
    if (filteredUsers1.length != 0) {
      const selectedUser1 = filteredUsers1[Math.floor(Math.random() * filteredUsers1.length)];
      const selectedUserId1 = selectedUser1.id;
      console.log(selectedUserId1);

      const point = await (score(profileData, selectedUser1.data()));
      await generateRecommendList(recommendList, pointList, selectedUserId1, point);
      await updateAvoid(selectedUserId1);
    }
    else {
      const q2 = query(profileRef, where("show", "==", 4));
      const querySnapshot2 = await (getDocs(q2));
      const filteredUsers2 = querySnapshot2.docs.filter(doc => {
        const avoidList = doc.data().avoid || [];
        return !avoidList.includes(auth.currentUser.uid);
      });
      if (filteredUsers2.length != 0) {
        const selectedUser2 = filteredUsers2[Math.floor(Math.random() * filteredUsers2.length)];
        const selectedUserId2 = selectedUser2.id;
        console.log(selectedUserId2);

        const point = await (score(profileData, selectedUser2.data()));
        await generateRecommendList(recommendList, pointList, selectedUserId2, point);
        await updateAvoid(selectedUserId2);
      }
      else {
        const q3 = query(profileRef, where("show", "==", 3));
        const querySnapshot3 = await (getDocs(q3));
        const filteredUsers3 = querySnapshot3.docs.filter(doc => {
          const avoidList = doc.data().avoid || [];
          return !avoidList.includes(auth.currentUser.uid);
        });
        if (filteredUsers3.length != 0) {
          const selectedUser3 = filteredUsers3[Math.floor(Math.random() * filteredUsers3.length)];
          const selectedUserId3 = selectedUser3.id;
          console.log(selectedUserId3);

          const point = await (score(profileData, selectedUser3.data()));
          await generateRecommendList(recommendList, pointList, selectedUserId3, point);
          await updateAvoid(selectedUserId3);
        }
        else {
          const selectedUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
          const selectedUserId = selectedUser.id;
          console.log(selectedUserId);

          const point = await (score(profileData, selectedUser.data()));
          await generateRecommendList(recommendList, pointList, selectedUserId, point);
          await updateAvoid(selectedUserId);
        }
      }
    }
    return true;
  }
  else {
    console.log("no match")
    return(false);
  }
}

export async function match() {
  const profileData = await getDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid))
    .then(docSnap => docSnap.data()).then()
  const recommendList = profileData.recommend;
  let length = recommendList.length;
  while (length < 10) {
    const matchFound = await generateMatchingPool();
    if (!matchFound) {
      break;
    };
    length++;
  }
}

export async function showRecommendation() {
  await match();
  const profileData = await getDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid))
    .then(docSnap => docSnap.data());
  const recommendList = profileData.recommend;
  const pointList = profileData.point;
  if (recommendList.length !== 0) {
    return recommendList[0];
  }
  if (recommendList.length === 0) {
    return null;
  }
}

export async function connect(recommend, recommendList, pointList) {
  await updateDoc(doc(db, "NUS", "users", "profile", recommend), {
    invite: arrayUnion(auth.currentUser.uid),
  });
  if (pointList.lengh > 1) {
    pointList[1] = 100;
  }
  recommendList.shift();
  pointList.shift();
  await updateDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid), {
    recommend: recommendList,
    point: pointList
  })
}

export async function skip(recommendList, pointList) {
  if (pointList.lengh > 1) {
    pointList[1] = 100;
  }
  recommendList.shift();
  pointList.shift();
  await updateDoc(doc(db, "NUS/users", "profile", auth.currentUser.uid), {
    recommend: recommendList,
    point: pointList
  })
}

export async function acceptRequest(uid) {
  await updateDoc(doc(db, "NUS", "users", "profile", uid), {
    friend: arrayUnion(auth.currentUser.uid),
  });
  await updateDoc(doc(db, "NUS", "users", "profile", auth.currentUser.uid), {
    friend: arrayUnion(uid),
    invite: arrayRemove(uid),
    avoid: arrayUnion(uid)
  });
}

export async function skipReqest(uid) {
  await updateDoc(doc(db, "NUS", "users", "profile", auth.currentUser.uid), {
    invite: arrayRemove(uid)
  });
}


export async function filter(filterGender, filterMajor, filterCourse, filterCountryAndRegion, filterYear, filterHobby) {
  let query = collection(db, "NUS", "users", "profile");
  let querySnapshot = await getDocs(query);
  if (filterGender !== '') {
   querySnapshot = querySnapshot.docs.filter(doc => {
    const gender = doc.data().gender || "";
    return gender==filterGender;
  });
    console.log("Hola");
  }
  if (filterMajor !== '') {
    querySnapshot = querySnapshot.filter(doc => {
      const major = doc.data().major || "";
      const show = doc.data().showMajor || false;
      return major==filterMajor && show;
    });
    console.log("Haha");
  }
  if (filterCourse !== '') {
    querySnapshot = querySnapshot.filter(doc => {
      const course = doc.data().course || "";
      const show = doc.data().showCourse || false;
      return course==filterCourse && show;
    });
    console.log("Hehe");
  }
  if (filterCountryAndRegion !== '') {
    querySnapshot = querySnapshot.filter(doc => {
      const countryAndRegion = doc.data().countryAndRegion || "";
      const show = doc.data().showCountryAndRegion || false;
      return countryAndRegion==filterCountryAndRegion && show;
    });
  }
  if (filterYear !== '') {
    querySnapshot = querySnapshot.filter(doc => {
      const year = doc.data().year || "";
      const show = doc.data().showYear || false;
      return year==filterYear && show;
    });
  }
  if (filterHobby !== '') {
    querySnapshot = querySnapshot.filter(doc => {
      const hobby = doc.data().hobby || "";
      const show = doc.data().showHobby || false;
      return hobby==filterHobby && show;
    });
  }
  return querySnapshot;
}

export async function filterMatch(filterGender, filterMajor, filterCourse, filterCountryAndRegion, filterYear, filterHobby) {
filter(filterGender, filterMajor, filterCourse, filterCountryAndRegion, filterYear, filterHobby)
  .then(async(querySnapshot) => {
    const filteredUsers = querySnapshot.filter(doc => {
      const avoidList = doc.data().avoid || [];
      return !avoidList.includes(auth.currentUser.uid);
    });
    if (filteredUsers.length != 0) {
      const selectedUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      const selectedUserId = selectedUser.id;
      console.log(selectedUserId);
    }
    else {
      console.log("no available users")
    }
  })
}
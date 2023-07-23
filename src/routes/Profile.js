import React, { useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';

import { db, auth } from '../../api/fireConfig';
import {  doc, getDoc, onSnapshot } from "firebase/firestore";






export default function Profile({navigation}) {

    const [profileData, setProfileData] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [friend, setFriend] = useState([]);

    const getData = () => {
      onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
        setProfileData(doc.data());
      })
    }

    const processData = async () => {
      if (profileData && profileData.friend) {
        let friend = [];
        if (profileData.friend.length > 6) {
          for (let i = 0; i < 6; i++) {
            friend[i] = profileData.friend[i];
          }
        }
        else {
          friend = profileData.friend;
        }
        const formattedFriend = friend.map(async (uid) => {
          const friendDocRef = doc(db, "NUS/users", "profile", uid);
          const friendDocSnap = await getDoc(friendDocRef);
          const friendData = friendDocSnap.data();
          return { name: friendData.name, photoURL: friendData.photoURL, uid: uid };

        });
        Promise.all(formattedFriend).then((formattedData) => {
          setFriendList(formattedData);
          console.log(formattedData);
        });
      }
    };

    useEffect(() => {
      getData();
    }, [])

    useEffect(() => {
      processData();
    }, [profileData])

    useEffect(() => {
      if (profileData) {
        setFriend(profileData.friend)
      }
    }, [profileData]);

    return (
      <ScrollView style = {{flex: 1, backgroundColor: 'white'}}>
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 20 }}>
        <View style={{ alignItems: 'center' }}>
          {profileData && (
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                marginBottom: 10,
              }}
              source={{ uri: profileData.photoURL }}
            />
          )}
          <View style={{
            alignItems: 'center',
            marginTop: 0,
            justifyContent: 'flex-start',
          }}>
            {profileData && (
              <Text style={{
                fontSize: 19,
                fontWeight: 'bold',
                marginTop: 0,
              }}>{profileData.name}</Text>
            )}
          </View>

          <View style={styles.spacer} />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("EditPhoto")}
          >
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Text style={{ paddingLeft: 8, fontSize: 15.5, color: '#b9b9b9' }}>Friends</Text>
          <TouchableOpacity style={{ paddingRight: 8 }} onPress={() => navigation.navigate("Friends", {friend})}>
            <Text style={{ fontSize: 13 }}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 12, flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
          {profileData && <Text>{profileData.friend.length}</Text>}
          <Text> Friends</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        {profileData && profileData.friend.length > 0 && <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5}}>
        {profileData && profileData.friend.length > 0 && <View style = {{paddingRight: 5}}>
        <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[0].uid})}>
              {friendList[0] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[0].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[0] && <Text style={{ }}>{friendList[0].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 1 && <View style = {{paddingRight: 5}}>
            <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[1].uid})}>
              {friendList[1] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[1].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[1] && <Text style={{ }}>{friendList[1].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 2 && <View>
              <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[2].uid})}>
              {friendList[2] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[2].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[2] && <Text style={{ }}>{friendList[2].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
          </View>}
          {profileData && profileData.friend.length > 3 && <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 5}}>
          {profileData && profileData.friend.length > 3 && <View style = {{paddingRight: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[3].uid})}>
              {friendList[3] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[3].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[3] && <Text style={{ }}>{friendList[3].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 4 && <View style = {{paddingRight: 5}}>
            <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[4].uid})}>
              {friendList[4] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[4].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[4] && <Text style={{ }}>{friendList[4].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 5 && <View>
              <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[5].uid})}>
              {friendList[5] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[5].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[5] && <Text style={{ }}>{friendList[5].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
          </View>}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ paddingLeft: 8, fontSize: 15.5, color: '#b9b9b9' }}>Personal Information</Text>
          <TouchableOpacity style={{ paddingRight: 8 }} onPress={() => navigation.navigate("Edit")}>
            <Text style={{ fontSize: 13 }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 5 }}>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Name</Text>
            {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.name}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>

            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Bio</Text>
            {auth.currentUser && profileData && (
              <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
                {profileData.bio}
              </Text>
            )}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Gender</Text>
            {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.gender}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Major</Text>
            {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.major}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Course</Text>
            {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.course.join(", ")}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Country and Region</Text>
            {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.countryAndRegion}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Hobby</Text>
            {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.hobby.join(", ")}</Text>}
          </View>
        </View>
      </View>
      <View style = {{height: 20}}>
      </View>
      </ScrollView>
    );
}
  

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: Dimensions.get("window").width - 60,
    backgroundColor: '#2de0ff',
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    marginBottom: 10,
    //borderWidth: 1,
    //borderColor: '#c7c7c7'
  },
  buttonText: {

    color: 'white',
    fontWeight: 'bold',

    fontSize: 14,
  },

  spacer: {
    height: 20,
  },

  spacer_1: {
    height: 20,
  },

  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  mainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    margin: 10
  },
  usual: {
    color: 'gray',
    fontSize: 16,
    margin: 3,
    left: 12
  },
  list: {
    fontSize: 14
  },
  dropdown: {
    margin: 16,
    marginTop: -8,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: 90,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textInput: {
    margin: 16,
    marginTop: -8,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 32,
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 40,
    width: Dimensions.get('window').width - 50,
    position: 'absolute',
    bottom: 15,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#2de0ff',
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});











import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Image, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Keyboard} from 'react-native';
import { collection, query, orderBy, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/fireConfig';
import { useRoute } from '@react-navigation/native';
import { auth } from '../../api/fireConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PostComments() {
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyParentId, setReplyParentId] = useState('');
  const [replyParentDepth, setReplyParentDepth] = useState(-1);
  const [reply, setReply] = useState(null);
  const [shouldRender, setShouldRender] = useState(true);

  const route = useRoute();
  const { id } = route.params;
  const { post } = route.params;
  const [profile, setProfileData] = useState(null);

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    fetchComments();
  }, [shouldRender]);

  const fetchComments = async () => {
    const commentsQuery = query(
      collection(db, 'NUS', 'studybuddy', 'post', id, 'comment'),
      where('postId', '==', id),
      orderBy('timestamp')
    );

    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Fetch user data for each post
    const userDataPromises = commentsData.map((comments) => {
      const userDocRef = doc(db, 'NUS/users', 'profile', comments.who);
      return getDoc(userDocRef);
    });

    const userDataSnapshots = await Promise.all(userDataPromises);
    const userData = userDataSnapshots.map((snapshot) => snapshot.data());

    // Combine post data with user data
    const commentsWithUserData = commentsData.map((comments, index) => ({
      ...comments,
      userData: userData[index],
    }));

    const groupedComments = groupComments(commentsWithUserData);
    setComments(groupedComments);
  };

  const groupComments = (comments) => {
    const commentMap = new Map();
    const rootComments = [];

    comments.forEach((comment) => {
      if (comment.parentId) {
        if (commentMap.has(comment.parentId)) {
          const parentComment = commentMap.get(comment.parentId);
          if (!parentComment.replies) {
            parentComment.replies = [];
          }
          parentComment.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
      commentMap.set(comment.id, comment);
    });

    return rootComments;
  };

  const addReply = async ({ parentId, parentDepth }) => {
    if (replyText.trim() === '') return;

    const reply = {
      content: replyText,
      postId: id,
      parentId: parentId,
      depth: parentDepth + 1,
      timestamp: new Date().toISOString(),
      who: auth.currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, 'NUS', 'studybuddy', 'post', id, 'comment'), reply);
      const replyWithId = { id: docRef.id, ...reply };
      setComments((prevComments) => updateReplies(prevComments, parentId, replyWithId));
      setShouldRender(!shouldRender);
      setReplyText('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const updateReplies = (comments, parentId, newReply) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies.push(newReply);
      } else if (comment.replies) {
        comment.replies = updateReplies(comment.replies, parentId, newReply);
      }
      return comment;
    });
  };

  const renderCommentItem = ({ item }) => {
    if (!item.userData) {
      // Handle the case where userData is missing or undefined
      return null;
    }
    return (
      <View style={{ marginLeft: item.depth * 8 + 4 || 4}}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{
              width: 20,
              height: 20,
              borderRadius: 200,
            }}
            source={{ uri: item.userData.photoURL }}
          />
          <View style={{ paddingLeft: 3 }}>
            <Text>{item.userData.name}</Text>
          </View>
        </View>
        <View style={{ paddingLeft: 18 }}>
          <Text>{item.content}</Text>
        </View>
        <View style={{ paddingLeft: 18, paddingBottom: 6 }}>
          <TouchableOpacity onPress={() => { setReplyParentId(item.id); setReplyParentDepth(item.depth); setReply(item); setIsReplying(true); }}>
            <Text style={{ fontSize: 13, color: 'gray' }}>Reply</Text>
          </TouchableOpacity>
        </View>
        {item.replies && (
          <FlatList
            nestedScrollEnabled
            data={item.replies}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style = {[
      keyboardStatus ? styles.Keyboardshown : styles.KeyboardNotShown,
      Platform.OS === 'ios' ? styles.iosBackground: styles.androidBackground,
    ]} behavior={Platform.OS === 'ios' ? 'padding' : 'height' }> 
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ width: Dimensions.get('window').width - 4, marginLeft: 1, paddingLeft: 8, marginBottom: 5, paddingBottom: 6, paddingRight: 8, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 200,
              }}
              source={{ uri: post.userData.photoURL }}
            />
            <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 3, paddingLeft: 8 }}>{post.userData.name}</Text>
          </View>
          <Text style={{ fontSize: 19, fontWeight: 'bold', paddingVertical: 3, paddingTop: 8 }}>{post.title}</Text>
          <View style={{ flexDirection: 'row', paddingVertical: 3 }}>
          <View style={{ backgroundColor: '#3ea5e8', borderRadius: 5, justifyContent: 'center' }}>
              <Text style={{ fontSize: 13 }}>{post.place}</Text>
            </View>
            <View style={{ marginLeft: 15, backgroundColor: '#5dc6d8', justifyContent: 'center', borderRadius: 5 }}>
              <Text style={{ fontSize: 13 }}>{post.course}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 15 }}>{post.content}</Text>
        </View>
        <View style={{ paddingLeft: 8 }} />
        <FlatList
          nestedScrollEnabled
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id}
        />
        <View style = {{paddingBottom: 10}}>
        <View style={{ paddingLeft: 8, paddingTop: 6 }}>
          {isReplying && reply.userData.name && <Text>Replying to {reply.userData.name}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 2, margin: 1, borderRadius: 2, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, paddingTop: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={{
                width: 20,
                height: 20,
                borderRadius: 200,
              }}
              source={{ uri: auth.currentUser.photoURL }}
            />
            <View style={{ paddingLeft: 3, maxWidth: Dimensions.get('window').width - 60, paddingBottom: 10}}>
              <TextInput
                placeholder="Add a comment"
                value={replyText}
                onChangeText={setReplyText}
                multiline = {true}
              />
            </View>
          </View>
          <View style={{ paddingRight: 8 }}>
            <Ionicons name="send" size={20} onPress={() => {addReply({ parentId: replyParentId, parentDepth: replyParentDepth }); setIsReplying(false); setReply(null); setReplyParentDepth(-1); setReplyParentId("");}} />
          </View>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  sentMessage: {
    alignItems: 'flex-end',
    paddingRight: 5,
    borderWidth: 0,
    marginBottom: 8,
    marginTop: 4
  },
  receivedMessage: {
    alignItems: 'flex-start',
    paddingLeft: 5,
    borderWidth: 0,
    marginBottom: 8,
    marginTop: 4
  },
  sentTime: {
    flexDirection: 'row-reverse'
  },
  receivedTime: {
    flexDirection: 'row'
  },
  sentBox: {
    borderWidth: 1,
    borderColor: '#77c3e6',
    maxWidth: Dimensions.get('window').width / 2 - 10,
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRadius: 5,
    backgroundColor: '#77c3e6'
  },
  receivedBox: {
    borderWidth: 1,
    maxWidth: Dimensions.get('window').width / 2 - 10,
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  Keyboardshown: {
    flex:1,
    marginBottom: 55,
    backgroundColor: 'white'
  },
  KeyboardNotShown: {
    marginBottom: -15,
    flex:1,
    backgroundColor: 'white'
  },
  iosBackground: {
    backgroundColor: 'white',
     flex: 1,
  },
  androidBackground: {
    backgroundColor: 'white',
     flex: 1,
     paddingBottom: 60
  },
  iosInput: {
    paddingBottom: 30, paddingTop: 5, borderTopWidth: 1, marginTop: 5
  },
  androidInput: {
    paddingBottom: 0, paddingTop: 5, borderTopWidth: 1, marginTop: 5, marginBottom: 0
  },
  iosTextInput: 
    { width: Dimensions.get('window').width - 2, margin: 1, borderRadius: 2, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, paddingTop: 3 },

  androidTextInput: 
    { width: Dimensions.get('window').width - 2, margin: 1, borderRadius: 2, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 25, paddingTop: 3 },

});
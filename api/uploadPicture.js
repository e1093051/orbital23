
import { auth, firebase, storage } from './fireConfig'
import { ref } from "firebase/storage"
import { Alert } from 'react-native';

const storageRef = ref(storage)

const imageRef = ref(storage, 'images')
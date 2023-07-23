import React from 'react';
import { render } from '@testing-library/react-native';
import { HomePage } from '../Home'; 

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

// Mock the Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({
    addDoc: jest.fn().mockReturnValue(Promise.resolve()),
    collection: jest.fn().mockReturnThis(),
    setDoc: jest.fn().mockReturnValue(Promise.resolve()),
    doc: jest.fn().mockReturnValue(Promise.resolve()),
    updateDoc: jest.fn().mockReturnValue(Promise.resolve()),
    getDoc: jest.fn().mockReturnValue(Promise.resolve({ data: () => ({}) })),
  })),
}));

// Mock the Firebase storage functions
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({
    ref: jest.fn(),
    uploadBytesResumable: jest.fn().mockReturnValue(Promise.resolve()),
    getDownloadURL: jest.fn().mockReturnValue(Promise.resolve('mocked-url')),
  })),
}));

// Mock the Firebase authentication functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn().mockReturnValue(Promise.resolve({ user: null })),
    createUserWithEmailAndPassword: jest.fn().mockReturnValue(Promise.resolve({ user: null })),
    updateProfile: jest.fn(),
    sendEmailVerification: jest.fn().mockReturnValue(Promise.resolve()),
    signOut: jest.fn().mockReturnValue(Promise.resolve()),
    sendPasswordResetEmail: jest.fn().mockReturnValue(Promise.resolve()),
  })),
}));

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(), // Mock the initializeApp function with a Jest mock function
  };
});


jest.mock('@rneui/themed', () => {
  // Mock the CheckBox component
  const CheckBox = ({ checked, onChange }) => {
    return (
      <input type="checkbox" checked={checked} onChange={onChange} />
    );
  };

  // Mock the Icon component
  const Icon = ({ name }) => {
    return (
      <span>{name}</span>
    );
  };

  return {
    CheckBox,
    Icon,
  };
});

// Mock the Firestore functions
jest.mock('@firebase/firestore', () => ({
  db: {
    onSnapshot: jest.fn(),
    doc: jest.fn(),
    collection: jest.fn(),
  },
}));

// Mock the Firebase authentication functions
jest.mock('@firebase/auth', () => ({
  auth: {
    currentUser: { uid: 'test-user-uid' },
  },
}));

describe('Home', () => {
  // Mock the navigation object to pass to the component
  const mockNavigation = {
    navigate: jest.fn(),
  };

  // Mock the route object to pass to the component
  const mockRoute = {};

  test('renders HomePage without errors', () => {
    render(
      <HomePage navigation={mockNavigation} route={mockRoute} />
    );
  });
});

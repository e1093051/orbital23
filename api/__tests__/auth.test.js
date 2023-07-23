import { logIn, resetPassword } from '../auth';
import { auth, firebase, storage } from '../fireConfig';
import { Alert } from 'react-native';

// Mock the Firebase app and initialization functions
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
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

// Mock the Firebase storage functions
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({
    ref: jest.fn(),
    uploadBytesResumable: jest.fn().mockReturnValue(Promise.resolve()),
    getDownloadURL: jest.fn().mockReturnValue(Promise.resolve('mocked-url')),
  })),
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

describe('auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logIn function should call signInWithEmailAndPassword and onSuccess for email verified user', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const credentials = {
      email: 'test@u.nus.edu',
      password: 'testpassword',
    };

    await logIn(credentials, null, onSuccess, onError); 

    console.log('After calling logIn:', credentials);

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(credentials.email, credentials.password);
    expect(auth.currentUser.emailVerified).toBe(true);
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('resetPassword function should call sendPasswordResetEmail and onSuccess', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const email = 'test@u.nus.edu';

    await resetPassword({ email }, onSuccess, onError);


    expect(auth.sendPasswordResetEmail).toHaveBeenCalledWith(email);

    
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('resetPassword function should call onError if sendPasswordResetEmail throws an error', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    
    auth.sendPasswordResetEmail = jest.fn().mockRejectedValue(new Error('Mocked Error'));

    const email = 'test@u.nus.edu';

    await resetPassword({ email }, onSuccess, onError);

    
    expect(auth.sendPasswordResetEmail).toHaveBeenCalledWith(email);

    
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });
});

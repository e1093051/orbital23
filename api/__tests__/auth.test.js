//reference to: https://github.com/NUSConnect/Orbital2021/blob/main/src/api/_tests_/auth.test.js and ChatGPT
import { logIn, resetPassword } from '../auth';
import { auth, storage } from '../fireConfig';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// Mock the Firebase authentication functions
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(
    ),
    sendPasswordResetEmail: jest.fn(),
    sendEmailVerification: jest.fn(
      (auth, email) => {
        return new Promise(function (resolve, reject) {
          reject(new Error('Unable to send email'))
        })
      }
    ),
    updateProfile: jest.fn(
      (auth, user, name) => {
        return new Promise(function (resolve, reject) {
          reject(new Error('Unable to send email'))
        })
      }
    )
}));

jest.mock('../fireConfig', () => ({
  auth: jest.fn(),
  storage: jest.fn()
}))

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
  uploadBytesResumable: jest.fn()
}))

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

    // Mocking successful sign-in with emailVerified set to true
    const currentUser = { emailVerified: true, photoURL: "something" };
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: currentUser });

    await logIn(credentials, null, onSuccess, onError);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, credentials.email, credentials.password);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });


  it('resetPassword function should call sendPasswordResetEmail and onSuccess', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const email = 'test@u.nus.edu';

    // Mocking successful password reset
    sendPasswordResetEmail.mockResolvedValueOnce();

    await resetPassword({ email }, onSuccess, onError);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('resetPassword function should call onError if sendPasswordResetEmail throws an error', async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    // Mocking password reset error
    sendPasswordResetEmail.mockRejectedValueOnce(new Error('Mocked Error'));

    const email = 'test@u.nus.edu';

    await resetPassword({ email }, onSuccess, onError);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });
});

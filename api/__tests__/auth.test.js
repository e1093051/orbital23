const {
  logIn,
  signUp,
  resetPassword,
  setProfilePicture,
  setDefaultProfilePicture,
} = require('../api/auth');

// Mock firebase auth and storage functions
jest.mock('../api/fireConfig', () => {
  const auth = {
    currentUser: null,
  };

  return {
    auth,
    firebase: {
      auth,
    },
    storage: {
      ref: jest.fn(),
    },
  };
});

// Mock the Alert component from 'react-native'
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

// Mock fetch function for image upload
global.fetch = require('jest-fetch-mock');

beforeEach(() => {
  fetch.resetMocks();
});

// Add your tests here
describe('Authentication API tests', () => {
  // Test the logIn function
  it('logIn should call onSuccess when email is verified and photoURL is not null', async () => {
    // Mock necessary data for the test
    const email = 'test@example.com';
    const password = 'testpassword';
    const user = { emailVerified: true, photoURL: 'example.com/profile.jpg' };
    const firstTimeUser = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    // Mock the signInWithEmailAndPassword function from firebase auth
    const mockSignInWithEmailAndPassword = jest.fn(async () => ({ user }));
    require('../api/fireConfig').signInWithEmailAndPassword = mockSignInWithEmailAndPassword;

    // Call the logIn function
    await logIn({ email, password }, firstTimeUser, onSuccess, onError);

    // Expect the mock functions to be called correctly
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      require('../api/fireConfig').auth,
      email,
      password
    );
    expect(firstTimeUser).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith(user);
    expect(onError).not.toHaveBeenCalled();
  });
});
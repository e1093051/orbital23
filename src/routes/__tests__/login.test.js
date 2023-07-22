import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Login';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(), // Mock navigate function
  }),
}));

// Mock the authentication API module
jest.mock('../../../api/auth.js', () => ({
  logIn: jest.fn((credentials, onSuccess, onError) => {
    // Simulate successful login with correct email and password
    if (credentials.email === 'correct.email@u.nus.edu' && credentials.password === 'correctpassword') {
      onSuccess(); // Call the success callback to simulate a successful login
    } else {
      onError(new Error('Invalid email or password')); // Simulate an unsuccessful login
    }
  }),
}));

describe('Login', () => {
  it('navigates to the Home page upon successful login', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    const emailInput = getByPlaceholderText(' NUS email (@u.nus.edu)');
    const passwordInput = getByPlaceholderText(' Password');
    const loginButton = getByText('Log In');

    // Set the correct email and password
    fireEvent.changeText(emailInput, 'correct.email@u.nus.edu');
    fireEvent.changeText(passwordInput, 'correctpassword');

    // Press the login button
    fireEvent.press(loginButton);

    // Ensure that navigation.navigate was called with the correct route name ('Home')
    expect(useNavigation().navigate).toHaveBeenCalledWith('Home');
  });

  // Add more test cases here if needed
});

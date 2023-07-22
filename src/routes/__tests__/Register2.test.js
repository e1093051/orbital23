import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // Import jest-native matchers

// Mock the alert function
window.alert = jest.fn();

import Register2 from '../Register2';

// Define the mock navigate function
const mockNavigate = jest.fn();

// Mock the useNavigation and useRoute hooks
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate, // Use the mock navigate function
  }),
  useRoute: () => ({
    params: {
      name: 'Test User',
    },
  }),
}));

describe('Register2', () => {
  afterEach(() => {
    // Reset the mock function after each test
    mockNavigate.mockClear();
  });

  it('navigates to the next page if a valid NUS email is provided', () => {
    const { getByPlaceholderText, getByText } = render(<Register2 />);
    const emailInput = getByPlaceholderText('Enter your NUS email address...');
    const nextButton = getByText('Next');

    // Set a valid NUS email
    fireEvent.changeText(emailInput, 'valid.email@u.nus.edu');
    fireEvent.press(nextButton);

    // Ensure that navigation.navigate was called with the correct route name and params
    expect(mockNavigate).toHaveBeenCalledWith('Register3', {
      name: 'Test User',
      email: 'valid.email@u.nus.edu',
    });
  });

  it('shows an alert if an invalid NUS email is provided', () => {
    const { getByPlaceholderText, getByText } = render(<Register2 />);
    const emailInput = getByPlaceholderText('Enter your NUS email address...');
    const nextButton = getByText('Next');

    // Set an invalid NUS email
    fireEvent.changeText(emailInput, 'invalid.email@example.com');
    fireEvent.press(nextButton);

    // Ensure that an alert is shown with the correct message
    expect(window.alert).toHaveBeenCalledWith(
      'Please enter a valid NUS email (ends with @u.nus.edu).'
    );

    // Ensure that navigation.navigate is not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

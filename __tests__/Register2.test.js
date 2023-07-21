import React from 'react';
import renderer from 'react-test-renderer';
import Register2 from '../src/routes/Register2';
import { fireEvent, render, waitFor } from '@testing-library/react-native'; 

// Mock the alert function
global.alert = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      replace: jest.fn(),
    }),
    useRoute: () => ({
      params: { name: 'John' }, // A dummy name for the test
    }),
  };
});

describe('<Register2 />', () => {
  it('navigates to Register3 with a valid email', async () => {
    const { getByTestId, getByText } = render(<Register2 />); // Render the component

    // Test valid email addresses
    const validEmails = [
      'john@u.nus.edu',
      'jane.smith@u.nus.edu',
      'hello123@u.nus.edu',
    ];

    for (const email of validEmails) {
      const textInput = getByTestId('nextButton'); // Get the TextInput element by testID
      fireEvent.changeText(textInput, email); // Set the email value

      const nextButton = getByText('Next'); // Get the Next button element by its text
      fireEvent.press(nextButton); // Press the Next button

      await waitFor(() => {
        // Ensure that the 'navigate' function was called with the correct arguments
        expect(require('@react-navigation/native').useNavigation().navigate).toHaveBeenCalledWith('Register3', {
          name: 'John', // Pass the name along with the email
          email,
        });
      });

      // Check if alert was called
      expect(global.alert).toHaveBeenCalledWith(
        "Please enter a valid NUS email (ends with @u.nus.edu)."
      );
    }
  });
});

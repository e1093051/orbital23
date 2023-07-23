import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { setProfilePicture } from '../../../api/auth.js';
import Form from '../Form'; 

// Mock the functions used in the component
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => ({
    cancelled: false,
    assets: [{ uri: 'test-image-uri' }],
  })),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({}),
}));

// Mock the setProfilePicture function
jest.mock('../../../api/auth.js', () => ({
  setProfilePicture: jest.fn((_, onSuccess) => onSuccess()), // Mock implementation
}));

describe('Form', () => {
  it('allows users to select and set a profile picture', async () => {
    const { getByText, getByTestId } = render(<Form />);

    // Check if the initial text is rendered
    expect(getByText('Add your profile picture')).toBeTruthy();
    expect(getByText('Share a picture that best represents you!')).toBeTruthy();
    expect(getByText('Add profile picture')).toBeTruthy();

    // Simulate the user picking an image with act(...)
    await act(async () => {
      fireEvent.press(getByTestId('image-picker-button'));
    });

    // Check if the profile picture has been updated
    const profilePicture = getByTestId('profile-picture');
    expect(profilePicture.props.source.uri).toBe('test-image-uri');

    // Simulate the user clicking the "Next" button
    fireEvent.press(getByText('Next'));

    // Check if the setProfilePicture function is called
    expect(setProfilePicture).toHaveBeenCalled(); // This should now work with the mocked implementation
  });
});

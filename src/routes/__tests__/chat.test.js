import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Chat from '../Chat'; 

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(), // Mock the initializeApp function
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: 'mockUserId', // mock user ID
    },
  })),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  onSnapshot: jest.fn(),
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ data: () => mockProfileData })),
      })),
    })),
  })),
}));

// Mock Firebase Storage methods
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(), 
}));

// Mock React Navigation functions
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

// Test to check if the component renders without crashing

test('renders Chat component', () => {

  const { getByTestId } = render(<Chat />);

  const chatComponent = getByTestId('chat-component');
  
  expect(chatComponent).toBeDefined();
});

// Testing the onPress event of the TouchableOpacity

test('navigates to ChatPage on TouchableOpacity press', () => {
 
  jest.spyOn(require('@react-navigation/native'), 'useIsFocused').mockReturnValue(true);

  // Mock the Firebase Firestore data

  const mockProfileData = {
    name: 'John Doe',
    chat: {
      friendId1: 'chatId1',
      friendId2: 'chatId2',
    },
  };

  jest.spyOn(require('firebase/firestore'), 'getDoc').mockResolvedValueOnce({

    data: () => mockProfileData,
  });

  // Render the Chat component
  const { getByTestId } = render(<Chat />);
  const chatItem = getByTestId(`chat-item-${mockProfileData.chat.friendId1}`); 

  // Fire onPress event on the TouchableOpacity
  fireEvent.press(chatItem);

  expect(require('@react-navigation/native').useNavigation().navigate).toHaveBeenCalledWith('ChatPage', {
    name: mockProfileData.name,
    id: mockProfileData.chat.friendId1,
    friend: 'friendId1',
    lastMessageTimestamp: mockProfileData.chat.friendId1.value.timestamp,
  });
});

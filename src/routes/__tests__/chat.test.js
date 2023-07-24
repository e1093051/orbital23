import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Chat from '../Chat'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  doc: jest.fn(() => ({
    get: jest.fn(() => ({
      data: jest.fn(() => mockProfileData),
    })),
  })),
  getDoc: jest.fn(async (ref) => {
    const docSnapshot = await ref.get();
    return docSnapshot;
  }),
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

it('renders a list of chat items', async () => {
  // Mock the Firestore data for chat items
  jest.spyOn(require('firebase/firestore'), 'getDoc').mockResolvedValueOnce({
    data: () => mockProfileData,
  });

  const { getAllByTestId } = render(<Chat />);
  const chatItems = getAllByTestId('chat-item-friendId1');

  // Check if the correct number of chat items are rendered
  expect(chatItems.length).toBe(Object.keys(mockProfileData.chat).length);

  // Check if each chat item contains the name of the friend
  chatItems.forEach((chatItem, index) => {
    const friendId = Object.keys(mockProfileData.chat)[index];
    expect(chatItem.getByText(mockProfileData.chat[friendId])).toBeDefined();
  });
});



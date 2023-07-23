import { generateMatchingPool, updateRecommendAndPoint, updateAvoid } from '../matching';

// Mock the fireConfig module
jest.mock('../fireConfig', () => ({
  auth: {
    currentUser: {
      uid: 'test1'
    }
  },
  db: {
    collection: () => ({
      doc: () => ({
        ref: {
          update: jest.fn()
        }
      })
    }),
    getDocs: jest.fn().mockResolvedValue({
      docs: [
        {
          data: () => ({
            avoid: [],
            show: 5, // Mocking show value for filtering
            major: 'Computer Science', // Mocking major value for filtering
            course: ['Math', 'Science'], // Mocking course value for filtering
            countryAndRegion: 'USA', // Mocking countryAndRegion value for filtering
            year: 'Year 1', // Mocking year value for filtering
            hobby: ['Reading', 'Swimming'], // Mocking hobby value for filtering
            recommend: [],
            point: []
          }),
          id: 'someUserID'
        }
      ]
    })
  }
}));

// Mock the firebase/auth functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: () => ({
    then: () => {},
    catch: () => {},
  }),
  createUserWithEmailAndPassword: () => ({
    then: () => ({
      user: { updateProfile: () => {} },
    }),
    catch: () => {},
  }),
  updateProfile: () => {},
  sendEmailVerification: () => ({
    then: () => {},
    catch: () => {},
  }),
  signOut: () => ({
    then: () => {},
    catch: () => {},
  }),
  sendPasswordResetEmail: () => ({
    then: () => {},
    catch: () => {},
  }),
}));

// Mock the firebase/storage functions
jest.mock('firebase/storage', () => ({
  ref: () => ({
    put: () => ({
      on: () => {},
      then: () => ({
        ref: {
          getDownloadURL: () => {}
        }
      }),
    }),
  }),
}));


// Mock the firebase/firestore functions

jest.mock('firebase/firestore', () => ({

  getDoc: jest.fn().mockResolvedValue({
    data: () => ({
      avoid: [],
      show: 5,
      major: 'Computer Science',
      course: ['Math', 'Science'],
      countryAndRegion: 'USA',
      year: 'Year 1',
      hobby: ['Reading', 'Swimming'],
      recommend: [],
      point: []
    })
  }),

  // Add the query and where mock functions
  query: jest.fn(() => ({
    where: jest.fn(() => ({
      get: jest.fn()
    }))
  })),

  addDoc: jest.fn(),
  collection: jest.fn(collection),
  //collection: jest.fn().mockReturnThis(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  query: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getDocs: jest.fn().mockResolvedValue({
    docs: [
      {
        data: () => ({
          avoid: [],
          show: 5,
          major: 'Computer Science',
          course: ['Math', 'Science'],
          countryAndRegion: 'USA',
          year: 'Year 1',
          hobby: ['Reading', 'Swimming'],
          recommend: [],
          point: []
        }),
        id: 'someUserID'
      }
    ]
  }),
  arrayUnion: jest.fn(),
  onSnapshot: jest.fn(),
  arrayRemove: jest.fn(),
}));

const collection = (db, ...args) => {
  return {
    where: jest.fn(),
    getDocs: jest.fn(),
  };
}

describe('Matching API', () => {
  it('should generate a matching pool with filtered users', async () => {
    // Call the function to be tested

    let profileRef;

    const result = await generateMatchingPool();

    // Expectations
    expect(result).toBeTruthy(); // Assuming you return true for a successful match
    expect(updateRecommendAndPoint).toHaveBeenCalled();
    expect(updateAvoid).toHaveBeenCalled();
  });
});

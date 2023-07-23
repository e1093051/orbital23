import { score } from "../matching";
import { collection, setDoc, doc, updateDoc, getDoc, query, where, getDocs, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from './fireConfig'

describe("score function", () => {
  it("should return 0 if no common attributes", async () => {
    const profileData1 = {
      major: "Computer Science",
      countryAndRegion: "USA",
      year: "Freshman",
      course: ["Math", "Physics"],
      hobby: ["Reading", "Sports"],
    };

    const profileData2 = {
      major: "Economics",
      countryAndRegion: "UK",
      year: "Sophomore",
      course: ["Chemistry", "History"],
      hobby: ["Cooking", "Music"],
    };

    const result = await score(profileData1, profileData2);
    expect(result).toBe(0);
  });

  it("should calculate score correctly with some common attributes", async () => {
    const profileData1 = {
      major: "Computer Science",
      countryAndRegion: "USA",
      year: "Freshman",
      course: ["Math", "Physics", "Chemistry"],
      hobby: ["Reading", "Sports", "Music"],
    };

    const profileData2 = {
      major: "Computer Science",
      countryAndRegion: "UK",
      year: "Freshman",
      course: ["Physics", "Chemistry", "Biology"],
      hobby: ["Reading", "Cooking", "Sports"],
    };

    const result = await score(profileData1, profileData2);
    // 1 point for same major, 0.2 for each common course (0.2 * 2 = 0.4), 0.2 for common hobby
    expect(result).toBeCloseTo(1.6); // To handle potential floating-point precision issues
  });

  // Add more test cases to cover different scenarios as needed.
});

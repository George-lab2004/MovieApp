// Import necessary Firebase authentication modules
// GoogleAuthProvider is for Google authentication
// signInWithPopup is a method to trigger the sign-in popup
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Import the initialized auth object from our firebase config file
import { auth } from "./firebase";

// Create a new instance of GoogleAuthProvider to configure Google sign-in
const provider = new GoogleAuthProvider();

// Export an asynchronous function that handles Google sign-in
export const signInWithGoogle = async () => {
  try {
    // Trigger the Google sign-in popup and wait for the result
    // This will open a new window where users can select their Google account
    const result = await signInWithPopup(auth, provider);

    // If successful, return the user object from the result
    // This contains user details like name, email, photo URL, etc.
    return result.user;
  } catch (error) {
    // If there's an error during sign-in, log it to the console
    console.error("Error signing in:", error);

    // Return null to indicate the sign-in failed
    return null;
  }
};

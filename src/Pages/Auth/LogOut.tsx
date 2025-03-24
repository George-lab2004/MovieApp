import { signOut } from "firebase/auth"; // Import logout function
import { auth } from "../../firebase";

// Function to log out the current user
const logout = async () => {
  try {
    await signOut(auth); // Log out the user
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout Error:", error.message); // Handle logout errors
  }
};

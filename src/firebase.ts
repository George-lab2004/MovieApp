import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBWF_oDm53UIt1JBaSKzVS8ep-pVDMQcI",

  authDomain: "movieapp-f7cf7.firebaseapp.com",

  projectId: "movieapp-f7cf7",

  storageBucket: "movieapp-f7cf7.firebasestorage.app",

  messagingSenderId: "450783796938",

  appId: "1:450783796938:web:2ad676104effabc4e29e33",

  measurementId: "G-NXNR81V4F5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

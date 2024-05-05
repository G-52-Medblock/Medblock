import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOdhSgUdy2nBGDzuwBZ9AN0LYf4oUUs4w",
  authDomain: "login2-5fa63.firebaseapp.com",
  projectId: "login2-5fa63",
  storageBucket: "login2-5fa63.appspot.com",
  messagingSenderId: "115556463061",
  appId: "1:115556463061:web:ceab3ebe008d876ea50d5c",
  measurementId: "G-FB9DXG8608"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const firestore = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDtiu42bucUxBE2dV62WfNUQgHmSrrmaY",
  authDomain: "medblock-5b3a8.firebaseapp.com",
  projectId: "medblock-5b3a8",
  storageBucket: "medblock-5b3a8.appspot.com",
  messagingSenderId: "1031606134228",
  appId: "1:1031606134228:web:0f264c6a227f3f5bb76241",
  measurementId: "G-8PR5Z6RREJ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = app.firestore();
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
export const auth = getAuth(app);
export default app;
export { firestore };


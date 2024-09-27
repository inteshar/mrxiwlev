// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0Ya6aEQ2ohrBzfuByr4-OU6AO-sdvqs8",
  authDomain: "inteshar-portf.firebaseapp.com",
  projectId: "inteshar-portf",
  storageBucket: "inteshar-portf.appspot.com",
  messagingSenderId: "788411220496",
  appId: "1:788411220496:web:3f38748aae6f09d8f18095",
  measurementId: "G-8PB01PTQFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };

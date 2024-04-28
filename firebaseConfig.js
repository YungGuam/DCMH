// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIGPa4iEpjUZsQj4pHOHd7F5Vqg7tV_lA",
  authDomain: "dcmh-a9061.firebaseapp.com",
  projectId: "dcmh-a9061",
  storageBucket: "dcmh-a9061.appspot.com",
  messagingSenderId: "159172404563",
  appId: "1:159172404563:web:1ca24b76413e290b026da6",
  measurementId: "G-0RWE83CWXB"
};

const app = initializeApp(firebaseConfig);

export const FIREBASE_APP = app;
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);
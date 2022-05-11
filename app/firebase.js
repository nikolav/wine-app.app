// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//
//
const firebaseConfig = {
  apiKey: "AIzaSyCBBMv6MsjGdRb2CPGNlvAoGm0QOnI8QbM",
  authDomain: "test-wine-online.firebaseapp.com",
  projectId: "test-wine-online",
  storageBucket: "test-wine-online.appspot.com",
  messagingSenderId: "759662677577",
  appId: "1:759662677577:web:4f2043f084753f8923f998",
  measurementId: "G-Q3F7SSETLW",
};

//
// Initialize Firebase
const app = 0 < getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const firebaseAuth = getAuth(app);

export { app, db, firebaseAuth };


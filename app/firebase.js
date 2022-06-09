// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

//
export const firebaseConfig = {
  apiKey: "AIzaSyCBBMv6MsjGdRb2CPGNlvAoGm0QOnI8QbM",
  appId: "1:759662677577:web:4f2043f084753f8923f998",
  authDomain: "test-wine-online.firebaseapp.com",
  databaseURL: "https://test-wine-online-default-rtdb.europe-west1.firebasedatabase.app",
  measurementId: "G-Q3F7SSETLW",
  messagingSenderId: "759662677577",
  projectId: "test-wine-online",
  storageBucket: "test-wine-online.appspot.com",
};

//
// Initialize Firebase
const app = 0 < getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const firebaseAuth = getAuth(app);
const storage = getStorage(app);
const dbRealtime = getDatabase(app);
////
export { app, db, dbRealtime, firebaseAuth, storage };

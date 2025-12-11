// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDv_r8jpQshxjKhOkJPFTQo8mD_z7pjUs",
  authDomain: "vuddy-352c1.firebaseapp.com",
  projectId: "vuddy-352c1",
  storageBucket: "vuddy-352c1.firebasestorage.app",
  messagingSenderId: "724554802138",
  appId: "1:724554802138:web:afab787b928286cc9296e3",
  measurementId: "G-PQ2N3L8S1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exports for auth and database
export const auth = getAuth(app);
export const db = getFirestore(app);

// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDv_r8jpQshxjKhOkJPFTQo8mD_z7pjUs",
  authDomain: "vuddy-352c1.firebaseapp.com",
  projectId: "vuddy-352c1",
  storageBucket: "vuddy-352c1.appspot.com",
  messagingSenderId: "724554802138",
  appId: "1:724554802138:web:afab787b928286cc9296e3",
  measurementId: "G-PQ2N3L8S1X"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

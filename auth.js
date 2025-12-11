import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Signup with username
export const signup = async (username, email, password) => {
  if (!username || !email || !password) return alert("All fields required.");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), { username });
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};

// Login
export const login = async (email, password) => {
  if (!email || !password) return alert("All fields required.");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};

// Protect home page
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("home.html")) {
    window.location.href = "index.html";
  }
});

import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// SIGNUP
export const signup = async (username, email, password) => {
  if (!username || !email || !password) return alert("All fields are required.");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save username in Firestore
    await setDoc(doc(db, "users", user.uid), { username });

    // Redirect after signup
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};

// LOGIN
export const login = async (email, password) => {
  if (!email || !password) return alert("All fields are required.");
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Redirect after login
    window.location.href = "home.html";
  } catch (err) {
    alert(err.message);
  }
};

// PROTECT HOME PAGE
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("home.html")) {
    window.location.href = "index.html";
  }
});

// Attach event listeners to buttons
document.getElementById("signupBtn").addEventListener("click", () => {
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  signup(username, email, password);
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});

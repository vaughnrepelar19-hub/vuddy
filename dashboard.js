// dashboard.js
import { auth, db } from "./firebase.js";
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let currentUser = null;

// UI elements
const feedEl = document.getElementById("feed");
const postBtn = document.getElementById("postBtn");
const newPostTxt = document.getElementById("newPostTxt");
const newSubj = document.getElementById("newSubj");
const userbar = document.getElementById("userbar");

// Subjects
const subjects = ["Math","Science","English","CS"];
newSubj.innerHTML = subjects.map(s=>`<option>${s}</option>`).join('');

// Auth listener
auth.onAuthStateChanged(async (user) => {
  if (!user) window.location.href = "index.html";
  else {
    currentUser = user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.exists() ? userDoc.data().username : user.email;
    userbar.textContent = username + " · Vuddy";
  }
});

// Post button
postBtn.addEventListener("click", async ()=>{
  const txt = newPostTxt.value.trim();
  if(!txt) return;
  await addDoc(collection(db, "posts"), {
    text: txt,
    subject: newSubj.value,
    by: currentUser.uid,
    createdAt: Date.now(),
    likes: 0,
    comments: []
  });
  newPostTxt.value = "";
});

// Real-time feed
const feedQuery = query(collection(db, "posts"), orderBy("createdAt","desc"));
onSnapshot(feedQuery, snapshot=>{
  feedEl.innerHTML = "";
  snapshot.forEach(docSnap=>{
    const post = docSnap.data();
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<strong>${post.subject}</strong> · ${post.text} <div style="font-size:12px;color:gray">by ${post.by}</div>`;
    feedEl.appendChild(div);
  });
});

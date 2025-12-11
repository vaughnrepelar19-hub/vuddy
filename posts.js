import { db, auth } from "./firebase.js";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const postsRef = collection(db, "posts");

// Bad words list
const badWords = ["badword1", "badword2", "badword3"];

// Add post
export const addPost = async (text) => {
  if (!text) return;

  const lowerText = text.toLowerCase();
  for (let word of badWords) {
    if (lowerText.includes(word)) return alert("Your post contains inappropriate words.");
  }

  try {
    await addDoc(postsRef, {
      text,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });
    document.getElementById("postInput").value = "";
  } catch (err) {
    alert(err.message);
  }
};

// Display posts with usernames
const q = query(postsRef, orderBy("createdAt", "desc"));
onSnapshot(q, async (snapshot) => {
  const feed = document.getElementById("feed");
  if (!feed) return;
  feed.innerHTML = "";

  for (let docSnap of snapshot.docs) {
    const postData = docSnap.data();
    const userDoc = await getDoc(doc(db, "users", postData.userId));
    const username = userDoc.exists() ? userDoc.data().username : "Unknown";
    const post = document.createElement("div");
    post.innerHTML = `<strong>${username}:</strong> ${postData.text}`;
    feed.appendChild(post);
  }
});

// Dark/Light mode
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  };

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

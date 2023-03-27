import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIa1qNK34tMGiwKoromf-HDb9PwIHNX9Q",
  authDomain: "d-streets-example-eab69.firebaseapp.com",
  projectId: "d-streets-example-eab69",
  storageBucket: "d-streets-example-eab69.appspot.com",
  messagingSenderId: "647232472373",
  appId: "1:647232472373:web:dd9649808f8dd683feb87c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA1A6Ms9_nRsCIaxEFbmpnXMWtiVYwQOzo",
  authDomain: "threedstreets.firebaseapp.com",
  projectId: "threedstreets",
  storageBucket: "threedstreets.appspot.com",
  messagingSenderId: "371199528858",
  appId: "1:371199528858:web:9492578f267e12cabe3423",
  measurementId: "G-10ZP8K1D7R",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };
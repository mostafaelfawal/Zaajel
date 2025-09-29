// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB86JuF4a2Nc5fmZvP9HFUEiiewz0i9ucM",
  authDomain: "zaajel-251a7.firebaseapp.com",
  projectId: "zaajel-251a7",
  storageBucket: "zaajel-251a7.firebasestorage.app",
  messagingSenderId: "772661753555",
  appId: "1:772661753555:web:d824c275e925db02ec4626",
  measurementId: "G-Q31JNMSZLX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);
export const messaging = getMessaging(app);
export default app;

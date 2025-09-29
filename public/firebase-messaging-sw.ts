// public/firebase-messaging-sw.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

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
getMessaging(app);

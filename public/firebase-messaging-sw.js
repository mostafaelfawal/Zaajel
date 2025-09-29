// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyB86JuF4a2Nc5fmZvP9HFUEiiewz0i9ucM",
  authDomain: "zaajel-251a7.firebaseapp.com",
  projectId: "zaajel-251a7",
  storageBucket: "zaajel-251a7.firebasestorage.app",
  messagingSenderId: "772661753555",
  appId: "1:772661753555:web:d824c275e925db02ec4626",
  measurementId: "G-Q31JNMSZLX",
});

const messaging = firebase.messaging();

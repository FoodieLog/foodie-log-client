/// <reference lib="webworker" />

importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGlspikiopftz1vKTey5ylmEftUMdsll4",
  authDomain: "foodi-log-front.firebaseapp.com",
  projectId: "foodi-log-front",
  storageBucket: "foodi-log-front.appspot.com",
  messagingSenderId: "583295345602",
  appId: "1:583295345602:web:47e961fea7da20e5342c5b",
  measurementId: "G-2RL84K5FTR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
      body: payload.notification.body,
      icon: '/images/userImage.png' // TODO: Change to your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


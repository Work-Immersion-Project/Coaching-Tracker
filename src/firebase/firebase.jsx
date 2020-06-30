import firebase from "firebase/app";
import auth from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCwBrZzbSRO7cuGyEuB80IKENrQqRrhoTc",
  authDomain: "coaching-tracker.firebaseapp.com",
  databaseURL: "https://coaching-tracker.firebaseio.com",
  projectId: "coaching-tracker",
  storageBucket: "coaching-tracker.appspot.com",
  messagingSenderId: "347125005886",
  appId: "1:347125005886:web:a3b13a1c0a7e10db9d5b6f",
  measurementId: "G-MJT46QR94X",
});

export default app;

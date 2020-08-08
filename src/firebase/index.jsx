import firebase from "firebase";

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

export const db = app.firestore();
export const userCollection = db.collection("users");
export const studentCollection = db.collection("students");
export const teacherCollection = db.collection("teachers");
export const subjectCollection = db.collection("subjects");
export const adminCollection = db.collection("admins");
export const coachingSessionCollection = db.collection("coachingSessions");
export const collections = {
  student: studentCollection,
  teacher: teacherCollection,
  admin: adminCollection,
  user: userCollection,
};

export default app;

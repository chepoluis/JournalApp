// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1ksdhWyN4FybiQCmys_bXRJM4NE-Kypk",
  authDomain: "journal-app-5168a.firebaseapp.com",
  projectId: "journal-app-5168a",
  storageBucket: "journal-app-5168a.appspot.com",
  messagingSenderId: "1033674539424",
  appId: "1:1033674539424:web:20998a60f21fc230a624c5"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );

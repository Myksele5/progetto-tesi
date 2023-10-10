// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZgPsh4COsEHA3zLBzhI9MDiFbna4Hc0Q",
  authDomain: "progetto-tesi-8abcf.firebaseapp.com",
  projectId: "progetto-tesi-8abcf",
  storageBucket: "progetto-tesi-8abcf.appspot.com",
  messagingSenderId: "1098380999568",
  appId: "1:1098380999568:web:9b55790fcacc26aa71d115",
  measurementId: "G-FM9016C4VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
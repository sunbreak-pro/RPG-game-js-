// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgeIZwuyIF3cvaE5gkSRK8GW8wYZgB7TM",
  authDomain: "first-rpg-ae688.firebaseapp.com",
  projectId: "first-rpg-ae688",
  storageBucket: "first-rpg-ae688.firebasestorage.app",
  messagingSenderId: "357652321948",
  appId: "1:357652321948:web:6a4d46e195336bc3ab3f59",
  measurementId: "G-6X215LJ64N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
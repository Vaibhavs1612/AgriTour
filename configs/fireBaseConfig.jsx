


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz8AYesQocSykEeji50S0y8a5I8KZnuT4",
  authDomain: "agritour-833c6.firebaseapp.com",
  projectId: "agritour-833c6",
  storageBucket: "agritour-833c6.appspot.com",
  messagingSenderId: "983162759957",
  appId: "1:983162759957:web:eef285f4d467188d19971c",
  measurementId: "G-BWDV2KKMXN"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

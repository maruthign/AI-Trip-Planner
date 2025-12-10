// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ek8jvRZoN28EY4IGO9FSU-2IQ8hUgYo",
  authDomain: "trip-storage.firebaseapp.com",
  projectId: "trip-storage",
  storageBucket: "trip-storage.firebasestorage.app",
  messagingSenderId: "767448086642",
  appId: "1:767448086642:web:965a00620083b23ce26aeb",
  measurementId: "G-67ZX28T7XP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
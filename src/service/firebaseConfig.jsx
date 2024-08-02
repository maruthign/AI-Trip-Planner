// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDveUH8Hl11REyq-z0gHEmMnSCSNYNdCBI",
  authDomain: "ai-travel-planning.firebaseapp.com",
  projectId: "ai-travel-planning",
  storageBucket: "ai-travel-planning.appspot.com",
  messagingSenderId: "749216670911",
  appId: "1:749216670911:web:6fe5fccd94c4e95e2cd20a",
  measurementId: "G-EQRKX93D4D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);
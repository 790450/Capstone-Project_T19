// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "news-hunt45.firebaseapp.com",
  projectId: "news-hunt45",
  storageBucket: "news-hunt45.firebasestorage.app",
  messagingSenderId: "884274379262",
  appId: "1:884274379262:web:63af2e6b5b0f51707a28af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfmFP35sah2f0XbEaz8_3kOv-5A-b5cYs",
  authDomain: "kawaki-chat-app-db.firebaseapp.com",
  projectId: "kawaki-chat-app-db",
  storageBucket: "kawaki-chat-app-db.appspot.com",
  messagingSenderId: "162108567469",
  appId: "1:162108567469:web:b192bef86b0bbd2b18fb24",
  measurementId: "G-3GCHGKQ3Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}
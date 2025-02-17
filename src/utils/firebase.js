// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfdYXluNZT60E8ab9uJotkhFM4Glx8JGc",
  authDomain: "disert-project.firebaseapp.com",
  projectId: "disert-project",
  storageBucket: "disert-project.firebasestorage.app",
  messagingSenderId: "451442137968",
  appId: "1:451442137968:web:7b448817a60e3603d70db5",
  measurementId: "G-YZ8XEE7N4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);

export { auth }


// # password: EYTCNMcX7Z43WRAm6fBJ
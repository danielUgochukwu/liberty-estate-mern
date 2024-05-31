// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-app-821ff.firebaseapp.com",
  projectId: "mern-estate-app-821ff",
  storageBucket: "mern-estate-app-821ff.appspot.com",
  messagingSenderId: "708141874664",
  appId: "1:708141874664:web:3f3bbec0ff0571ad5bf85d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

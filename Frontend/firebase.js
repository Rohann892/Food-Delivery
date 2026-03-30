// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "food-delivery-app-fdb16.firebaseapp.com",
    projectId: "food-delivery-app-fdb16",
    storageBucket: "food-delivery-app-fdb16.firebasestorage.app",
    messagingSenderId: "935242241579",
    appId: "1:935242241579:web:97bbb716c683317027bc6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }
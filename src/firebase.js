// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhEXjIn4_jvhS_wXd0zvZmJZN8MB3Ewso",
    authDomain: "flychombi.firebaseapp.com",
    databaseURL: "https://flychombi-default-rtdb.firebaseio.com",
    projectId: "flychombi",
    storageBucket: "flychombi.appspot.com",
    messagingSenderId: "838446245380",
    appId: "1:838446245380:web:3e0166d03a71675b78b751"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { app, auth, database, db };
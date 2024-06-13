// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBhEXjIn4_jvhS_wXd0zvZmJZN8MB3Ewso",
    authDomain: "flychombi.firebaseapp.com",
    databaseURL: "https://flychombi-default-rtdb.firebaseio.com",
    projectId: "flychombi",
    storageBucket: "flychombi.appspot.com",
    messagingSenderId: "838446245380",
    appId: "1:838446245380:web:3e0166d03a71675b78b751"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

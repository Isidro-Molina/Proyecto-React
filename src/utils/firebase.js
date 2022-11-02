// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDPmL0ASZqO8vHBGrnYMsZLSQ-nHIeo9c4",

    authDomain: "coder-react-38120-b838b.firebaseapp.com",

    projectId: "coder-react-38120-b838b",

    storageBucket: "coder-react-38120-b838b.appspot.com",

    messagingSenderId: "45847690226",

    appId: "1:45847690226:web:4c6433847272dfc010896b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// crear una instancia de la base de datos
export const db = getFirestore(app);

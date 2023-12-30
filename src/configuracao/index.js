// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjoRLG1XEuByFW3dOpx7I87R-hoR7Z9Uk",
  authDomain: "byconnect-f1b47.firebaseapp.com",
  projectId: "byconnect-f1b47",
  storageBucket: "byconnect-f1b47.appspot.com",
  messagingSenderId: "428210304827",
  appId: "1:428210304827:web:9ad277b5a467033e18291e",
  measurementId: "G-G29RTLFR2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth()
const db = getFirestore();


export{app, analytics, auth, db};
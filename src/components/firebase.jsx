// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCLD4ANTBehdbRKO0N9Umsfn_m2AFL3yec",
  authDomain: "flowfi-3368c.firebaseapp.com",
  projectId: "flowfi-3368c",
  storageBucket: "flowfi-3368c.firebasestorage.app",
  messagingSenderId: "945153575207",
  appId: "1:945153575207:web:39f97d893cb62ebbc9c102",
  measurementId: "G-8WYZKZ3QE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export{db,auth,provider,doc,setDoc};
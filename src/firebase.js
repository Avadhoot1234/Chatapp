// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVQE4-upqq3WEpPPR6u_vac8nFe5J6Rfg",
  authDomain: "chatapp-71b35.firebaseapp.com",
  projectId: "chatapp-71b35",
  storageBucket: "chatapp-71b35.firebasestorage.app",
  messagingSenderId: "157174245122",
  appId: "1:157174245122:web:39c6700ea316b81fcf441b",
  measurementId: "G-JDTMFLWKG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app)
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);
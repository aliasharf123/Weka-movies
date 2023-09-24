// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore  ,collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjc3x5GfobRO65F0H2d2HdMrgmPCAS9Oc",
  authDomain: "weka-movie.firebaseapp.com",
  projectId: "weka-movie",
  storageBucket: "weka-movie.appspot.com",
  messagingSenderId: "336753073928",
  appId: "1:336753073928:web:e0b87370f9c7450608d6bd",
  measurementId: "G-W25T21EQS9"
};

export const app = initializeApp(firebaseConfig)

export const auth =getAuth(app);
export const db = getFirestore(app);

export const users = collection(db , 'Users');


// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjc3x5GfobRO65F0H2d2HdMrgmPCAS9Oc",
  authDomain: "weka-movie.firebaseapp.com",
  projectId: "weka-movie",
  storageBucket: "weka-movie.appspot.com",
  messagingSenderId: "336753073928",
  appId: "1:336753073928:web:e0b87370f9c7450608d6bd",
  measurementId: "G-W25T21EQS9"
};

const app = firebase.initializeApp(firebaseConfig)


export const auth = app.auth();
// export const firestore = firebase.firestore();
export default firebase ;
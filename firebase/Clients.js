// Import the functions you need from the SDKs you need
import {  deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
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

const app = initializeApp(firebaseConfig)

export const auth =getAuth(app);
export const db = getFirestore(app);

export const users = collection(db , 'Users');
var dsa = 'sad'

var dsa ;
console.log(dsa)


export const FindMovie = async (movies , user) =>{
  const movie = []
  const q = query(users, where("uid", "==", user.uid) , where('movie.id' , '==' , movies.id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    movie.push(doc.data())
  });
  return movie.length ;
}

export const GetMovies = async (user) =>{
  const movie = []
  const q = query(users, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    movie.push(doc.data())
  });
  return movie;
}

export const DeleteMovie = async (movie , user)=>{
  let id ;
  const q = query(users, where("movie.id", "==", movie.id) , where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    id = doc.id
  });
  await deleteDoc(doc(db, "Users", id));

}

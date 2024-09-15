import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTIEd8KmMK5P0Lv4se68UsGvYtIYwMZeU",
  authDomain: "cars-react-393b5.firebaseapp.com",
  projectId: "cars-react-393b5",
  storageBucket: "cars-react-393b5.appspot.com",
  messagingSenderId: "356727389786",
  appId: "1:356727389786:web:9f5eaedf356f075fdbe263"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
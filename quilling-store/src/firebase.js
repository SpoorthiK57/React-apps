import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgX5X5TrC4CDQmh52Nn7eHWjEBqtJjvJ0",
  authDomain: "quilling-store.firebaseapp.com",
  projectId: "quilling-store",
  storageBucket: "quilling-store.appspot.com",
  messagingSenderId: "139815459975",
  appId: "1:139815459975:web:649c7fcd61b36ead55ec22"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth,db};
export default app;
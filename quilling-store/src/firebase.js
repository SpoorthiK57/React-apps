import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBgX5X5TrC4CDQmh52Nn7eHWjEBqtJjvJ0",
  authDomain: "quilling-store.firebaseapp.com",
  projectId: "quilling-store",
  storageBucket: "quilling-store.firebasestorage.app",
  messagingSenderId: "139815459975",
  appId: "1:139815459975:web:649c7fcd61b36ead55ec22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1hz_qEnPnktj74zoURrPwjVo3TPCOeu4",
  authDomain: "prac-database.firebaseapp.com",
  databaseURL: "https://prac-database-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prac-database",
  storageBucket: "prac-database.firebasestorage.app",
  messagingSenderId: "743528052449",
  appId: "1:743528052449:web:9b241b31e40551b9e269a0",
  measurementId: "G-JGQPBHGTSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("firebase success");
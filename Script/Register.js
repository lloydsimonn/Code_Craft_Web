  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";




  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD1hz_qEnPnktj74zoURrPwjVo3TPCOeu4",
    authDomain: "prac-database.firebaseapp.com",
    projectId: "prac-database",
    databaseURL: "https://prac-database-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "prac-database.firebasestorage.app",
    messagingSenderId: "743528052449",
    appId: "1:743528052449:web:9b241b31e40551b9e269a0",
    measurementId: "G-JGQPBHGTSL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase();
  console.log("Firebase Initialized");
  console.log(db);

  const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const mname = document.getElementById("mname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const uname = document.getElementById("uname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const snum = document.getElementById("snum").value.trim();
  
  try {
    // Create account in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save all data in your Realtime Database structure
    await    set(ref(db, "user/" + user.uid), {
               // include UID inside
      fname: fname,
      mname: mname,
      lname: lname,
      uname: uname,
      snum: snum,
      role: "Teacher",
      status: "N/A",
      player_stats: {
        progress: "0%"
      }
    });

    alert("Registration successful!");
    form.reset();

  } catch (error) {
    alert("Error: " + error.message);
    console.error(error);
  }
});
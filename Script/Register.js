  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
  import {
    getAuth,
    fetchSignInMethodsForEmail,
    createUserWithEmailAndPassword ,
    signOut
    
  } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
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
  const email_val = document.getElementById("email_val");
  const formMessage = document.getElementById("formMessage");
  const registerBtn = document.getElementById("registerForm"); // your button

  email_val.style.display = "none";

  // toggle password eye
  const passwordInput = document.getElementById('password');
  const togglePasswordIcon = document.getElementById('togglePassword');
 
  togglePasswordIcon.addEventListener('click', function () {
     
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

      
      const icon = togglePasswordIcon.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });

  const confirmPasswordInput = document.getElementById('confirmPassword'); // Make sure the ID matches your HTML
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

  toggleConfirmPassword.addEventListener('click', function () {

    const isPassword = confirmPasswordInput.getAttribute('type') === 'password';
    confirmPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');

    const icon = toggleConfirmPassword.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    }
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formMessage.style.textContent = ""; // clear previous messages

  const fname = document.getElementById("fname").value.trim();
  const mname = document.getElementById("mname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const uname = document.getElementById("uname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const snum = document.getElementById("snum").value.trim();
  const department = document.getElementById("department").value.trim();
  const strongPasswordLabel = document.getElementById("strongPassword");
  const confirmPasswordLabel = document.getElementById("confirmPasswordLabel");

  // --- Password validation ---
  const lengthValid = password.length >= 8 && password.length <= 12;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const missing = [];
  if (!lengthValid) missing.push("8–12 chars");
  if (!hasUpper) missing.push("uppercase");
  if (!hasLower) missing.push("lowercase");
  if (!hasNumber) missing.push("number");
  if (!hasSymbol) missing.push("symbol");

  if (missing.length > 0) {
    strongPasswordLabel.textContent = "Missing: " + missing.join(", ");
    strongPasswordLabel.style.color = "red";
    return; // stop submission if password weak
  } else {
    strongPasswordLabel.textContent = "Strong password ✅";
    strongPasswordLabel.style.color = "green";
  }

  if (confirmPassword !== password) {
    confirmPasswordLabel.textContent = "Passwords do not match ❌";
    confirmPasswordLabel.style.color = "red";
    return; // stop submission if confirm password does not match
  } else {
    confirmPasswordLabel.textContent = "Passwords match ✅";
    confirmPasswordLabel.style.color = "green";
  }
  // --- End of password validation ---

  // --- Start actual submission ---
  registerBtn.disabled = true; // disable now since submission starts

  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      formMessage.style.color = "red";
      formMessage.textContent = "❌ Email is already in use.";
      registerBtn.disabled = false;
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await set(ref(db, "user/" + user.uid), {
      fname: fname,
      email: email,
      mname: mname,
      lname: lname,
      uname: uname,
      snum: snum,
      role: "Teacher",
      status: "N/A",
      player_stats: { progress: "0%" },
      account_status: "disabled",
      department: department
    });

    formMessage.style.color = "lightgreen";
    formMessage.textContent = "✅ Registration successful!";
    form.reset();
    await signOut(auth);
    localStorage.setItem("validation", "Account created! Please wait for admin approval.");
    window.location.href = "login.html";

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      formMessage.style.color = "red";
      formMessage.textContent = "❌ Email is already in use.";
    } else {
      console.error(error);
    }
    registerBtn.disabled = false;
  }
});

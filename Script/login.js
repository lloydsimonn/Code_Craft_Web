  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD1hz_qEnPnktj74zoURrPwjVo3TPCOeu4",
    authDomain: "prac-database.firebaseapp.com",
    projectId: "prac-database",
    storageBucket: "prac-database.firebasestorage.app",
    messagingSenderId: "743528052449",
    appId: "1:743528052449:web:9b241b31e40551b9e269a0",
    measurementId: "G-JGQPBHGTSL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  console.log("Firebase Initialized");


  
  // Password visibility toggle
    const showPassword = document.getElementById("showPassword");
    const passwordInput = document.getElementById("password");

    showPassword.addEventListener("change", () => {
      passwordInput.type = showPassword.checked ? "text" : "password";
    });

//  remember me functionality
    const emailInput = document.getElementById("email");
    const rememberMe = document.getElementById("remember");
    
    const form = document.querySelector("form");


window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
    window.location.href = "../index.html"; 
  }

});

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (rememberMe.checked) {
    // Save email
    localStorage.setItem("rememberedEmail", emailInput.value);
   
  } else {
    // Clear saved email
    localStorage.removeItem("rememberedEmail");
  }


  // signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value) ...  

        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
        // Signed in 
                const user = userCredential.user;
                window.alert("Login successful!");  
                window.location.href = "../index.html";
        // ...
        })
        .catch((error) => {
          window.alert("Login Failed!");  
            const errorCode = error.code;
            const errorMessage = error.message;
            
            alert("Login failed: " + errorMessage);
            
        });
   

});








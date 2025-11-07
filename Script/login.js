  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
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
  cant_go_back(auth);
  
  const showPassword = document.getElementById("showPassword");
  
    showPassword.addEventListener("change", () => {
      passwordInput.type = showPassword.checked ? "text" : "password";
    });
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("remember");
    const form = document.querySelector("form");


window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("rememberedUser");

  if (savedData) {
    const { email, password } = JSON.parse(savedData);
    emailInput.value = email;
    passwordInput.value = password;
    rememberMe.checked = true;
  }
});

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value;

  if (rememberMe.checked) {
    localStorage.setItem("rememberedEmail", emailInput.value);
   
  } else {
    localStorage.removeItem("rememberedEmail");
  }


  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          window.alert("Login successful!");
          handleLogin();
          window.location.href = "../index.html";
  })
  .catch((error) => {
    window.alert("Login Failed!");  
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Login failed: " + errorMessage);
  });
});

function handleLogin() {
  if (rememberMe.checked) {
    // Save email + password as JSON string in localStorage
    const userData = {
      email: emailInput.value,
      password: passwordInput.value
    };
    localStorage.setItem("rememberedUser", JSON.stringify(userData));
      window.alert("success json" + userData);
  } else {
    // Remove saved data if "Remember Me" is unchecked
    localStorage.removeItem("rememberedUser");
    window.alert("no interaction");
  }

 
}

  function cant_go_back(auth){
        onAuthStateChanged(auth, (user) => {
        if (user) {
          window.location.href = "../index.html";
        }
        else{
           window.location.href = "#";
        }
      });
  }






  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getDatabase, onValue, ref, get} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
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
  
  cant_go_back(auth, db);
  // form validation
  const validation = localStorage.getItem("validation");
  const formMessage = document.getElementById("formMessage");
  if (validation) {
    formMessage.textContent = validation;
    formMessage.style.setProperty("color", "green", "important");   
    formMessage.style.fontSize = "1.25rem";
    formMessage.style.fontWeight = "600";
    
    localStorage.removeItem("validation"); 
  }
  // toggle eye password

  const showPassword = document.getElementById("showPassword");
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');

    togglePasswordIcon.addEventListener('click', function () {
   
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

   
      const icon = togglePasswordIcon.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
    const emailInput = document.getElementById("email");

    const rememberMe = document.getElementById("remember");
    const form = document.querySelector("form");

 // saved data
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
        handleLogin();
          
  })
  .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;

    formMessage.textContent = "Invalid Credentials";
    formMessage.style.setProperty("color", "red", "important");
    formMessage.style.fontSize = "1.25rem";
    formMessage.style.fontWeight = "600";   
    formMessage.style.display = "block";   


  });
});

function handleLogin() {
  if (rememberMe.checked) {

    const userData = {
      email: emailInput.value,
      password: passwordInput.value
    };
    localStorage.setItem("rememberedUser", JSON.stringify(userData));

  } else {
 
    localStorage.removeItem("rememberedUser");

  }

 
}

function cant_go_back(auth, db) {
  onAuthStateChanged(auth, async (user) => {
    // ✅ Hide the body while checking user status
    document.body.style.display = "none";

    if (user) {
      try {
        const snapshot = await get(ref(db, "user"));

        if (snapshot.exists()) {
          const users = snapshot.val();
          let userData = null;

          // 🔍 Find current user
          for (const key in users) {
            if (users[key].email === user.email) {
              userData = users[key];
              break;
            }
          }

          if (userData) {
            // ✅ Check if account is enabled
            if (userData.account_status === "enabled") {
              // Redirect based on role
              if (userData.role === "Teacher") {
                window.location.replace("../index.html");
              } else if (userData.role === "admin") {
                window.location.replace("admin.html");
              } else {
                // if other roles exist, you can handle them here
                window.location.replace("../index.html");
              }
              return; // stop here, don’t show login
            } else {
              // Account exists but not approved
              await signOut(auth);
              document.body.style.display = "block";
              formMessage.textContent = "Your account is not approved yet";
              formMessage.style.setProperty("color", "red", "important");
              formMessage.style.fontSize = "1.25rem";
              formMessage.style.fontWeight = "600";
            }
          } else {
            // No matching user found
            await signOut(auth);
            document.body.style.display = "block";
            formMessage.textContent = "Invalid credentials.";
            formMessage.style.setProperty("color", "red", "important");
            formMessage.style.fontSize = "1.25rem";
            formMessage.style.fontWeight = "600";
          }
        } else {
          // No users in DB
          document.body.style.display = "block";
        }
      } catch (err) {
        console.error("Error checking user:", err);
        document.body.style.display = "block";
      }
    } else {
      // ✅ No user logged in → show the login page
      document.body.style.display = "block";
    }
  });
}



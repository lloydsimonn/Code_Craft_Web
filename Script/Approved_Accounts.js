  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, get, onValue, update} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  
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
    const db = getDatabase();
    const nameRef = ref(db, "user");
    const auth = getAuth();
  
    console.log("Firebase Initialized");
    console.log(db);


  onAuthStateChanged(auth, async (user) => {
  if (!user) {
    
    window.location.href = "../login.html";
    return;
  }

  try {
    const snapshot = await get(ref(db, "user"));
    if (!snapshot.exists()) {
      await signOut(auth);
      window.location.href = "../Html/login.html";
      return;
    }

    const users = snapshot.val();
    let matchedUser = null;

    // Find the user in DB
    for (const key in users) {
      if (users.hasOwnProperty(key) && users[key].email === user.email) {
        matchedUser = users[key];
        break;
      }
    }

    if (!matchedUser) {
      await signOut(auth);
      window.location.href = "../Html/login.html";
      return;
    }

    // Only allow admins with enabled accounts
    if (matchedUser.role !== "admin" || matchedUser.account_status !== "enabled") {
      await signOut(auth);
      window.location.href = "../Html/login.html";
      alert("You do not have permission to access this page");
      return;
    }

    // ✅ If we reach here, user is an approved admin
    console.log("Admin verified, page loaded");

  } catch (err) {
    console.error("Error verifying admin:", err);
    await signOut(auth);
   window.location.href = "../Html/login.html";
  }
});
  const Acc_validation = document.getElementById("Acc_validation");

  onValue(nameRef, (snapshot) => {
  if (snapshot.exists()) {
    const data_onval = snapshot.val();
    const tbody = document.querySelector("tbody");
    const Acc_validation = document.getElementById("Acc_validation");


    tbody.innerHTML = "";

    let foundTeacher = false;

    const keys = Object.keys(data_onval);
    let processed = 0;

    keys.forEach((key) => {
      const uid_ref = ref(db, "user/" + key);

      onValue(uid_ref, (snapshot) => {
        processed++;
        if (snapshot.exists()) {
          const UID_data = snapshot.val();

          if (UID_data.role === "Teacher" && UID_data.account_status !== "disabled") {
            const name = `${UID_data.lname} ${UID_data.fname} ${UID_data.mname}`;
            const teacherNumber = UID_data.snum;
            const role = UID_data.role;
            const email = UID_data.email;

            const row = `
              <tr class="text-center">
                <td>${email}</td>
                <td>${name}</td>
                <td>${teacherNumber}</td>
                <td>${role}</td>
              </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", row);
            foundTeacher = true;
          }
        }

        if (processed === keys.length) {
          if (foundTeacher) {
            Acc_validation.style.display = "none";
          } else {
            Acc_validation.style.display = "block";
          }
        }
      }, { onlyOnce: true });
    });
  }
});

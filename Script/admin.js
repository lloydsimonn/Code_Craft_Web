  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, get, onValue, update,remove} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
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
  // Example usage:
  const email = "harley@gmail.com";

  onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in, redirect to login page
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
 
const formMessage = document.getElementById("formMessage");
  
const tbody = document.querySelector("tbody");
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const teacherEmailSpan = document.getElementById("teacherEmail");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const Acc_validation = document.getElementById("Acc_validation");

let selectedUidRef = null;
let selectedRow = null;


onValue(nameRef, (snapshot) => {
  tbody.innerHTML = ""; // Clear previous rows

  if (!snapshot.exists()) {
    Acc_validation.style.display = "block";
    return;
  }

  const data_onval = snapshot.val();
  let hasRows = false;

  for (const key in data_onval) {
    if (!data_onval.hasOwnProperty(key)) continue;

    const uid_ref = ref(db, "user/" + key);

    onValue(uid_ref, (snapshot) => {
      if (!snapshot.exists()) return;

      const UID_data = snapshot.val();
      if (UID_data.role === "Teacher" && UID_data.account_status === "disabled") {
        hasRows = true;

        const name = UID_data.lname +" "+UID_data.fname +" "+UID_data.mname;
        const teacherNumber = UID_data.snum;
        const email = UID_data.email;
        const department = UID_data.department;

        const row = document.createElement("tr");
        row.classList.add("text-center");
        row.innerHTML = `
          <td>${email}</td>
          <td>${name}</td>
          <td>${teacherNumber}</td>
          <td>${department}</td>
          <td>
            <button class="approve-btn btn btn-success btn-sm px-3 rounded-pill">
              <i class="fas fa-check"></i> Approve
            </button>
          </td>
          <td>
            <button class="delete-btn btn btn-danger btn-sm px-4 rounded-pill" 
                    data-email="${email}" data-uid="${key}">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        `;
        tbody.appendChild(row);

        // Approve button
        row.querySelector(".approve-btn").addEventListener("click", async () => {
          try {
            await update(uid_ref, { account_status: "enabled" });
            Approve(formMessage); // Restore your call
          } catch (err) {
            console.error("Error updating status:", err);
          }
        });
      }
    }, { onlyOnce: true });
  }

  setTimeout(() => {
    Acc_validation.style.display = hasRows ? "none" : "block";
  }, 100);
});

// Delete button event delegation
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");
  if (!btn) return;

  selectedUidRef = ref(db, "user/" + btn.getAttribute("data-uid"));
  selectedRow = btn.closest("tr");
  teacherEmailSpan.textContent = btn.getAttribute("data-email");

  deleteModal.show();
});

// Confirm delete button
confirmDeleteBtn.addEventListener("click", async () => {
  if (!selectedUidRef) return;

  try {
    await remove(selectedUidRef);
    if (selectedRow) selectedRow.remove();
    delete_approval(formMessage); 
  } catch (err) {
    console.error("Error deleting user:", err);
  } finally {
    deleteModal.hide();
    selectedUidRef = null;
    selectedRow = null;

    if (tbody.children.length === 0) {
      Acc_validation.style.display = "block";
    }
  }
});


// Delete button delegation
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".delete-btn");
  if (!btn) return;

  selectedUidRef = ref(db, "user/" + btn.getAttribute("data-uid"));
  selectedRow = btn.closest("tr");
  teacherEmailSpan.textContent = btn.getAttribute("data-email");

  deleteModal.show();
});

// Confirm delete button
confirmDeleteBtn.addEventListener("click", async () => {
  if (!selectedUidRef) return;

  try {
    await remove(selectedUidRef);
    if (selectedRow) selectedRow.remove();
  } catch (err) {
    console.error("Error deleting user:", err);
  } finally {
    deleteModal.hide();
    selectedUidRef = null;
    selectedRow = null;

    // Update validation after deletion
    if (tbody.children.length === 0) {
      Acc_validation.style.display = "block";
    }
  }
});


  function Approve(formMessage){
    formMessage.textContent = "Account Approved";
    formMessage.style.setProperty("color", "green", "important");
    formMessage.style.fontSize = "1.25rem";
    formMessage.style.fontWeight = "600";   
    formMessage.style.display = "block";   
  }
  function delete_approval(formMessage){
    formMessage.textContent = "Account Deleted";
    formMessage.style.setProperty("color", "red", "important");
    formMessage.style.fontSize = "1.25rem";
    formMessage.style.fontWeight = "600";   
    formMessage.style.display = "block";   
  }


  

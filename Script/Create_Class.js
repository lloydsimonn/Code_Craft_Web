    import { getDatabase, ref,set,  onValue} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
    import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
    
    const db = getDatabase();
    const auth = getAuth();
    
    const classRef = ref(db, "Classrooms");

    console.log(auth);
    console.log(db);

    const classNameInput = document.getElementById("className");
    const schoolYearInput = document.getElementById("schoolYear");

    classNameInput.addEventListener("input", () => {
      classNameInput.value = classNameInput.value.replace(/[^A-Za-z0-9 ]/g, '');
    });


    schoolYearInput.addEventListener("input", () => {
      schoolYearInput.value = schoolYearInput.value.replace(/[^0-9-]/g, '');
    });
        

  onAuthStateChanged(auth, (user) => {
  if (user) {
    const User_UID = user.uid;

    const createClassForm = document.getElementById("createClassForm");
    const createClassModalEl = document.getElementById("createClassModal");

    createClassForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const className = document.getElementById("className").value.trim();
      const schoolYear = document.getElementById("schoolYear").value.trim();
      if (!className || !schoolYear) return;

      const classNameRef = ref(db, `Classrooms/${User_UID}/${className}`);

      onValue(classNameRef, async (snapshot) => {
        if (snapshot.exists()) {
          console.log("classname exist:", snapshot.val());
          return;
        } else {
          generateUniqueClassCode(db, async (classCode) => {
            try {
              await set(ref(db, `Classrooms/${User_UID}/${className}`), {
                Class_Code: classCode,
                School_Year: schoolYear,
              });
              console.log("Class saved to database:", classCode);
              hide_modal(createClassModalEl);
              createClassForm.reset();
            } catch (err) {
              console.error("Error saving class:", err);
            }
          });
        }
      }, { onlyOnce: true });
    });
  } else {
    console.log("No user is signed in");
  }
});
      
function hide_modal(createClassModalEl){
    // Hide the modal manually
  createClassModalEl.classList.remove("show");
  createClassModalEl.style.display = "none";
  createClassModalEl.setAttribute("aria-hidden", "true");
  createClassModalEl.removeAttribute("aria-modal");
  createClassModalEl.removeAttribute("role");

  // Remove backdrop if it exists
  const modalBackdrop = document.querySelector(".modal-backdrop");
  if (modalBackdrop) modalBackdrop.remove();
}



generateUniqueClassCode(db, (Class_Code) => {
  
});


function generateUniqueClassCode(db, callback) {
  let Class_Code = generateClassCode();
 

  onValue(classRef, (snapshot) => {
    if (snapshot.exists()) {
      const Classrooms = snapshot.val();

      for (const key in Classrooms) {
        if (Classrooms[key].Class_Code === Class_Code) {
          console.log("Code exists, rolling again:", Class_Code);

          return generateUniqueClassCode(db, callback);
        }
      }
      callback(Class_Code);
    } else {
      callback(Class_Code);
    }
  }, { onlyOnce: true });
}


function generateClassCode(length = 7) {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "23456789";
  const chars = letters + numbers;

  while (true) {
    let code = "";
    let hasNumber = false;

    for (let i = 0; i < length; i++) {
      const ch = chars.charAt(Math.floor(Math.random() * chars.length));
      code += ch;
      if (numbers.includes(ch)) hasNumber = true;
    }

    if (hasNumber) return code;
  }
}

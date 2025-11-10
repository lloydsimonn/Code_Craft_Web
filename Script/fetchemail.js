  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getDatabase, ref, get, onValue} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

  
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


  console.log("Firebase Initialized");
  console.log(db);
// Example usage:
const email = "harley@gmail.com";

onValue(nameRef, (snapshot) => {
  if (snapshot.exists()) {
    const data_onval = snapshot.val();
    const tbody = document.querySelector("tbody");

    // 🔹 Clear previous table data before inserting new rows
    tbody.innerHTML = "";

    for (const key in data_onval) {
      if (data_onval.hasOwnProperty(key)) {
        const uid_ref = ref(db, "user/" + key);

        onValue(uid_ref, (snapshot) => {
          if (snapshot.exists()) {
            const UID_data = snapshot.val();

            if (
              UID_data.role === "Teacher" ||
              UID_data.role === "teacher"
            ) {
              const name =
                UID_data.lname +
                " " +
                UID_data.fname +
                " " +
                UID_data.mname;
              const teacherNumber = UID_data.snum;
              const role = UID_data.role;
              const uname = UID_data.uname;

              const row = `
                <tr class="text-center">
                  <td>${key}</td>
                  <td>${name}</td>
                  <td>${teacherNumber}</td>
                  <td>${role}</td>
                  <td>${uname}</td>
                  <td>
                    <button class="view-gameplay btn btn-success btn-sm rounded-pill">
                      <i class="fas fa-check"></i> Approve
                    </button>
                  </td>
                </tr>
              `;
              tbody.insertAdjacentHTML("beforeend", row);
            }
          }
        }, { onlyOnce: true }); 
      }
    }
  }
});

get(nameRef)
  .then((db_val) => {
    if (db_val.exists()) {
      const data = db_val.val();

        for(const key in data){
            if(data.hasOwnProperty(key)){
              const uidRef = ref(db, "user/" + key);
                
              get(uidRef).then((uid_val) =>{
                if(uid_val.exists()){
                
                  const UID_data = uid_val.val();

                  // if(UID_data.role == "Teacher"){
                  //  console.log("Name: " + UID_data.lname +" "+ UID_data.fname +" "+ UID_data.mname);
                  //  console.log("Uname: " + UID_data.uname);
                  // const name = UID_data.lname +" "+ UID_data.fname +" "+ UID_data.mname;
                  // const teacherNumber = UID_data.snum;
                  // const role = UID_data.role;
                  // const uname = UID_data.uname;

                  // const tbody = document.querySelector("tbody");
                  //   const row = `
                  //       <tr class="text-center">
                  //         <td>${key}</td>
                  //         <td>${name}</td>
                  //         <td>${teacherNumber}</td>
                  //         <td>${role}</td>
                  //         <td>${uname}</td>
                  //         <td>
                  //           <button class="view-gameplay btn btn-success btn-sm rounded-pill">
                  //             <i class="fas fa-check"></i> Approve
                  //           </button>
                  //         </td>
                  //       </tr>
                  //     `;
                  //      tbody.insertAdjacentHTML("beforeend", row);
                  // }
                } 
              });
            }
            
        }
    } else {
      console.log("No data found");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

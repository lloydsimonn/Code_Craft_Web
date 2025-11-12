

  
const apiKey = "AIzaSyD1hz_qEnPnktj74zoURrPwjVo3TPCOeu4"; // Firebase Web API Key
const email = "email@g.com";

fetch(`https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${apiKey}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    identifier: email,
    continueUri: ""
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.registered) {
      console.log("Email already exists in Firebase ✅");
    } else {
      console.log("Email is available 🆓");
    }
  })
  .catch(error => console.error("Error checking email:", error));

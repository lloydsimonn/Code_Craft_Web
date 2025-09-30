
  let questionCount = 1; 
  const maxQuestions = 10;
  const Publish = document.getElementById("Publish");

 
  document.getElementById("add-question").addEventListener("click", () => {
    if (questionCount >= maxQuestions) {
         const maxModal = new bootstrap.Modal(document.getElementById("maxQuestionModal"));
         maxModal.show();
         
         return;
    }
    
    

    questionCount++;

 
    const template = document.getElementById("question-template");
    const newCard = template.cloneNode(true);
    newCard.id = "";
    
    newCard.querySelector("label").textContent = questionCount + ".";

 
    newCard.querySelectorAll("input").forEach(input => input.value = "");
    newCard.querySelectorAll("textarea").forEach(textarea => {
      textarea.value = "";
      textarea.style.height = "auto";
      
    });
  
    //  
    const buttonContainer = document.querySelector(".d-flex.justify-content-center");
    buttonContainer.parentNode.insertBefore(newCard, buttonContainer);

    newCard.querySelectorAll(".auto-expand").forEach(textarea => {
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      });
    });

    // 📌 Auto-scroll to the new card
    newCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

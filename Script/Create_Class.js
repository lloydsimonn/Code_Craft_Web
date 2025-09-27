  // Example backend hook with JS
    document.getElementById('createClassForm').addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('className').value;
      const password = document.getElementById('classPassword').value;

      // Example backend call (replace with real API)
      console.log("Sending to backend:", { name, password });

      // Close modal after submit
      const modal = bootstrap.Modal.getInstance(document.getElementById('createClassModal'));
      modal.hide();

      // Optional: show alert or update UI
      alert(`Class "${name}" created successfully!`);
    });

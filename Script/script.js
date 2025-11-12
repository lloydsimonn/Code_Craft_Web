window.addEventListener('DOMContentLoaded', () => {
  // Animate the login card
  const loginCard = document.querySelector('.bg-dark.p-4.rounded-4');
  if (loginCard) loginCard.classList.add('login-card-animate');

  // Animate all input fields
  document.querySelectorAll('.form-control').forEach(input => {
    input.classList.add('form-control-animate');
  });

  // Animate the eye icon as well
  const eyeIcon = document.getElementById('togglePassword');
  if (eyeIcon) eyeIcon.classList.add('eye-animate');
});
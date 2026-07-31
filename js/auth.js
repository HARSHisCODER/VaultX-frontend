const authShell = document.querySelector('.page-shell');
const authCard = document.querySelector('.login-card');
const authInputs = Array.from(document.querySelectorAll('.field-wrap input'));

if (authShell && authCard) {
  authShell.classList.add('auth-ready');
  authCard.classList.add('auth-ready');

  authInputs.forEach((input) => {
    const wrap = input.closest('.field-wrap');

    const syncFocus = () => {
      wrap?.classList.toggle('is-focused', document.activeElement === input);
    };

    input.addEventListener('focus', syncFocus);
    input.addEventListener('blur', syncFocus);
    input.addEventListener('input', () => {
      wrap?.classList.toggle('has-value', input.value.trim().length > 0);
    });
  });
}

const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const toggle = document.querySelector('.visibility-toggle');
const submitButton = document.querySelector('.sign-in');
const message = document.querySelector('#form-message');
const signupModal = document.querySelector('#create-account-modal');
const pageShell = document.querySelector('.page-shell');
const signupLink = document.querySelector('[data-open-signup]');
const signupForm = document.querySelector('#signup-form');
const signupName = document.querySelector('#signup-name');
const signupEmail = document.querySelector('#signup-email');
const signupPassword = document.querySelector('#signup-password');
const signupMessage = document.querySelector('#signup-message');
let previousFocus;

const setMessage = (element, text, success = false) => {
  element.className = `form-message${success ? ' success' : ''}`;
  element.textContent = text;
};

toggle.addEventListener('click', () => {
  const isVisible = password.type === 'text';
  password.type = isVisible ? 'password' : 'text';
  toggle.classList.toggle('is-visible', !isVisible);
  toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  toggle.setAttribute('aria-pressed', String(!isVisible));
  password.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setMessage(message, '');

  if (!email.validity.valid) {
    setMessage(message, 'Please enter a valid email address.');
    email.focus();
    return;
  }
  if (!password.validity.valid) {
    setMessage(message, 'Your password must be at least 6 characters.');
    password.focus();
    return;
  }

  submitButton.classList.add('loading');
  window.setTimeout(() => {
    submitButton.classList.remove('loading');
    setMessage(message, 'Signed in successfully. Opening your vault...', true);
  }, 850);
});

const openSignup = () => {
  previousFocus = document.activeElement;
  signupModal.classList.add('is-open');
  signupModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
  pageShell.classList.add('signup-open');
  window.setTimeout(() => signupName.focus(), 180);
};

const closeSignup = () => {
  signupModal.classList.remove('is-open');
  signupModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
  pageShell.classList.remove('signup-open');
  previousFocus?.focus();
};

signupLink.addEventListener('click', (event) => {
  event.preventDefault();
  openSignup();
});

signupModal.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    closeSignup();
  });
});

signupModal.addEventListener('click', (event) => {
  if (event.target === signupModal) closeSignup();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && signupModal.classList.contains('is-open')) closeSignup();
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setMessage(signupMessage, '');

  if (!signupName.validity.valid) {
    setMessage(signupMessage, 'Please enter your name.');
    signupName.focus();
    return;
  }
  if (!signupEmail.validity.valid) {
    setMessage(signupMessage, 'Please enter a valid email address.');
    signupEmail.focus();
    return;
  }
  if (!signupPassword.validity.valid) {
    setMessage(signupMessage, 'Your password must be at least 6 characters.');
    signupPassword.focus();
    return;
  }

  const createButton = signupForm.querySelector('.create-button');
  createButton.classList.add('loading');
  window.setTimeout(() => {
    createButton.classList.remove('loading');
    setMessage(signupMessage, 'Your secure VaultX account is ready.', true);
  }, 850);
});

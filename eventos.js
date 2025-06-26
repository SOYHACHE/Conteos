function setupEventListeners() {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const registerLink = document.getElementById('register-link');
  const loginLink = document.getElementById('login-link');
  const passwordInput = document.getElementById('password');

  if (loginBtn) loginBtn.addEventListener('click', login);
  if (registerBtn) registerBtn.addEventListener('click', register);
  if (registerLink) registerLink.addEventListener('click', () => showScreen('register-screen'));
  if (loginLink) loginLink.addEventListener('click', () => showScreen('login-screen'));
  if (passwordInput) {
    passwordInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        login();
      }
    });
  }
}

async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('login-error');
  errorBox.style.display = 'none';

  if (!username || !password) {
    showAlert(errorBox, 'Por favor, ingrese usuario y contraseña.', 'alert-danger');
    return;
  }

  try {
    const result = await api.login(username, password);
    if (result.success) {
      sessionStorage.setItem('currentUser', username);
      location.href = 'menu.html';
    }
  } catch (err) {
    showAlert(errorBox, err.message, 'alert-danger');
  }
}

async function register() {
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const registerError = document.getElementById('register-error');
  registerError.style.display = 'none';

  if (!username || !password || !confirmPassword) {
    registerError.textContent = 'Por favor, complete todos los campos.';
    registerError.style.display = 'block';
    return;
  }

  if (password !== confirmPassword) {
    registerError.textContent = 'Las contraseñas no coinciden.';
    registerError.style.display = 'block';
    return;
  }

  try {
    const result = await api.register(username, password);
    if (result.success) {
      alert('Usuario registrado con éxito. Ahora puede iniciar sesión.');
      document.getElementById('new-username').value = '';
      document.getElementById('new-password').value = '';
      document.getElementById('confirm-password').value = '';
      showScreen('login-screen');
    }
  } catch (error) {
    registerError.textContent = error.message;
    registerError.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  initLocalStorage();
  setupEventListeners();

  const user = sessionStorage.getItem('currentUser');
  if (user) {
    location.href = 'menu.html';
  } else {
    showScreen('login-screen');
  }
}

function initLocalStorage() {
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify({
      'admin': { clave: 'admin123' }
    }));
  }
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  const screenToShow = document.getElementById(screenId);
  if (screenToShow) {
    screenToShow.classList.add('active');
  }
}

function showAlert(element, message, className) {
  element.textContent = message;
  element.className = `alert ${className}`;
  element.style.display = 'block';
}

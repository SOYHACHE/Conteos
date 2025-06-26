let usuariosJSON = [];

async function cargarUsuarios() {
  const res = await fetch('usuarios.json');
  usuariosJSON = await res.json();
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', cargarUsuarios);

// Obtener usuarios guardados en LocalStorage
function obtenerUsuariosLocales() {
  return JSON.parse(localStorage.getItem('usuariosLocales') || '[]');
}

// Guardar usuarios nuevos en LocalStorage
function guardarUsuarioLocal(usuario) {
  const usuariosLocales = obtenerUsuariosLocales();
  usuariosLocales.push(usuario);
  localStorage.setItem('usuariosLocales', JSON.stringify(usuariosLocales));
}

function login() {
  const usuario = document.getElementById('login-user').value;
  const password = document.getElementById('login-pass').value;

  const todos = [...usuariosJSON, ...obtenerUsuariosLocales()];
  const existe = todos.find(u => u.usuario === usuario && u.password === password);

  document.getElementById('mensaje').innerText = existe
    ? 'Login exitoso ✅'
    : 'Usuario o contraseña incorrectos ❌';
}

function registrar() {
  const usuario = document.getElementById('register-user').value;
  const password = document.getElementById('register-pass').value;

  const yaExiste = [...usuariosJSON, ...obtenerUsuariosLocales()]
    .some(u => u.usuario === usuario);

  if (yaExiste) {
    document.getElementById('mensaje').innerText = 'El usuario ya existe ❌';
  } else {
    guardarUsuarioLocal({ usuario, password });
    document.getElementById('mensaje').innerText = 'Usuario registrado con éxito ✅';
  }
}

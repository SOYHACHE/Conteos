function crearAdminSiNoExiste() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
  if (!usuarios['admin']) {
    usuarios['admin'] = { clave: 'admin123' };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario admin creado con contraseña admin123');
  }
}

// Llamar esta función al iniciar la app
crearAdminSiNoExiste();

const api = {
  login(username, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    const user = usuarios[username];

    if (!user || user.clave !== password) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    return { success: true };
  },

  register(username, password) {
    if (!username || !password) {
      throw new Error('Nombre de usuario y contraseña requeridos.');
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');

    if (usuarios[username]) {
      throw new Error('El usuario ya existe.');
    }

    usuarios[username] = { clave: password };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return { success: true };
  }
};

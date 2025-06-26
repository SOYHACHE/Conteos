// Reemplazá esta URL con la URL pública desplegada de tu Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbww_NnNFD6TnITWaZgkolwsUc2Otc_EnGMnc8dLWsG6mZr8lZj778ozeQy2tUKCB5gL/exec';

export async function login(username, password) {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'login',
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

export async function register(username, password) {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'register',
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

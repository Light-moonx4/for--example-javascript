import { getUsers, setSession } from '../../database/db.js';

export function initLogin() {
    document.getElementById('form-login').addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const usuarios = await getUsers();
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
            setSession(usuario);
            window.location.hash = usuario.role === 'admin' ? '#home' : '#user';
        } else {
            document.getElementById('error-login').classList.remove('hidden');
        }
    });
}
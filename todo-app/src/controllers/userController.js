import { getUsuarios, setUsuarios, getSession, setSession, clearSession } from '../../database/db.js';

export function initEditar() {
    document.getElementById('btn-editar').addEventListener('click', () => {
        const usuario = getSession();
        if (!usuario) return;

        const nuevoNombre = prompt('Nuevo nombre:', usuario.nombre);
        if (nuevoNombre === null) return;
        const nuevoApellido = prompt('Nuevo apellido:', usuario.apellido);
        if (nuevoApellido === null) return;
        const nuevoEmail = prompt('Nuevo email:', usuario.email);
        if (nuevoEmail === null) return;
        const nuevaImagen = prompt('URL de imagen (dejar vacío para quitar):', usuario.imagen || '');
        if (nuevaImagen === null) return;

        usuario.nombre = nuevoNombre.trim();
        usuario.apellido = nuevoApellido.trim();
        usuario.email = nuevoEmail.trim();
        usuario.imagen = nuevaImagen.trim();

        const usuarios = getUsuarios();
        const index = usuarios.findIndex(u => u.username === usuario.username);
        if (index !== -1) usuarios[index] = usuario;

        setUsuarios(usuarios);
        setSession(usuario);
        window.dispatchEvent(new Event('hashchange'));
    });
}

export function initEliminar() {
    document.getElementById('btn-eliminar').addEventListener('click', () => {
        const usuario = getSession();
        if (!usuario) return;
        if (!confirm('¿Seguro que quieres eliminar tu cuenta? No se puede deshacer.')) return;

        const usuarios = getUsuarios().filter(u => u.username !== usuario.username);
        setUsuarios(usuarios);
        clearSession();
        window.location.hash = '#login';
    });
}
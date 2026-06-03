import { clearSession, getSession } from '../../database/db.js';
import riwiLogo from '../assets/RIWI2.png';

export function renderLayout(contenido) {
    const usuario = getSession();

    document.getElementById('app').innerHTML = `
        <nav class="bg-white shadow-sm rounded-2xl px-6 py-4 mb-6 flex justify-between items-center">
            <div class="flex items-center gap-3">
            <img src="${riwiLogo}" alt="RIWI" class="h-11 object-contain">
            </div>
            <div class="flex items-center gap-4">
                <span class="text-sm text-gray-500">
                    ${usuario.full_name} 
                    <span class="ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${usuario.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}">
                        ${usuario.role}
                    </span>
                </span>
                <button id="btn-logout" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition">
                    Cerrar Sesión
                </button>
            </div>
        </nav>
        <div id="contenido">
            ${contenido}
        </div>
    `;

    document.getElementById('btn-logout').addEventListener('click', () => {
        clearSession();
        window.location.hash = '#login';
    });
}
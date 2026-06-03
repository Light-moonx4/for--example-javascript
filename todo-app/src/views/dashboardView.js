import { userCard } from '../components/userCard.js';
import { getUsuarios } from '../../database/db.js';

export function dashboardView(usuarioActual) {
    const todos = getUsuarios();
    const otrosUsuarios = todos.filter(u => u.username !== usuarioActual.username);

    const cartasOtros = otrosUsuarios.length > 0
        ? otrosUsuarios.map(u => `
            <div class="bg-white rounded-xl shadow p-4">
                ${userCard(u, false)}
            </div>
        `).join('')
        : `<p class="text-gray-400 text-sm col-span-full">Aún no hay otros usuarios registrados.</p>`;

    return `
        <section class="space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
                <h2 class="text-2xl font-bold">Bienvenido, ${usuarioActual.nombre}</h2>
                <button id="btn-cerrar-sesion" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition">
                    Cerrar Sesión
                </button>
            </div>

            <!-- Tu tarjeta -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-lg font-semibold mb-4 text-gray-700">Tu perfil</h3>
                ${userCard(usuarioActual, true)}
            </div>

            <!-- Tarjetas de otros usuarios -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-lg font-semibold mb-4 text-gray-700">Usuarios registrados</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${cartasOtros}
                </div>
            </div>
        </section>
    `;
}
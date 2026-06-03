export function notFoundView() {
    return `
        <section class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 class="text-8xl font-bold text-gray-200 mb-4">404</h1>
            <p class="text-xl text-gray-600 mb-6">Página no encontrada</p>
            <a href="#login" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Volver al inicio</a>
        </section>
    `;
}
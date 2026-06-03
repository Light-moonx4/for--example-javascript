export function registroView() {
    return `
        <section class="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <h1 class="text-3xl font-bold text-center mb-6">Crear Cuenta</h1>
            <form id="form-registro" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Nombre</label>
                    <input type="text" id="nombre" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Apellido</label>
                    <input type="text" id="apellido" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Username</label>
                    <input type="text" id="username" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Contraseña</label>
                    <input type="password" id="contraseña" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Email</label>
                    <input type="email" id="email" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">URL de foto de perfil</label>
                    <input type="url" id="imagen" placeholder="https://..." class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                    <p class="text-xs text-gray-400 mt-1">Opcional. Pega un enlace directo a una imagen.</p>
                </div>
                <p id="error-registro" class="text-red-500 text-sm hidden"></p>
                <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                    Registrarse
                </button>
            </form>
            <p class="text-center mt-4 text-sm text-gray-500">
                ¿Ya tienes cuenta? 
                <a href="#login" class="text-blue-600 font-medium hover:underline">Iniciar Sesión</a>
            </p>
        </section>
    `;
}
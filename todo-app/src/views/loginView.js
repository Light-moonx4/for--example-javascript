import riwiLogo from '../assets/RIWI3.png';

export function loginView() {
    return `
        <section class="bg-white rounded-2xl shadow-lg overflow-hidden flex min-h-[500px]">
            
            <div class="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10 w-1/2">
                <img src="${riwiLogo}" alt="RIWI" class="w-55 h-55 object-contain mb-6">
                <h2 class="text-3xl font-bold mb-4 text-center">Bienvenido</h2>
                <p class="text-blue-100 text-center text-sm leading-relaxed">
                    Gestiona tus tareas, conecta con tu equipo y mantén tu trabajo siempre organizado.
                </p>
            </div>

            <div class="flex-1 p-10 flex flex-col justify-center">
                <h1 class="text-3xl font-bold mb-2">Iniciar Sesión</h1>
                <p class="text-gray-500 text-sm mb-8">Ingresa tus credenciales para continuar</p>

                <form id="form-login" class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <input type="email" id="login-email" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Contraseña</label>
                        <input type="password" id="login-password" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" required>
                    </div>
                    <p id="error-login" class="text-red-500 text-sm hidden">Email o contraseña incorrectos.</p>
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </section>
    `;
}
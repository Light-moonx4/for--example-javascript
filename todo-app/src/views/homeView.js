export function homeView() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">Todas las Tareas</h2>
                <button id="btn-nueva-tarea" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                    + Nueva Tarea
                </button>
            </div>

            <!-- Filtros -->
            <div class="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3">
                <input id="filtro-busqueda" type="text" placeholder="Buscar tarea..." 
                       class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 flex-1">
                <select id="filtro-status" class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option value="">Todos los estados</option>
                    <option value="initial">Initial</option>
                    <option value="process">Process</option>
                    <option value="completed">Completed</option>
                </select>
                <select id="filtro-usuario" class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option value="">Todos los usuarios</option>
                </select>
            </div>

            <!-- Lista de tareas -->
            <div id="contenedor-tareas" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p class="text-gray-400 text-sm">Cargando tareas...</p>
            </div>
        </div>
    `;
}
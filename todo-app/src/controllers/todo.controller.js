import { getTodos, getUsers, createTodo, updateTodo, deleteTodo, getSession } from '../../database/db.js';

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        status: params.get('status') || '',
        search: params.get('search') || '',
        user: params.get('user') || ''
    };
}


function setQueryParams(params) {
    const url = new URLSearchParams();
    if (params.status) url.set('status', params.status);
    if (params.search) url.set('search', params.search);
    if (params.user) url.set('user', params.user);
    const newUrl = `${window.location.pathname}?${url.toString()}#${window.location.hash.slice(1)}`;
    window.history.pushState({}, '', newUrl);
}

function statusBadge(status) {
    const colores = {
        initial: 'bg-gray-100 text-gray-600',
        process: 'bg-yellow-100 text-yellow-600',
        completed: 'bg-green-100 text-green-600'
    };
    return `<span class="px-2 py-1 rounded-full text-xs font-medium ${colores[status] || 'bg-gray-100 text-gray-600'}">${status}</span>`;
}

function renderTareas(tareas, esAdmin) {
    const contenedor = document.getElementById('contenedor-tareas');
    if (!contenedor) return;

    if (tareas.length === 0) {
        contenedor.innerHTML = `<p class="text-gray-400 text-sm col-span-full">No hay tareas.</p>`;
        return;
    }

    contenedor.innerHTML = tareas.map(tarea => `
        <div class="bg-white rounded-xl shadow p-5 space-y-3">
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-gray-800">${tarea.title}</h3>
                ${statusBadge(tarea.status)}
            </div>
            <p class="text-sm text-gray-500">${tarea.description}</p>
            <div class="flex gap-2 pt-2">
                ${esAdmin ? `
                    <select data-id="${tarea.id}" class="select-status px-3 py-1 border rounded-lg text-xs focus:outline-none">
                        <option value="initial" ${tarea.status === 'initial' ? 'selected' : ''}>Initial</option>
                        <option value="process" ${tarea.status === 'process' ? 'selected' : ''}>Process</option>
                        <option value="completed" ${tarea.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                    <button data-id="${tarea.id}" class="btn-eliminar ml-auto px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs transition">
                        Eliminar
                    </button>
                ` : `
                    <button data-id="${tarea.id}" data-title="${tarea.title}" data-desc="${tarea.description}" data-status="${tarea.status}"
                            class="btn-editar px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs transition">
                        Editar
                    </button>
                `}
            </div>
        </div>
    `).join('');

    // Listeners admin
    if (esAdmin) {
        document.querySelectorAll('.select-status').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id = e.target.dataset.id;
                const todos = await getTodos();
                const tarea = todos.find(t => t.id == id);
                await updateTodo(id, { ...tarea, status: e.target.value });
                cargarTareas(esAdmin);
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (!confirm('¿Eliminar esta tarea?')) return;
                await deleteTodo(e.target.dataset.id);
                cargarTareas(esAdmin);
            });
        });
    } else {
        // Listeners user
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const { id, title, desc, status } = e.target.dataset;
                mostrarModalTarea(id, title, desc, status);
            });
        });
    }
}

async function cargarTareas(esAdmin) {
    const usuario = getSession();
    let tareas = await getTodos();
    const { status, search, user } = getQueryParams();

    if (!esAdmin) {
        tareas = tareas.filter(t => t.id_user == usuario.id);
    }
    if (status) tareas = tareas.filter(t => t.status === status);
    if (search) tareas = tareas.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    if (user && esAdmin) tareas = tareas.filter(t => t.id_user == user);

    renderTareas(tareas, esAdmin);
}

async function cargarFiltroUsuarios() {
    const select = document.getElementById('filtro-usuario');
    if (!select) return;
    const usuarios = await getUsers();
    usuarios.forEach(u => {
        const option = document.createElement('option');
        option.value = u.id;
        option.textContent = u.full_name;
        select.appendChild(option);
    });
    const { user } = getQueryParams();
    if (user) select.value = user;
}

function mostrarModalTarea(id = null, title = '', desc = '', status = 'initial') {
    const modal = document.createElement('div');
    modal.id = 'modal-tarea';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <h2 class="text-xl font-bold mb-6">${id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Título</label>
                    <input id="modal-title" type="text" value="${title}" 
                           class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Descripción</label>
                    <textarea id="modal-desc" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none" rows="3">${desc}</textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Estado</label>
                    <select id="modal-status" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500">
                        <option value="initial" ${status === 'initial' ? 'selected' : ''}>Initial</option>
                        <option value="process" ${status === 'process' ? 'selected' : ''}>Process</option>
                        <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
            </div>
            <div class="flex gap-3 mt-6">
                <button id="modal-cancelar" class="flex-1 py-2 border rounded-lg text-gray-600">Cancelar</button>
                <button id="modal-confirmar" class="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium">Guardar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('modal-cancelar').onclick = () => modal.remove();
    document.getElementById('modal-confirmar').onclick = async () => {
        const usuario = getSession();
        const datos = {
            id_user: usuario.id,
            title: document.getElementById('modal-title').value.trim(),
            description: document.getElementById('modal-desc').value.trim(),
            status: document.getElementById('modal-status').value
        };
        if (!datos.title) return;

        if (id) {
            await updateTodo(id, datos);
        } else {
            await createTodo(datos);
        }
        modal.remove();
        cargarTareas(false);
    };
}

export async function initHome() {
    const esAdmin = true;
    await cargarFiltroUsuarios();
    await cargarTareas(esAdmin);

    const { status, search, user } = getQueryParams();
    if (status) document.getElementById('filtro-status').value = status;
    if (search) document.getElementById('filtro-busqueda').value = search;

    document.getElementById('filtro-status').addEventListener('change', (e) => {
        setQueryParams({ ...getQueryParams(), status: e.target.value });
        cargarTareas(esAdmin);
    });

    document.getElementById('filtro-busqueda').addEventListener('input', (e) => {
        setQueryParams({ ...getQueryParams(), search: e.target.value });
        cargarTareas(esAdmin);
    });

    document.getElementById('filtro-usuario').addEventListener('change', (e) => {
        setQueryParams({ ...getQueryParams(), user: e.target.value });
        cargarTareas(esAdmin);
    });

    document.getElementById('btn-nueva-tarea').addEventListener('click', () => {
        mostrarModalTarea();
    });
}

export async function initUser() {
    const esAdmin = false;
    await cargarTareas(esAdmin);

    const { status, search } = getQueryParams();
    if (status) document.getElementById('filtro-status').value = status;
    if (search) document.getElementById('filtro-busqueda').value = search;

    document.getElementById('filtro-status').addEventListener('change', (e) => {
        setQueryParams({ ...getQueryParams(), status: e.target.value });
        cargarTareas(esAdmin);
    });

    document.getElementById('filtro-busqueda').addEventListener('input', (e) => {
        setQueryParams({ ...getQueryParams(), search: e.target.value });
        cargarTareas(esAdmin);
    });

    document.getElementById('btn-nueva-tarea').addEventListener('click', () => {
        mostrarModalTarea();
    });
}
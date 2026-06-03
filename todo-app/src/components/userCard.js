export function userCard(usuario, esPropietario = false) {
    const avatar = usuario.imagen
        ? `<img src="${usuario.imagen}" alt="avatar" class="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2 border-blue-100">`
        : `<div class="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-4">👤</div>`;

    const botones = esPropietario ? `
        <div class="flex gap-3 mt-6">
            <button id="btn-editar" class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium transition">
                Editar Perfil
            </button>
            <button id="btn-eliminar" class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition">
                Eliminar Cuenta
            </button>
        </div>
    ` : '';

    return `
        <div class="bg-gray-50 p-6 rounded-xl text-center">
            ${avatar}
            <h3 class="text-xl font-semibold mb-1">${usuario.nombre} ${usuario.apellido}</h3>
            <p class="text-blue-600 font-medium mb-4">@${usuario.username}</p>
            <div class="text-left space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-gray-500">Nombre</span><span class="font-medium">${usuario.nombre}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Apellido</span><span class="font-medium">${usuario.apellido}</span></div>
                <div class="flex justify-between"><span class="text-gray-500">Email</span><span class="font-medium">${usuario.email}</span></div>
            </div>
            ${botones}
        </div>
    `;
}
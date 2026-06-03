const BASE_URL = 'http://localhost:3000';

export async function getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
}

export async function getTodos() {
    const response = await fetch(`${BASE_URL}/todo_list`);
    return response.json();
}

export async function createTodo(todo) {
    const response = await fetch(`${BASE_URL}/todo_list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });
    return response.json();
}

export async function updateTodo(id, todo) {
    const response = await fetch(`${BASE_URL}/todo_list/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });
    return response.json();
}

export async function deleteTodo(id) {
    await fetch(`${BASE_URL}/todo_list/${id}`, { method: 'DELETE' });
}

export function getSession() {
    const data = localStorage.getItem('usuarioActual');
    return data ? JSON.parse(data) : null;
}

export function setSession(usuario) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

export function clearSession() {
    localStorage.removeItem('usuarioActual');
}
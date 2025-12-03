const API = "https://jsonplaceholder.typicode.com";

async function getUsers() {
    try {
        const res = await fetch(`${API}/users`);
        if (!res.ok) throw new Error("Помилка отримання даних");
        const users = await res.json();
        document.getElementById("users").innerHTML = users.map(u => `
            <div class='user'><b>${u.name}</b> (${u.email})</div>
        `).join('');
    } catch (e) { showError(e.message); }
}

async function createPost(e) {
    e.preventDefault();
    try {
        const res = await fetch(`${API}/posts`, {
            method: "POST",
            body: JSON.stringify({
                title: document.getElementById("newTitle").value,
                body: document.getElementById("newBody").value,
                userId: 1
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!res.ok) throw new Error("Помилка створення поста");
        alert("Пост створено!");
    } catch (e) { showError(e.message); }
}

async function updatePost(e) {
    e.preventDefault();
    try {
        const id = document.getElementById("editId").value;
        const res = await fetch(`${API}/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: document.getElementById("editTitle").value,
                body: document.getElementById("editBody").value,
                userId: 1
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!res.ok) throw new Error("Помилка оновлення");
        alert("Пост оновлено!");
    } catch (e) { showError(e.message); }
}

async function deletePost() {
    try {
        const id = document.getElementById("deleteId").value;
        const res = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Помилка видалення");
        alert("Пост видалено!");
    } catch (e) { showError(e.message); }
}

async function getPosts() {
    try {
        const res = await fetch(`${API}/posts`);
        if (!res.ok) throw new Error("Помилка отримання постів");
        const posts = await res.json();
        document.getElementById("posts").innerHTML = posts.slice(0,20).map(p => `
        <div class='post'><b>${p.title}</b><br>${p.body}</div>
        `).join('');
    } catch (e) { showError(e.message); }
}

function showError(msg) {
    document.getElementById("error").textContent = msg;
}
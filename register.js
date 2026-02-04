let users = JSON.parse(localStorage.getItem("users")) || {};

function register() {
    const u = newUser.value.trim().toLowerCase();
    const p = newPass.value;

    if (!u || !p) {
        msg.innerText = "Fill all fields";
        return;
    }

    if (users[u] || u === "admin") {
        msg.innerText = "User already exists";
        return;
    }

    users[u] = p;
    localStorage.setItem("users", JSON.stringify(users));
    msg.innerText = "Registration successful";
}

function togglePassword(id) {
    const i = document.getElementById(id);
    i.type = i.type === "password" ? "text" : "password";
}

function goLogin() {
    window.location.href = "user-login.html";
}

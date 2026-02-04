let users = JSON.parse(localStorage.getItem("users")) || {};

function userLogin() {
    const u = username.value.trim().toLowerCase();
    const p = password.value;
    msg.innerText = "";

    if (users[u] === p) {
        localStorage.setItem("role", "user");
        window.location.href = "user.html";
    } else {
        msg.innerText = "Invalid credentials";
    }
}

function forgotPassword() {
    if (users[username.value]) {
        msg.innerText = "Password reset link sent (demo)";
    } else {
        msg.innerText = "Username not found";
    }
}

function togglePassword(id) {
    const i = document.getElementById(id);
    i.type = i.type === "password" ? "text" : "password";
}

function goAdmin() {
    window.location.href = "admin-login.html";
}

function goRegister() {
    window.location.href = "register.html";
}

function goBack() {
    window.location.href = "index.html";
}




function adminLogin() {
    if (adminUser.value === "admin" && adminPass.value === "admin123") {
        localStorage.setItem("role", "admin");
        window.location.href = "admin.html";
    } else {
        msg.innerText = "Invalid admin credentials";
    }
}

function togglePassword(id) {
    const i = document.getElementById(id);
    i.type = i.type === "password" ? "text" : "password";
}

function goBack() {
    window.location.href = "user-login.html";
}

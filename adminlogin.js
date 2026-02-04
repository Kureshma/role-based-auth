const adminId = "admin";
const adminPassword = "admin123";

function adminLogin() {
    const name = document.getElementById("adminName").value;
    const password = document.getElementById("adminPassword").value;
    const msg = document.getElementById("message");

    if (name === adminId && password === adminPassword) 
    {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin.html";
    } 
    else 
    {
        msg.innerText = "❌ Invalid Admin Credentials";
        msg.style.color = "red";
    }
}

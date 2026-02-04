if (localStorage.getItem("role") !== "user") {
    window.location.href = "user-login.html";
}
// USERS
const customers = {
    C1: { name: "kuresh", creditLimit: 2000 },
    C2: { name: "darsh", creditLimit: 2500 },
    C3: { name: "keerthi", creditLimit: 3000 },
    C4: { name: "akshaya", creditLimit: 4000 },
    C5: { name: "bava", creditLimit: 3500 }
};

// Products from admin
let system = JSON.parse(localStorage.getItem("systemData")) || { products: {} };

// Cart stores product keys
let cart = [];

const customerSelect = document.getElementById("customerSelect");
const productTable = document.getElementById("productTable");
const cartDiv = document.getElementById("cart");
const message = document.getElementById("message");
const totalText = document.getElementById("total");

// Load users
function loadUsers() {
    for (let key in customers) {
        const u = customers[key];
        customerSelect.innerHTML += `
            <option value="${key}">
                ${u.name} (Limit ₹${u.creditLimit})
            </option>
        `;
    }
}

// Load products
function loadProducts() {
    productTable.innerHTML = "";
    for (let key in system.products) {
        const p = system.products[key];
        productTable.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.stock}</td>
                <td>${p.price}</td>
                <td><button onclick="addToCart('${key}')">Add</button></td>
            </tr>
        `;
    }
}

// ADD TO CART WITH STOCK CHECK
function addToCart(key) {
    const product = system.products[key];

    // Count how many times this product is already in cart
    const cartCount = cart.filter(item => item === key).length;

    if (cartCount >= product.stock) {
        showMessage("❌ Stock not available", "red");
        return;
    }

    cart.push(key);
    updateCart();
    showMessage("✅ Added to cart", "green");
}

// REMOVE ITEM
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// UPDATE CART UI
function updateCart() {
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach((key, index) => {
        const p = system.products[key];
        total += p.price;

        cartDiv.innerHTML += `
            <p>
                ${p.name} - ₹${p.price}
                <button class="cancel-btn" onclick="removeFromCart(${index})">
                    Cancel
                </button>
            </p>
        `;
    });

    totalText.innerText = `Total Amount: ₹${total}`;
}

// BUY
function buy() {
    const customer = customers[customerSelect.value];
    let total = 0;

    cart.forEach(key => {
        total += system.products[key].price;
    });

    if (cart.length === 0) {
        showMessage("🛒 Cart is empty", "red");
        return;
    }

    if (total > customer.creditLimit) {
        showMessage("❌ Credit limit exceeded", "red");
        return;
    }

    // Reduce stock after purchase
    cart.forEach(key => {
        system.products[key].stock--;
    });

    localStorage.setItem("systemData", JSON.stringify(system));

    cart = [];
    updateCart();
    loadProducts();
    showMessage("✅ Purchase successful!", "green");
}

// MESSAGE
function showMessage(text, color) {
    message.innerText = text;
    message.style.color = color;
}

// INIT
loadUsers();
loadProducts();

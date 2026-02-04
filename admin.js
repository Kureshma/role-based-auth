if (localStorage.getItem("role") !== "admin") {
    window.location.href = "admin-login.html";
}


const defaultSystem = {
    products: {
        P1: { name: "Ring", stock: 10, price: 500 },
        P2: { name: "Chain", stock: 5, price: 1000 },
        P3: { name: "Watch", stock: 7, price: 2000 },
        P4: { name: "Bracelet", stock: 12, price: 800 }
    }
};

let system = JSON.parse(localStorage.getItem("systemData")) || { products: {} };

for (let key in defaultSystem.products) {
    if (!system.products[key]) {
        system.products[key] = defaultSystem.products[key];
    }
}

localStorage.setItem("systemData", JSON.stringify(system));

const table = document.getElementById("productTable");

function renderProducts() {
    table.innerHTML = "";

    for (let key in system.products) {
        const p = system.products[key];

        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td><input type="number" id="stock-${key}" value="${p.stock}"></td>
                <td><input type="number" id="price-${key}" value="${p.price}"></td>
                <td><button onclick="updateProduct('${key}')">Update</button></td>
            </tr>
        `;
    }
}

function updateProduct(key) {
    system.products[key].stock =
        Number(document.getElementById(`stock-${key}`).value);

    system.products[key].price =
        Number(document.getElementById(`price-${key}`).value);

    localStorage.setItem("systemData", JSON.stringify(system));
    alert("✔ Updated Successfully");
}

renderProducts();

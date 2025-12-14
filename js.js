let cart = [];
let total = 0;

fetch("db.json")
    .then(response => response.json())
    .then(data => renderProducts(data.products));

function renderProducts(products) {
    const container = document.getElementById("products");

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.photo_url}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><b>${product.price} ₴</b></p>
            <button onclick='addToCart(${JSON.stringify(product)})'>
                Add to cart
            </button>
        `;

        container.appendChild(div);
    });
}

function addToCart(product) {
    cart.push(product);
    total += product.price;

    document.getElementById("cartEmpty").style.display = "none";

    const cartItems = document.getElementById("cartItems");

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "10px";
    li.style.marginBottom = "8px";

    li.innerHTML = `
        <img src="${product.photo_url}" width="40" height="40" style="object-fit:contain;border-radius:5px;">
        <div>
            <div>${product.name}</div>
            <small>${product.price} ₴</small>
        </div>
        <button class="remove-btn">❌</button>
    `;

    cartItems.appendChild(li);

    // Обробник видалення
    li.querySelector(".remove-btn").addEventListener("click", () => {
        cartItems.removeChild(li);      // видаляємо з DOM
        cart = cart.filter(p => p !== product); // видаляємо з масиву
        total -= product.price;
        document.getElementById("totalPrice").textContent = total;

        if(cart.length === 0) {
            document.getElementById("cartEmpty").style.display = "block";
        }
    });

    document.getElementById("totalPrice").textContent = total;
}

function toggleCart() {
    const cartBox = document.getElementById("cartBox");
    cartBox.style.display =
        cartBox.style.display === "block" ? "none" : "block";
}

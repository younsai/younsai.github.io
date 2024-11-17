// Fetch the cart data from localStorage
const cart = getCart();

// Function to render cart items
const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div>
                    <h2>${item.name}</h2>
                    <p>Price: ${item.price.toFixed(2)} MAD</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    attachRemoveListeners();
};

// Function to render the total price
const renderCartTotal = () => {
    const cartTotalContainer = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartTotalContainer.innerHTML = `
        <h2>Total: ${total.toFixed(2)} MAD</h2>
    `;
};

// Function to attach "Remove" button listeners
const attachRemoveListeners = () => {
    document.querySelectorAll('.remove-item').forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.name;
            removeFromCart(itemName);
        });
    });
};

// Function to remove an item from the cart
const removeFromCart = (name) => {
    const updatedCart = cart.filter((item) => item.name !== name);
    saveCart(updatedCart);
    location.reload();
};

// Initial render of cart items and total
renderCartItems();
renderCartTotal();

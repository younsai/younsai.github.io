// Utility to get the cart from localStorage or initialize an empty one
const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

// Utility to save the cart to localStorage
const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

// Function to update the cart item count in the navigation
const updateCartNav = () => {
    const cart = getCart();
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    const navLinks = document.querySelector('.navbar-links');
    const existingCartLink = document.querySelector('.cart-link');

    // If there are no items, remove the cart link if it exists
    if (cartItemCount === 0) {
        if (existingCartLink) {
            existingCartLink.remove();
        }
        return;
    }

    // If items exist, add or update the cart link
    if (!existingCartLink) {
        const cartLink = document.createElement('li');
        cartLink.classList.add('cart-link');
        cartLink.innerHTML = `<a href="/public/cart.html">Cart (${cartItemCount})</a>`;
        navLinks.appendChild(cartLink);
    } else {
        existingCartLink.querySelector('a').textContent = `Cart (${cartItemCount})`;
    }
};

// Function to add a product to the cart
const addToCart = (product) => {
    let cart = getCart();
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart(cart);
    updateCartNav(); // Update the cart navigation
    alert(`${product.name} has been added to your cart!`);
};

// Attach event listeners to all "Buy Now" buttons
document.querySelectorAll('.buy-now').forEach((button) => {
    button.addEventListener('click', () => {
        const product = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,
        };

        addToCart(product);
    });
});

// Initial setup to update the cart nav on page load
document.addEventListener('DOMContentLoaded', updateCartNav);

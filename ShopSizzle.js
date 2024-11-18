let cart = {
    Rose:{ price: 25, quantity: 0 },
    Cactus:{ price: 35, quantity: 0 },
    Jhumar:{ price: 40, quantity: 0 },
    ChocolateBox:{ price: 400, quantity: 0 },
    HangingBells:{ price: 150, quantity: 0 },
    total: 0
};

// Add to Cart
function addToCart(product, price) {
    cart[product].quantity++;
    cart.total += price;
    document.getElementById('cartCount').innerText = cart.Rose.quantity + cart.Cactus.quantity + 
    cart.Jhumar.quantity + cart.ChocolateBox.quantity + cart.HangingBells.quantity;
    updateCartDisplay();
}

// Increase Quantity
function increaseQuantity(product) {
    cart[product].quantity++;
    cart.total += cart[product].price;
    updateCartDisplay();
}

// Decrease Quantity
function decreaseQuantity(product) {
    if (cart[product].quantity > 0) {
        cart[product].quantity--;
        cart.total -= cart[product].price;
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    // Display items in cart
    for (let product in cart) {
        if (cart[product].quantity > 0 && product !== 'total') {
            cartItems.innerHTML += `
                <li>
                    ${product} x${cart[product].quantity} - ₹${cart[product].price * cart[product].quantity} 
                    <button onclick="increaseQuantity('${product}')">+</button>
                    <button onclick="decreaseQuantity('${product}')">-</button>
                </li>
            `;
        }
    }


    // Update total price
    document.getElementById('cartTotal').innerText = `Total: ₹${cart.total}`;
}


document.getElementById('buyNowBtn').addEventListener('click', function() {

    // Start building the email body with "Order Summary" and a line break
    let emailBody = "Order Summary:-%0D%0A%0D%0A";
    
    // Loop through each product in the cart and add each product's details with line breaks
    for (let product in cart) {
        if (cart[product].quantity > 0 && product !== 'total') {
            emailBody += `${product}: x${cart[product].quantity} - ₹${cart[product].price * cart[product].quantity}%0D%0A`;
        }
    }
    	
    // Add the total amount and a thank-you message, each on a new line
    emailBody += `%0D%0A Total: ₹${cart.total}%0D%0A%0D%0AEnter Your Delivery Address Below :- %0D%0A%0D%0A%0D%0A%0D%0A
Thank you for your purchase!`;

    // Update the cart total in the HTML, if needed
    document.getElementById('cartTotal').innerHTML = `<strong>Total: ₹${cart.total}</strong>`;

    // Encode the subject line for special characters
    let subject = encodeURIComponent("ShopSizzle Order Confirmation");

    // Open Gmail with the pre-filled subject and body
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=subhendu.contemsys11@gmail.com&su=${subject}&body=${emailBody}`, '_blank');
});


// Modal Toggle - Show Cart
document.getElementById('cartBtn').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'block'; // Show cart when clicking button
});

// Modal Toggle - Close Cart
document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none'; // Hide cart when clicking close
});
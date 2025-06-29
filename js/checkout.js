function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Empty Cart', 'Please add items to your cart before checkout', 'error');
        return;
    }
    
    document.getElementById('cartModal').classList.remove('active');
    document.getElementById('checkoutModal').classList.add('active');
    renderCheckoutItems();
    updateCartTotals();
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function backToCart() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('cartModal').classList.add('active');
}

function renderCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    checkoutItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'checkout-item';
        
        div.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        
        checkoutItemsContainer.appendChild(div);
    });
}

function placeOrder() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (!customerName || !customerPhone) {
        showToast('Missing Information', 'Please fill in all required fields', 'error');
        return;
    }
    
    const orderId = '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.1;
    
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmationTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('confirmationPayment').textContent = getPaymentMethodName(paymentMethod);
    
    document.getElementById('checkoutModal').classList.remove('active');
    document.getElementById('confirmationModal').classList.add('active');
    
    cart = [];
    updateCartDisplay();
    
    showToast('Order Placed!', 'Your order has been successfully placed', 'success');
}

function getPaymentMethodName(method) {
    const methods = {
        'credit': 'Credit Card',
        'debit': 'Debit Card',
        'cash': 'Cash Payment'
    };
    return methods[method] || 'Unknown';
}

function continueShopping() {
    document.getElementById('confirmationModal').classList.remove('active');
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('tableNumber').value = '';
    document.querySelector('input[name="payment"]').checked = true;
}
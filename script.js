// Menu data
const menuData = {
    items: [
        {
            id: '1',
            name: 'Caesar Salad',
            description: 'Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing',
            price: 12.99,
            category: 'Starters',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
            isSpecial: false,
            isPopular: true
        },
        {
            id: '2',
            name: 'Grilled Salmon',
            description: 'Atlantic salmon grilled to perfection with seasonal vegetables and lemon butter sauce',
            price: 24.99,
            category: 'Main Courses',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
            isSpecial: true,
            isPopular: true
        },
        {
            id: '3',
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
            price: 8.99,
            category: 'Desserts',
            image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
            isSpecial: false,
            isPopular: true
        },
        {
            id: '4',
            name: 'Craft Beer Selection',
            description: 'Local craft beers on tap - ask your server for today\'s selection',
            price: 6.99,
            category: 'Beverages',
            image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop',
            isSpecial: false,
            isPopular: false
        },
        {
            id: '5',
            name: 'Truffle Pasta',
            description: 'Homemade pasta with truffle cream sauce and wild mushrooms',
            price: 18.99,
            category: 'Main Courses',
            isSpecial: true,
            isPopular: false
        },
        {
            id: '6',
            name: 'Bruschetta Trio',
            description: 'Three varieties of bruschetta with fresh tomatoes, ricotta, and tapenade',
            price: 9.99,
            category: 'Starters',
            isSpecial: false,
            isPopular: true
        }
    ]
};

// User credentials
const users = {
    'admin@restaurant.com': { password: 'admin123', role: 'admin', name: 'Admin' },
    'customer@example.com': { password: 'customer123', role: 'customer', name: 'Customer' }
};

// Application state
let currentUser = null;
let cart = [];
let currentCategory = 'all';
let searchQuery = '';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    showPage('login');
});

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout buttons
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('adminLogoutBtn').addEventListener('click', handleLogout);
    
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Category tabs
    document.getElementById('categoryTabs').addEventListener('click', handleCategoryChange);
    
    // Cart
    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartModal);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);
    
    // Checkout
    document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckoutModal);
    document.getElementById('backToCartBtn').addEventListener('click', backToCart);
    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
    
    // Confirmation
    document.getElementById('continueShoppingBtn').addEventListener('click', continueShopping);
    
    // Admin panel
    document.getElementById('addItemBtn').addEventListener('click', showAddItemForm);
    document.getElementById('cancelAddBtn').addEventListener('click', hideAddItemForm);
    document.getElementById('menuItemForm').addEventListener('submit', addMenuItem);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btnText = document.querySelector('.btn-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    // Show loading state
    btnText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    
    setTimeout(() => {
        if (users[email] && users[email].password === password) {
            currentUser = users[email];
            
            if (currentUser.role === 'admin') {
                document.getElementById('adminName').textContent = currentUser.name;
                showPage('admin');
                renderAdminMenu();
            } else {
                document.getElementById('userName').textContent = currentUser.name;
                showPage('menu');
                renderMenu();
            }
            
            showToast('Login Successful', 'Welcome back!', 'success');
        } else {
            showToast('Login Failed', 'Invalid email or password', 'error');
        }
        
        // Hide loading state
        btnText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
    }, 1000);
}

function handleLogout() {
    currentUser = null;
    cart = [];
    updateCartDisplay();
    showPage('login');
    document.getElementById('loginForm').reset();
    showToast('Logged Out', 'See you next time!', 'info');
}

function handleSearch(event) {
    searchQuery = event.target.value.toLowerCase();
    renderMenu();
}

function handleCategoryChange(event) {
    if (event.target.classList.contains('tab-btn')) {
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        
        event.target.classList.add('active');
        currentCategory = event.target.dataset.category;
        renderMenu();
    }
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    if (page === 'login') {
        document.getElementById('loginPage').classList.add('active');
    } else if (page === 'menu') {
        document.getElementById('menuPage').classList.add('active');
    } else if (page === 'admin') {
        document.getElementById('adminPage').classList.add('active');
    }
}

function renderMenu() {
    renderFeaturedItems();
    renderMenuGrid();
    updateCartDisplay();
}

function renderFeaturedItems() {
    const specials = menuData.items.filter(item => item.isSpecial);
    const popular = menuData.items.filter(item => item.isPopular);
    
    if (searchQuery) {
        document.getElementById('featuredSection').style.display = 'none';
        return;
    } else {
        document.getElementById('featuredSection').style.display = 'block';
    }
    
    renderFeaturedSection('specialItems', specials, 'special');
    renderFeaturedSection('popularItems', popular, 'popular');
}

function renderFeaturedSection(containerId, items, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'featured-item';
        itemElement.innerHTML = `
            <div class="item-header">
                <h4 class="item-name">${item.name}</h4>
                <div class="item-badges">
                    <span class="badge ${type}">${type === 'special' ? 'Special' : 'Popular'}</span>
                </div>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-footer">
                <span class="item-price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
                    <i class="fas fa-plus"></i> Add to Cart
                </button>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

function renderMenuGrid() {
    let filteredItems = menuData.items;
    
    if (searchQuery) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery)
        );
    }
    
    if (currentCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === currentCategory);
    }
    
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-items">
                <div class="no-items-icon">🔍</div>
                <p>No delicious dishes found</p>
                <p>Try adjusting your search or browse our categories</p>
            </div>
        `;
        return;
    }
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        const imageContent = item.image 
            ? `<img src="${item.image}" alt="${item.name}">`
            : '<div class="placeholder-image">🍽️</div>';
        
        itemElement.innerHTML = `
            <div class="item-image">
                ${imageContent}
            </div>
            <div class="item-content">
                <span class="item-category">${item.category}</span>
                <div class="item-header">
                    <h3 class="item-name">${item.name}</h3>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-footer">
                    <div class="item-badges">
                        ${item.isSpecial ? '<span class="badge special">Special</span>' : ''}
                        ${item.isPopular ? '<span class="badge popular">Popular</span>' : ''}
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(itemElement);
    });
}

function addToCart(itemId) {
    const item = menuData.items.find(i => i.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartDisplay();
    showToast('Added to Cart', `${item.name} has been added to your cart`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    renderCartItems();
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartDisplay();
        renderCartItems();
    }
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function openCartModal() {
    document.getElementById('cartModal').classList.add('active');
    renderCartItems();
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        updateCartTotals();
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(div);
    });
    
    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    const checkoutTotal = document.getElementById('checkoutTotal');
    if (checkoutTotal) {
        checkoutTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    renderCartItems();
    showToast('Cart Cleared', 'All items have been removed from your cart', 'info');
}

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

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Admin Panel Functions
function renderAdminMenu() {
    const adminMenuGrid = document.getElementById('adminMenuGrid');
    adminMenuGrid.innerHTML = '';
    
    menuData.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'admin-item';
        
        const imageContent = item.image 
            ? `<img src="${item.image}" alt="${item.name}">`
            : '<div class="placeholder-image">🍽️</div>';
        
        itemElement.innerHTML = `
            <div class="admin-item-image">
                ${imageContent}
            </div>
            <div class="admin-item-content">
                <div class="admin-item-header">
                    <h3 class="item-name">${item.name}</h3>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-info">
                    <span class="item-category">${item.category}</span>
                    <div class="item-badges">
                        ${item.isSpecial ? '<span class="badge special">Special</span>' : ''}
                        ${item.isPopular ? '<span class="badge popular">Popular</span>' : ''}
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-edit" onclick="editItem('${item.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteItem('${item.id}')">Delete</button>
                </div>
            </div>
        `;
        
        adminMenuGrid.appendChild(itemElement);
    });
}

function showAddItemForm() {
    document.getElementById('addItemForm').style.display = 'block';
}

function hideAddItemForm() {
    document.getElementById('addItemForm').style.display = 'none';
    document.getElementById('menuItemForm').reset();
}

function addMenuItem(event) {
    event.preventDefault();
    
    const newItem = {
        id: Date.now().toString(),
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        price: parseFloat(document.getElementById('itemPrice').value),
        category: document.getElementById('itemCategory').value,
        image: document.getElementById('itemImage').value,
        isSpecial: document.getElementById('isSpecial').checked,
        isPopular: document.getElementById('isPopular').checked
    };
    
    menuData.items.push(newItem);
    renderAdminMenu();
    hideAddItemForm();
    showToast('Item Added', 'Menu item has been added successfully', 'success');
}

function editItem(itemId) {
    const item = menuData.items.find(i => i.id === itemId);
    if (!item) return;
    
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemCategory').value = item.category;
    document.getElementById('itemImage').value = item.image || '';
    document.getElementById('isSpecial').checked = item.isSpecial;
    document.getElementById('isPopular').checked = item.isPopular;
    
    showAddItemForm();
    
    // Remove the old item and add the edited one
    deleteItem(itemId);
}

function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuData.items = menuData.items.filter(item => item.id !== itemId);
        renderAdminMenu();
        showToast('Item Deleted', 'Menu item has been deleted', 'info');
    }
}

function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    const typeColors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    toast.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 0.75rem;">
            <div style="color: ${typeColors[type]}; font-size: 1.25rem;">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #1f2937; margin-bottom: 0.25rem;">${title}</div>
                <div style="color: #6b7280; font-size: 0.875rem;">${message}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #6b7280; cursor: pointer; font-size: 1.125rem; padding: 0; line-height: 1;">×</button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Add CSS for toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
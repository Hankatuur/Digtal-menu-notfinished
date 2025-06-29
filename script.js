

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








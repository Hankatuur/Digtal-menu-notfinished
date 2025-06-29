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
            name: 'Mango Selection',
            description: 'Natural Mango Juice on tap - ask your server for today\'s selection',
            price: 6.99,
            category: 'Beverages',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR3mm9TXP4Uec9jl7x0dpPkSoX8RC_1ur4YA&s',
            isSpecial: false,
            isPopular: false
        },
        {
            id: '5',
            name: 'Truffle Pasta',
            description: 'Homemade pasta with truffle cream sauce and wild mushrooms',
            price: 18.99,
            category: 'Main Courses',
            image:'https://www.sweetteaandthyme.com/wp-content/uploads/2024/02/truffle-mushroom-pasta-close-up.jpg',
            isSpecial: true,
            isPopular: false
        },
        {
            id: '6',
            name: 'Bruschetta Trio',
            description: 'Three varieties of bruschetta with fresh tomatoes, ricotta, and tapenade',
            price: 9.99,
            category: 'Starters',
            image:"https://www.supervalu.co.uk/wp-content/uploads/2018/05/Bruschetta.jpg",
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
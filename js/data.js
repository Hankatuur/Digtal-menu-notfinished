// Renders the entire menu view (featured + grid + cart count)
function renderMenu() {
  renderFeaturedItems();
  renderMenuGrid();
  updateCartDisplay();
}

// Handles user search input
function handleSearch(event) {
  searchQuery = event.target.value.toLowerCase();
  renderMenu();
}

// Renders special and popular items in their respective sections
function renderFeaturedItems() {
  const specials = menuData.items.filter(item => item.isSpecial);
  const popular = menuData.items.filter(item => item.isPopular);

  const featuredSection = document.getElementById('featuredSection');
  if (searchQuery) {
    featuredSection.style.display = 'none';
    return;
  } else {
    featuredSection.style.display = 'block';
  }

  renderFeaturedSection('specialItems', specials, 'special');
  renderFeaturedSection('popularItems', popular, 'popular');
}

// Renders one section (special or popular)
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

// Renders the main menu grid with search + category filtering
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
      : `<div class="placeholder-image">🍽</div>`;

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

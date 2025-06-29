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
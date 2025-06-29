function showPage(page) { document.querySelectorAll('.page').forEach(p => 
    { p.classList.remove('active'); });

if (page === 'login') { document.getElementById('loginPage').classList.add('active'); } 

else if (page === 'menu') { document.getElementById('menuPage').classList.add('active'); } 
else if (page === 'admin') { document.getElementById('adminPage').classList.add('active'); } }

function renderMenu() { renderFeaturedItems(); renderMenuGrid(); updateCartDisplay(); }

function renderFeaturedItems() { 
    const specials = menuData.items.filter(item => item.isSpecial); 
    const popular = menuData.items.filter(item => item.isPopular);

if (searchQuery) { document.getElementById('featuredSection').style.display = 'none'; return; } else { document.getElementById('featuredSection').style.display = 'block'; }

renderFeaturedSection('specialItems', specials, 'special'); 
renderFeaturedSection('popularItems', popular, 'popular'); }

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
// =============================================================================
// MAIN JAVASCRIPT - RECOVERSUPS
// =============================================================================

// IIFE para evitar conflictos de namespace (Shopify 2025)
(function() {
  'use strict';

  // -----------------------------------------------------------------------------
  // INICIALIZACIÓN
  // -----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Recoversups Theme Initialized');
    
    // Inicializar componentes base
    initializeGlobalComponents();
    
    // Inicializar eventos globales
    initializeGlobalEvents();
  });

  // -----------------------------------------------------------------------------
  // COMPONENTES GLOBALES
  // -----------------------------------------------------------------------------
  function initializeGlobalComponents() {
    initializeMobileMenu();
    initializeSearchToggle();
    initializeCartDrawer();
    initializeWishlist();
    console.log('Global components initialized');
  }

  // -----------------------------------------------------------------------------
  // MOBILE MENU TOGGLE
  // -----------------------------------------------------------------------------
  function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('is-open');
      
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
    
    function openMobileMenu() {
      mobileMenu.classList.add('is-open');
      mobileMenuToggle.classList.add('is-active');
      body.classList.add('mobile-menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      
      // Animar hamburger lines
      const hamburgerLines = mobileMenuToggle.querySelectorAll('.hamburger-line');
      hamburgerLines.forEach((line, index) => {
        if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) line.style.opacity = '0';
        if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
      });
    }
    
    function closeMobileMenu() {
      mobileMenu.classList.remove('is-open');
      mobileMenuToggle.classList.remove('is-active');
      body.classList.remove('mobile-menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      
      // Resetear hamburger lines
      const hamburgerLines = mobileMenuToggle.querySelectorAll('.hamburger-line');
      hamburgerLines.forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  }

  // -----------------------------------------------------------------------------
  // SEARCH TOGGLE
  // -----------------------------------------------------------------------------
  function initializeSearchToggle() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    if (!searchToggle || !searchBar) return;
    
    searchToggle.addEventListener('click', function() {
      const isOpen = searchBar.classList.contains('is-open');
      
      if (isOpen) {
        searchBar.classList.remove('is-open');
        searchToggle.setAttribute('aria-expanded', 'false');
      } else {
        searchBar.classList.add('is-open');
        searchToggle.setAttribute('aria-expanded', 'true');
        
        // Focus en el input de búsqueda
        const searchInput = searchBar.querySelector('.search-input');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 100);
        }
      }
    });
  }

  // -----------------------------------------------------------------------------
  // CART DRAWER
  // -----------------------------------------------------------------------------
  function initializeCartDrawer() {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartLinks = document.querySelectorAll('.cart-link');
    const cartCloseElements = document.querySelectorAll('[data-cart-drawer-close]');
    const body = document.body;
    
    if (!cartDrawer) return;
    
    // Open cart drawer when clicking cart links
    cartLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        openCartDrawer();
      });
    });
    
    // Close cart drawer
    cartCloseElements.forEach(element => {
      element.addEventListener('click', closeCartDrawer);
    });
    
    // Initialize cart functionality
    initializeCartFunctionality();
    
    function openCartDrawer() {
      cartDrawer.classList.add('is-open');
      body.classList.add('cart-drawer-open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      
      // Focus on close button for accessibility
      const closeBtn = cartDrawer.querySelector('.cart-drawer-close');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
      }
    }
    
    function closeCartDrawer() {
      cartDrawer.classList.remove('is-open');
      body.classList.remove('cart-drawer-open');
      cartDrawer.setAttribute('aria-hidden', 'true');
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && cartDrawer.classList.contains('is-open')) {
        closeCartDrawer();
      }
    });
  }

  // -----------------------------------------------------------------------------
  // CART FUNCTIONALITY
  // -----------------------------------------------------------------------------
  function initializeCartFunctionality() {
    // Quantity change buttons
    document.addEventListener('click', function(e) {
      if (e.target.closest('[data-cart-change]')) {
        const button = e.target.closest('[data-cart-change]');
        const key = button.dataset.cartChange;
        const quantity = parseInt(button.dataset.quantity);
        
        updateCartQuantity(key, quantity);
      }
      
      if (e.target.closest('[data-cart-remove]')) {
        const button = e.target.closest('[data-cart-remove]');
        const key = button.dataset.cartRemove;
        
        removeCartItem(key);
      }
    });
  }

  // Update cart quantity
  function updateCartQuantity(key, quantity) {
    showCartLoading();
    
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        id: key,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(cart => {
      updateCartDrawer(cart);
      updateCartCount(cart.item_count);
    })
    .catch(error => {
      console.error('Error updating cart:', error);
      showCartError('Error al actualizar el carrito');
    })
    .finally(() => {
      hideCartLoading();
    });
  }

  // Remove cart item
  function removeCartItem(key) {
    showCartLoading();
    
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        id: key,
        quantity: 0
      })
    })
    .then(response => response.json())
    .then(cart => {
      updateCartDrawer(cart);
      updateCartCount(cart.item_count);
    })
    .catch(error => {
      console.error('Error removing item:', error);
      showCartError('Error al eliminar el producto');
    })
    .finally(() => {
      hideCartLoading();
    });
  }

  // Update cart drawer content
  function updateCartDrawer(cart) {
    const cartDrawer = document.getElementById('cart-drawer');
    if (!cartDrawer) return;
    
    // If cart is empty, reload the page to show empty state
    if (cart.item_count === 0) {
      window.location.reload();
      return;
    }
    
    // Update item count
    const itemCount = cartDrawer.querySelector('.cart-item-count');
    if (itemCount) {
      itemCount.textContent = `(${cart.item_count})`;
    }
    
    // Update subtotal
    const subtotalValue = cartDrawer.querySelector('.subtotal-value');
    if (subtotalValue) {
      subtotalValue.textContent = window.RecoverSups.utils.formatMoney(cart.total_price);
    }
  }

  // Update cart count in header
  function updateCartCount(count) {
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(element => {
      element.textContent = count;
    });
  }

  // Show cart loading
  function showCartLoading() {
    const loadingOverlay = document.querySelector('.cart-drawer-loading');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
  }

  // Hide cart loading
  function hideCartLoading() {
    const loadingOverlay = document.querySelector('.cart-drawer-loading');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  }

  // Show cart error
  function showCartError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'cart-error-toast';
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #e74c3c;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 6px;
      z-index: 10000;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  // Add to cart functionality (global)
  window.RecoverSups.addToCart = function(formData) {
    showCartLoading();
    
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(item => {
      // Get updated cart
      return fetch('/cart.js');
    })
    .then(response => response.json())
    .then(cart => {
      updateCartDrawer(cart);
      updateCartCount(cart.item_count);
      
      // Open cart drawer
      const cartDrawer = document.getElementById('cart-drawer');
      if (cartDrawer) {
        cartDrawer.classList.add('is-open');
        document.body.classList.add('cart-drawer-open');
        cartDrawer.setAttribute('aria-hidden', 'false');
      }
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      showCartError('Error al agregar al carrito');
    })
    .finally(() => {
      hideCartLoading();
    });
  };

  // -----------------------------------------------------------------------------
  // WISHLIST FUNCTIONALITY
  // -----------------------------------------------------------------------------
  function initializeWishlist() {
    // Exponer función global de wishlist
    window.RecoverSups.Wishlist = {
      toggle: toggleWishlist,
      add: addToWishlist,
      remove: removeFromWishlist,
      get: getWishlist,
      count: getWishlistCount,
      init: initWishlistButtons
    };
    
    // Inicializar botones de wishlist
    initWishlistButtons();
  }

  function toggleWishlist(productId, productHandle, button) {
    const isActive = button ? button.classList.contains('active') : false;
    
    if (isActive) {
      removeFromWishlist(productId, button);
    } else {
      addToWishlist(productId, productHandle, button);
    }
  }

  function addToWishlist(productId, productHandle, button) {
    const wishlist = getWishlist();
    const product = {
      id: parseInt(productId),
      handle: productHandle,
      added_at: new Date().toISOString()
    };
    
    // Verificar si ya existe
    if (!wishlist.find(item => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem('recoversups_wishlist', JSON.stringify(wishlist));
      
      // Actualizar UI
      if (button) {
        button.classList.add('active');
        updateTooltip(button, 'remove');
      }
      
      updateWishlistCount();
      showWishlistNotification('Producto agregado a la lista de deseos', 'add');
    }
  }

  function removeFromWishlist(productId, button) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('recoversups_wishlist', JSON.stringify(wishlist));
    
    // Actualizar UI
    if (button) {
      button.classList.remove('active');
      updateTooltip(button, 'add');
    }
    
    updateWishlistCount();
    showWishlistNotification('Producto removido de la lista de deseos', 'remove');
  }

  function getWishlist() {
    return JSON.parse(localStorage.getItem('recoversups_wishlist') || '[]');
  }

  function getWishlistCount() {
    return getWishlist().length;
  }

  function updateWishlistCount() {
    const count = getWishlistCount();
    const countElements = document.querySelectorAll('.wishlist-count');
    
    countElements.forEach(element => {
      element.textContent = count;
      element.style.display = count > 0 ? 'block' : 'none';
    });
  }

  function updateTooltip(button, action) {
    const tooltip = button.querySelector('.tooltip-text');
    if (tooltip) {
      tooltip.textContent = action === 'add' ? 
        'Agregar a lista de deseos' : 
        'Quitar de lista de deseos';
    }
  }

  function showWishlistNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `wishlist-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${type === 'add' ? 
            '<path d="M20.84,4.61a5.5,5.5 0,0 0,-7.78 0L12,5.67 10.94,4.61a5.5,5.5 0,0 0,-7.78 7.78l1.06,1.06L12,21.23l7.78,-7.78 1.06,-1.06a5.5,5.5 0,0 0,0 -7.78z"></path>' :
            '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
          }
        </svg>
        <span>${message}</span>
      </div>
      <button class="notification-close" onclick="this.parentElement.remove()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }

  function initWishlistButtons() {
    const wishlist = getWishlist();
    const wishlistIds = wishlist.map(item => item.id);
    
    // Marcar botones activos
    document.querySelectorAll('.wishlist-btn').forEach(button => {
      const productId = parseInt(button.dataset.productId);
      if (wishlistIds.includes(productId)) {
        button.classList.add('active');
        updateTooltip(button, 'remove');
      }
    });
    
    // Actualizar contador
    updateWishlistCount();
  }

  // Exponer función global para compatibilidad
  window.toggleWishlist = function(productId, productHandle, button) {
    toggleWishlist(productId, productHandle, button);
  };

  // -----------------------------------------------------------------------------
  // EVENTOS GLOBALES
  // -----------------------------------------------------------------------------
  function initializeGlobalEvents() {
    // Aquí se inicializarán los eventos globales
    console.log('Global events initialized');
  }

  // -----------------------------------------------------------------------------
  // UTILIDADES GLOBALES
  // -----------------------------------------------------------------------------
  window.RecoverSups = {
    version: '1.0.0',
    theme: 'recoversups-theme',
    
    // Utility functions disponibles globalmente
    utils: {
      formatMoney: function(cents) {
        return 'S/ ' + (cents / 100).toFixed(2);
      },
      
      debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
    }
  };

})();
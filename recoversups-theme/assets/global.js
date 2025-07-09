// =============================================================================
// GLOBAL JAVASCRIPT - RECOVERSUPS
// =============================================================================

// IIFE para evitar conflictos de namespace (Shopify 2025)
(function() {
  'use strict';

  // INICIALIZACIÓN
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Recoversups Theme Initialized');
    initializeComponents();
  });

  // COMPONENTES GLOBALES
  function initializeComponents() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('is-open');
        this.classList.toggle('is-active');
      });
    }

    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchToggle && searchBar) {
      searchToggle.addEventListener('click', function() {
        searchBar.classList.toggle('is-open');
      });
    }
  }

  // UTILIDADES GLOBALES
  window.RecoverSups = {
    version: '1.0.0',
    
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
      },
      
      addClass: function(element, className) {
        if (element) element.classList.add(className);
      },
      
      removeClass: function(element, className) {
        if (element) element.classList.remove(className);
      },
      
      toggleClass: function(element, className) {
        if (element) element.classList.toggle(className);
      }
    }
  };

})();
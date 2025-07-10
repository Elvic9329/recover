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
    // Aquí se inicializarán los componentes globales
    console.log('Global components initialized');
  }

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
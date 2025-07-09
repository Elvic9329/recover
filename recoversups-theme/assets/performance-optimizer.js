/*!
 * Performance Optimizer - Recoversups
 * Sistema de optimización de rendimiento con IIFEs
 * Minified and optimized for production
 */

(function(window, document) {
  'use strict';
  
  // Namespace para evitar conflictos
  const RecoverSups = window.RecoverSups || {};
  
  // Configuración de performance
  const CONFIG = {
    imageOptimization: {
      lazyThreshold: 50,
      webpSupport: null,
      retryAttempts: 3
    },
    criticalResources: {
      fonts: ['Inter', 'Poppins'],
      criticalCSS: true
    },
    analytics: {
      enabled: true,
      events: ['page_view', 'purchase', 'add_to_cart']
    }
  };
  
  // Utilidades de performance
  const PerformanceUtils = (function() {
    let webpSupport = null;
    let intersectionObserver = null;
    
    return {
      // Detectar soporte WebP
      checkWebPSupport: function() {
        if (webpSupport !== null) return Promise.resolve(webpSupport);
        
        return new Promise((resolve) => {
          const webP = new Image();
          webP.onload = webP.onerror = function() {
            webpSupport = webP.height === 2;
            resolve(webpSupport);
          };
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
      },
      
      // Crear Intersection Observer optimizado
      createIntersectionObserver: function(callback, options = {}) {
        if (!('IntersectionObserver' in window)) {
          return null;
        }
        
        const defaultOptions = {
          root: null,
          rootMargin: '50px 0px',
          threshold: [0, 0.1, 0.5, 1]
        };
        
        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
      },
      
      // Debounce optimizado
      debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
          const context = this;
          const args = arguments;
          const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      },
      
      // Throttle optimizado
      throttle: function(func, limit) {
        let inThrottle;
        return function() {
          const args = arguments;
          const context = this;
          if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
          }
        };
      },
      
      // Precargar recursos críticos
      preloadResource: function(href, as, type) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        document.head.appendChild(link);
      },
      
      // Lazy loading optimizado
      lazyLoad: function(elements, callback) {
        const observer = this.createIntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              callback(entry.target);
              observer.unobserve(entry.target);
            }
          });
        });
        
        if (observer) {
          elements.forEach(el => observer.observe(el));
        } else {
          // Fallback para navegadores antiguos
          elements.forEach(callback);
        }
      }
    };
  })();
  
  // Optimizador de imágenes
  const ImageOptimizer = (function() {
    let webpSupported = false;
    
    return {
      init: function() {
        PerformanceUtils.checkWebPSupport().then(supported => {
          webpSupported = supported;
          this.optimizeImages();
        });
      },
      
      optimizeImages: function() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        PerformanceUtils.lazyLoad(images, (img) => {
          this.loadImage(img);
        });
      },
      
      loadImage: function(img) {
        const container = img.closest('.image-optimized, .product-image-optimized');
        if (container) container.classList.add('loading');
        
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          if (container) container.classList.remove('loading');
        });
        
        img.addEventListener('error', () => {
          this.handleImageError(img);
        });
      },
      
      handleImageError: function(img) {
        let retryCount = parseInt(img.dataset.retryCount || '0');
        
        if (retryCount < CONFIG.imageOptimization.retryAttempts) {
          img.dataset.retryCount = retryCount + 1;
          setTimeout(() => {
            img.src = img.src + '?retry=' + retryCount;
          }, 1000 * retryCount);
        } else {
          // Mostrar placeholder de error
          this.showImagePlaceholder(img);
        }
      },
      
      showImagePlaceholder: function(img) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-error-placeholder';
        placeholder.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21,15 16,10 5,21"></polyline>
          </svg>
          <span>Error al cargar imagen</span>
        `;
        
        img.parentNode.replaceChild(placeholder, img);
      }
    };
  })();
  
  // Optimizador de CSS crítico
  const CriticalCSS = (function() {
    return {
      init: function() {
        this.loadNonCriticalCSS();
        this.optimizeFonts();
      },
      
      loadNonCriticalCSS: function() {
        const nonCriticalCSS = document.querySelectorAll('link[rel="preload"][as="style"]');
        
        nonCriticalCSS.forEach(link => {
          link.addEventListener('load', () => {
            link.rel = 'stylesheet';
          });
        });
      },
      
      optimizeFonts: function() {
        // Precargar fuentes críticas
        CONFIG.criticalResources.fonts.forEach(font => {
          const fontUrl = this.getFontUrl(font);
          if (fontUrl) {
            PerformanceUtils.preloadResource(fontUrl, 'font', 'font/woff2');
          }
        });
      },
      
      getFontUrl: function(fontName) {
        const fontMap = {
          'Inter': 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
          'Poppins': 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2'
        };
        
        return fontMap[fontName] || null;
      }
    };
  })();
  
  // Optimizador de JavaScript
  const JSOptimizer = (function() {
    const loadedScripts = new Set();
    const scriptQueue = [];
    
    return {
      init: function() {
        this.optimizeEventListeners();
        this.deferNonCriticalScripts();
      },
      
      optimizeEventListeners: function() {
        // Usar event delegation para optimizar listeners
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('scroll', PerformanceUtils.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', PerformanceUtils.debounce(this.handleResize.bind(this), 250));
      },
      
      handleClick: function(e) {
        const target = e.target.closest('[data-action]');
        if (target) {
          const action = target.dataset.action;
          this.executeAction(action, target, e);
        }
      },
      
      handleScroll: function() {
        // Optimizar scroll con RAF
        requestAnimationFrame(() => {
          this.updateScrollPosition();
        });
      },
      
      handleResize: function() {
        // Optimizar resize
        this.updateViewportSize();
      },
      
      executeAction: function(action, element, event) {
        const actions = {
          'toggle-menu': () => this.toggleMenu(element),
          'add-to-cart': () => this.addToCart(element),
          'toggle-wishlist': () => this.toggleWishlist(element),
          'quick-view': () => this.quickView(element)
        };
        
        if (actions[action]) {
          actions[action]();
        }
      },
      
      loadScript: function(src, callback) {
        if (loadedScripts.has(src)) {
          if (callback) callback();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          loadedScripts.add(src);
          if (callback) callback();
        };
        script.onerror = () => {
          console.error(`Failed to load script: ${src}`);
        };
        
        document.head.appendChild(script);
      },
      
      deferNonCriticalScripts: function() {
        // Cargar scripts no críticos después del load
        window.addEventListener('load', () => {
          requestIdleCallback(() => {
            this.loadNonCriticalScripts();
          });
        });
      },
      
      loadNonCriticalScripts: function() {
        const nonCriticalScripts = [
          '/assets/analytics.js',
          '/assets/social-sharing.js',
          '/assets/reviews.js'
        ];
        
        nonCriticalScripts.forEach(src => {
          this.loadScript(src);
        });
      },
      
      updateScrollPosition: function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        document.documentElement.style.setProperty('--scroll-top', scrollTop + 'px');
      },
      
      updateViewportSize: function() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
      }
    };
  })();
  
  // Optimizador de Web Vitals
  const WebVitalsOptimizer = (function() {
    return {
      init: function() {
        this.optimizeLCP();
        this.optimizeFID();
        this.optimizeCLS();
      },
      
      optimizeLCP: function() {
        // Optimizar Largest Contentful Paint
        const heroImages = document.querySelectorAll('.hero-image img, .featured-image img');
        heroImages.forEach(img => {
          img.loading = 'eager';
          img.decoding = 'sync';
        });
        
        // Precargar recursos LCP
        const lcpCandidates = document.querySelectorAll('.hero-section, .featured-product');
        lcpCandidates.forEach(element => {
          const img = element.querySelector('img');
          if (img && img.src) {
            PerformanceUtils.preloadResource(img.src, 'image');
          }
        });
      },
      
      optimizeFID: function() {
        // Optimizar First Input Delay
        this.breakUpLongTasks();
        this.optimizeThirdPartyScripts();
      },
      
      optimizeCLS: function() {
        // Optimizar Cumulative Layout Shift
        this.reserveImageSpace();
        this.optimizeWebFonts();
      },
      
      breakUpLongTasks: function() {
        // Dividir tareas largas usando scheduler
        if ('scheduler' in window && 'postTask' in window.scheduler) {
          window.scheduler.postTask(() => {
            this.processHeavyTasks();
          }, { priority: 'background' });
        } else {
          // Fallback usando setTimeout
          setTimeout(() => {
            this.processHeavyTasks();
          }, 0);
        }
      },
      
      processHeavyTasks: function() {
        // Procesar tareas pesadas de forma asíncrona
        const tasks = [
          () => this.initializeAnalytics(),
          () => this.initializeSocialSharing(),
          () => this.initializeReviews()
        ];
        
        tasks.forEach((task, index) => {
          setTimeout(task, index * 100);
        });
      },
      
      reserveImageSpace: function() {
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
          if (img.naturalWidth && img.naturalHeight) {
            img.setAttribute('width', img.naturalWidth);
            img.setAttribute('height', img.naturalHeight);
          }
        });
      },
      
      optimizeWebFonts: function() {
        // Usar font-display: swap para evitar FOIT
        if ('fonts' in document) {
          CONFIG.criticalResources.fonts.forEach(font => {
            document.fonts.load(`1em ${font}`);
          });
        }
      },
      
      optimizeThirdPartyScripts: function() {
        // Cargar scripts de terceros de forma asíncrona
        const thirdPartyScripts = document.querySelectorAll('script[src*="google"], script[src*="facebook"]');
        thirdPartyScripts.forEach(script => {
          script.async = true;
          script.defer = true;
        });
      }
    };
  })();
  
  // Inicialización principal
  const init = function() {
    // Verificar si el DOM está listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    // Inicializar optimizadores
    ImageOptimizer.init();
    CriticalCSS.init();
    JSOptimizer.init();
    
    // Inicializar Web Vitals después del load
    window.addEventListener('load', () => {
      WebVitalsOptimizer.init();
    });
  };
  
  // Exponer API pública
  RecoverSups.Performance = {
    ImageOptimizer,
    CriticalCSS,
    JSOptimizer,
    WebVitalsOptimizer,
    PerformanceUtils
  };
  
  // Auto-inicialización
  init();
  
  // Exponer al global
  window.RecoverSups = RecoverSups;
  
})(window, document);

// Service Worker para caching (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
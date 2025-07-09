# Maquetación de Páginas y Componentes - Recoversups

## Design System

### Colores
```scss
// Colores principales
$primary-color: #B62921;      // Recover Red
$secondary-color: #2C3E50;    // Dark Blue
$accent-color: #E74C3C;       // Light Red
$warning-color: #F39C12;      // Orange/Yellow
$success-color: #27AE60;      // Green

// Colores de fondo
$background-dark: #1a1a1a;    // Dark Background
$background-light: #ffffff;   // Light Background
$background-gray: #f8f9fa;    // Light Gray

// Colores de texto
$text-primary: #ffffff;       // White Text
$text-secondary: #333333;     // Dark Text
$text-muted: #6c757d;        // Gray Text
```

### Tipografía
```scss
// Font Family
$font-family-primary: 'Montserrat', sans-serif;

// Font Weights
$font-weight-normal: 400;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Font Sizes
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 2rem;      // 32px
$font-size-4xl: 2.5rem;    // 40px
```

### Espaciado
```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
$spacing-2xl: 3rem;     // 48px
$spacing-3xl: 4rem;     // 64px
```

## Página Principal (index.liquid)

### Estructura Optimizada para Conversión
**Orden recomendado implementado para máxima conversión en ecommerce de suplementos:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recoversups - Suplementos Deportivos al Mejor Precio</title>
  
  <!-- Preload fuentes críticas para mejorar FCP -->
  <link rel="preload" href="{{ 'montserrat-regular.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="{{ 'montserrat-semibold.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="{{ 'montserrat-bold.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <!-- 1. Announcement Bar - Ofertas/Envío gratis -->
  {% section 'announcement-bar' %}
  
  <!-- 2. Header - Navegación principal -->
  {% section 'header' %}
  
  <!-- 3. Hero Slider - Múltiples slides con ofertas -->
  {% section 'hero-slider' %}
  
  <!-- 4. Featured Products - Productos destacados -->
  {% section 'featured-products' %}
  
  <!-- 5. Product Categories - Navegación por categorías -->
  {% section 'product-categories' %}
  
  <!-- 6. Brands - Marcas de confianza -->
  {% section 'brands' %}
  
  <!-- 7. Fitness Goals - Objetivos fitness -->
  {% section 'fitness-goals' %}
  
  <!-- 8. Social Proof - Testimonios -->
  {% section 'testimonials' %}
  
  <!-- 9. Newsletter - Captura de leads -->
  {% section 'newsletter' %}
  
  <!-- 10. Footer - Información adicional -->
  {% section 'footer' %}
</body>
</html>
```

### Flujo de Conversión Implementado

**AIDA + Funnel de Conversión:**
- **Atención** → Announcement Bar (ofertas urgentes)
- **Interés** → Hero Slider (productos/ofertas atractivas)
- **Deseo** → Featured Products (productos destacados)
- **Navegación** → Categories + Goals (facilita encontrar productos)
- **Confianza** → Brands + Testimonials (credibilidad social)
- **Acción** → Newsletter (captura para remarketing)

### CSS para Página Principal
```scss
// pages/_home.scss
.hero-banner {
  background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
  padding: $spacing-3xl 0;
  text-align: center;
  color: $text-primary;

  &__title {
    font-size: $font-size-4xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-lg;
  }

  &__subtitle {
    font-size: $font-size-xl;
    margin-bottom: $spacing-xl;
    opacity: 0.9;
  }

  &__cta {
    display: inline-block;
    background: $warning-color;
    color: $text-secondary;
    padding: $spacing-md $spacing-xl;
    border-radius: 50px;
    font-weight: $font-weight-semibold;
    text-decoration: none;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }
}
```

## Página de Producto (product.liquid)

### Estructura HTML (Basada en la referencia visual)
```html
<div class="product-page">
  <div class="container">
    <div class="product-layout">
      <!-- Columna Izquierda: Galería de Imágenes (60%) -->
      <div class="product-gallery">
        <div class="product-gallery__thumbnails">
          {% for image in product.images %}
            <button class="thumbnail" data-image="{{ image | img_url: '600x600' }}">
              <img src="{{ image | img_url: '100x100' }}" alt="{{ image.alt }}">
            </button>
          {% endfor %}
        </div>
        
        <div class="product-gallery__main">
          <div class="main-image">
            <img id="main-product-image" src="{{ product.featured_image | img_url: '600x600' }}" alt="{{ product.title }}">
            <button class="nav-arrow nav-arrow--prev">&lt;</button>
            <button class="nav-arrow nav-arrow--next">&gt;</button>
          </div>
        </div>
        
        <div class="product-gallery__info">
          <p class="size-reference">Height: 180 cm (5'11") | Wearing size M</p>
        </div>
      </div>
      
      <!-- Columna Derecha: Información y Compra (40%) -->
      <div class="product-info">
        <!-- Etiquetas Promocionales -->
        <div class="product-badges">
          {% if product.tags contains 'top-ventas' %}
            <span class="badge badge--top-sales">TOP VENTAS</span>
          {% endif %}
          {% if product.available and product.selected_or_first_available_variant.inventory_quantity <= 5 %}
            <span class="badge badge--low-stock">ÚLTIMAS UNIDADES</span>
          {% endif %}
        </div>
        
        <!-- Nombre y Precio -->
        <div class="product-header">
          <h1 class="product-title">{{ product.title | upcase }}</h1>
          <div class="product-price">
            <span class="price-current">{{ product.price | money }}</span>
            {% if product.compare_at_price > product.price %}
              <span class="price-compare">{{ product.compare_at_price | money }}</span>
            {% endif %}
          </div>
        </div>
        
        <!-- Reviews -->
        <div class="product-rating">
          {% render 'product-rating', product: product %}
          <span class="rating-count">({{ product.metafields.reviews.count | default: 0 }} valoraciones)</span>
        </div>
        
        <!-- Descripción Corta -->
        <div class="product-description">
          {{ product.description | strip_html | truncate: 150 }}
        </div>
        
        <!-- Formulario de Compra -->
        <form class="product-form">
          <!-- Selector de Color -->
          {% if product.options contains 'Color' %}
            <div class="variant-selector">
              <label class="variant-label">SELECCIONA UN COLOR</label>
              <div class="color-swatches">
                {% for value in product.options_by_name['Color'].values %}
                  <input type="radio" name="color" value="{{ value }}" id="color-{{ value | handle }}">
                  <label for="color-{{ value | handle }}" class="color-swatch" style="background-color: {{ value | handle }}"></label>
                {% endfor %}
              </div>
            </div>
          {% endif %}
          
          <!-- Selector de Talla -->
          {% if product.options contains 'Talla' %}
            <div class="variant-selector">
              <label class="variant-label">SELECCIONA UNA TALLA</label>
              <div class="size-buttons">
                {% for value in product.options_by_name['Talla'].values %}
                  <input type="radio" name="size" value="{{ value }}" id="size-{{ value | handle }}">
                  <label for="size-{{ value | handle }}" class="size-button">{{ value }}</label>
                {% endfor %}
              </div>
            </div>
          {% endif %}
          
          <!-- Botones de Acción -->
          <div class="product-actions">
            <button type="submit" class="btn btn-primary btn-add-to-cart">
              AGREGAR AL CARRITO
            </button>
            <button type="button" class="btn btn-secondary btn-shop-pay">
              Buy with Shop Pay
            </button>
          </div>
        </form>
        
        <!-- Información de Pago -->
        <div class="payment-info">
          <p class="installments">Paga en 3 cuotas sin interés de S/{{ product.price | divided_by: 3 | money_without_currency }}</p>
        </div>
        
        <!-- Estimador de Entrega -->
        <div class="delivery-estimator">
          <div class="delivery-steps">
            <div class="step step--completed">
              <div class="step-icon">📦</div>
              <div class="step-label">ORDERED</div>
            </div>
            <div class="step">
              <div class="step-icon">🔄</div>
              <div class="step-label">READY</div>
            </div>
            <div class="step">
              <div class="step-icon">🚚</div>
              <div class="step-label">DELIVERED</div>
            </div>
          </div>
        </div>
        
        <!-- Urgencia -->
        <div class="urgency-message">
          <p>Haz tu pedido en las próximas <strong>12 horas</strong> para recibir tu producto mañana</p>
        </div>
        
        <!-- Iconos de Confianza -->
        <div class="trust-badges">
          <div class="trust-badge">
            <div class="badge-icon">🚚</div>
            <div class="badge-text">ENVÍO GRATUITO</div>
          </div>
          <div class="trust-badge">
            <div class="badge-icon">↩️</div>
            <div class="badge-text">10 DÍAS DE DEVOLUCIÓN</div>
          </div>
          <div class="trust-badge">
            <div class="badge-icon">🔒</div>
            <div class="badge-text">PAGO 100% SEGURO</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### CSS para Página de Producto
```scss
// pages/_product.scss
.product-page {
  background: $background-dark;
  color: $text-primary;
  min-height: 100vh;
  padding: $spacing-xl 0;
}

.product-layout {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: $spacing-2xl;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
}

.product-gallery {
  &__thumbnails {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;
    
    .thumbnail {
      width: 80px;
      height: 80px;
      border: 2px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.3s ease;
      
      &:hover,
      &.active {
        border-color: $primary-color;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  
  &__main {
    position: relative;
    
    .main-image {
      position: relative;
      background: $background-light;
      border-radius: 12px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
      
      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }
      
      &--prev {
        left: $spacing-md;
      }
      
      &--next {
        right: $spacing-md;
      }
    }
  }
  
  &__info {
    margin-top: $spacing-lg;
    
    .size-reference {
      color: $text-muted;
      font-size: $font-size-sm;
    }
  }
}

.product-info {
  padding: $spacing-xl;
}

.product-badges {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  
  .badge {
    padding: $spacing-xs $spacing-sm;
    border-radius: 4px;
    font-size: $font-size-xs;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    
    &--top-sales {
      background: $success-color;
      color: white;
    }
    
    &--low-stock {
      background: $accent-color;
      color: white;
    }
  }
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $spacing-lg;
  
  .product-title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    flex: 1;
    margin-right: $spacing-md;
  }
  
  .product-price {
    text-align: right;
    
    .price-current {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: $primary-color;
    }
    
    .price-compare {
      display: block;
      font-size: $font-size-sm;
      color: $text-muted;
      text-decoration: line-through;
    }
  }
}

.product-rating {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  
  .rating-count {
    color: $text-muted;
    font-size: $font-size-sm;
  }
}

.variant-selector {
  margin-bottom: $spacing-lg;
  
  .variant-label {
    display: block;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    text-transform: uppercase;
  }
  
  .color-swatches {
    display: flex;
    gap: $spacing-sm;
    
    input[type="radio"] {
      display: none;
    }
    
    .color-swatch {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid transparent;
      cursor: pointer;
      transition: border-color 0.3s ease;
      
      &:hover {
        border-color: $text-muted;
      }
    }
    
    input[type="radio"]:checked + .color-swatch {
      border-color: $primary-color;
    }
  }
  
  .size-buttons {
    display: flex;
    gap: $spacing-sm;
    
    input[type="radio"] {
      display: none;
    }
    
    .size-button {
      padding: $spacing-sm $spacing-md;
      border: 2px solid $text-muted;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      min-width: 50px;
      
      &:hover {
        border-color: $primary-color;
      }
    }
    
    input[type="radio"]:checked + .size-button {
      background: $primary-color;
      border-color: $primary-color;
      color: white;
    }
  }
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  
  .btn {
    padding: $spacing-md $spacing-lg;
    border: none;
    border-radius: 8px;
    font-weight: $font-weight-semibold;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &-primary {
      background: $warning-color;
      color: $text-secondary;
      
      &:hover {
        background: darken($warning-color, 10%);
      }
    }
    
    &-secondary {
      background: #6772e5;
      color: white;
      
      &:hover {
        background: darken(#6772e5, 10%);
      }
    }
  }
}

.trust-badges {
  display: flex;
  justify-content: space-between;
  margin-top: $spacing-xl;
  
  .trust-badge {
    text-align: center;
    
    .badge-icon {
      font-size: $font-size-xl;
      margin-bottom: $spacing-xs;
    }
    
    .badge-text {
      font-size: $font-size-xs;
      font-weight: $font-weight-semibold;
      color: $text-muted;
    }
  }
}
```

## Componentes Reutilizables

### Product Card Component
```html
<!-- snippets/product-card.liquid -->
<div class="product-card">
  <div class="product-card__image">
    <a href="{{ product.url }}">
      <img src="{{ product.featured_image | img_url: '300x300' }}" alt="{{ product.title }}" loading="lazy">
    </a>
    {% if product.tags contains 'nuevo' %}
      <span class="product-badge">NUEVO</span>
    {% endif %}
  </div>
  
  <div class="product-card__content">
    <h3 class="product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    
    <div class="product-card__price">
      <span class="price-current">{{ product.price | money }}</span>
      {% if product.compare_at_price > product.price %}
        <span class="price-compare">{{ product.compare_at_price | money }}</span>
      {% endif %}
    </div>
    
    {% render 'product-rating', product: product %}
  </div>
  
  <div class="product-card__actions">
    <button class="btn btn-primary btn-add-to-cart" data-product-id="{{ product.id }}">
      Agregar al Carrito
    </button>
    <button class="btn btn-icon btn-wishlist" data-product-id="{{ product.id }}">
      ❤️
    </button>
  </div>
</div>
```

### Header Component
```html
<!-- sections/header.liquid -->
<header class="site-header">
  <div class="container">
    <div class="header-content">
      <div class="header-logo">
        <a href="{{ routes.root_url }}">
          <img src="{{ 'logo.svg' | asset_url }}" alt="Recoversups" loading="eager">
        </a>
      </div>
      
      <nav class="header-nav">
        {% for link in linklists.main-menu.links %}
          <a href="{{ link.url }}" class="nav-link">{{ link.title }}</a>
        {% endfor %}
      </nav>
      
      <div class="header-actions">
        <div class="search-toggle">
          <button class="btn btn-icon">🔍</button>
        </div>
        
        <div class="account-menu">
          {% if customer %}
            <a href="{{ routes.account_url }}" class="btn btn-icon">👤</a>
          {% else %}
            <a href="{{ routes.account_login_url }}" class="btn btn-icon">👤</a>
          {% endif %}
        </div>
        
        <div class="cart-toggle">
          <a href="{{ routes.cart_url }}" class="btn btn-icon">
            🛒
            <span class="cart-count">{{ cart.item_count }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</header>
```

## Responsive Design

### Breakpoints
```scss
// Breakpoints
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$large-desktop: 1440px;

// Mixins
@mixin mobile {
  @media (max-width: #{$mobile}) {
    @content;
  }
}

@mixin tablet {
  @media (max-width: #{$tablet}) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: #{$desktop}) {
    @content;
  }
}
```

### Aplicación Responsive
```scss
.product-layout {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: $spacing-2xl;
  
  @include tablet {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
  }
  
  @include mobile {
    gap: $spacing-md;
  }
}

.product-gallery__thumbnails {
  display: flex;
  flex-direction: column;
  
  @include tablet {
    flex-direction: row;
    overflow-x: auto;
  }
}

.trust-badges {
  display: flex;
  justify-content: space-between;
  
  @include mobile {
    flex-direction: column;
    gap: $spacing-md;
  }
}
```

## Animaciones y Transiciones

### Efectos Hover
```scss
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
}

.btn {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

### Loading States
```scss
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: $primary-color;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Accesibilidad

### Principios WCAG 2.1 AA
```scss
// Contraste mínimo
.btn-primary {
  background: $warning-color;
  color: $text-secondary;
  // Ratio de contraste: 4.5:1
}

// Focus visible
.btn:focus,
.form-input:focus {
  outline: 2px solid $primary-color;
  outline-offset: 2px;
}

// Tamaños mínimos de toque
.btn {
  min-height: 44px;
  min-width: 44px;
}
```

### Elementos Semánticos
```html
<!-- Estructura semántica -->
<main role="main">
  <section aria-labelledby="featured-heading">
    <h2 id="featured-heading">Productos Destacados</h2>
    <!-- Contenido -->
  </section>
</main>

<!-- Navegación -->
<nav aria-label="Navegación principal">
  <ul>
    <li><a href="#" aria-current="page">Inicio</a></li>
    <li><a href="#">Productos</a></li>
  </ul>
</nav>
```
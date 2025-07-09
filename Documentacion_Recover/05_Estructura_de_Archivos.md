# Estructura de Archivos - Recoversups

## Estructura General del Proyecto

```
recoversups-theme/
├── assets/                 # Recursos estáticos
├── config/                 # Configuraciones del tema
├── layout/                 # Plantillas base
├── locales/               # Traducciones
├── sections/              # Secciones reutilizables
├── snippets/              # Componentes pequeños
├── templates/             # Plantillas de página
├── package.json           # Dependencias del proyecto
├── webpack.config.js      # Configuración de bundling
└── README.md             # Documentación del proyecto
```

## Detalle de Directorios

### 📁 assets/
Contiene todos los recursos estáticos del tema

```
assets/
├── styles/
│   ├── base/
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cards.scss
│   │   ├── _forms.scss
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   ├── _product-card.scss
│   │   ├── _product-gallery.scss
│   │   └── _testimonials.scss
│   ├── layout/
│   │   ├── _grid.scss
│   │   ├── _container.scss
│   │   └── _responsive.scss
│   ├── pages/
│   │   ├── _home.scss
│   │   ├── _product.scss
│   │   ├── _collection.scss
│   │   ├── _cart.scss
│   │   └── _blog.scss
│   ├── utilities/
│   │   ├── _helpers.scss
│   │   └── _animations.scss
│   └── main.scss
├── scripts/
│   ├── components/
│   │   ├── cart.js
│   │   ├── product.js
│   │   ├── search.js
│   │   ├── wishlist.js
│   │   └── reviews.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   ├── validation.js
│   │   └── storage.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── product.js
│   │   ├── collection.js
│   │   └── cart.js
│   └── main.js
├── images/
│   ├── icons/
│   │   ├── cart.svg
│   │   ├── user.svg
│   │   ├── search.svg
│   │   └── heart.svg
│   ├── logos/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   └── favicon.ico
│   ├── placeholders/
│   │   ├── product-placeholder.jpg
│   │   └── user-placeholder.jpg
│   └── backgrounds/
│       ├── hero-bg.jpg
│       └── newsletter-bg.jpg
└── fonts/
    ├── montserrat-regular.woff2
    ├── montserrat-semibold.woff2
    └── montserrat-bold.woff2
```

### 📁 config/
Configuraciones del tema en formato JSON

```
config/
├── settings_schema.json    # Esquema de configuración del tema
├── settings_data.json      # Datos de configuración
└── locales/
    ├── en.default.json     # Traducciones en inglés
    └── es.json            # Traducciones en español
```

### 📁 layout/
Plantillas base que envuelven el contenido

```
layout/
├── theme.liquid           # Layout principal
├── checkout.liquid        # Layout para checkout
├── password.liquid        # Layout para página de password
└── gift_card.liquid       # Layout para gift cards
```

### 📁 sections/
Secciones reutilizables del tema

```
sections/
├── header.liquid          # Cabecera del sitio
├── footer.liquid          # Pie de página
├── hero-banner.liquid     # Banner principal
├── featured-products.liquid # Productos destacados
├── product-grid.liquid    # Rejilla de productos
├── testimonials.liquid    # Testimonios de clientes
├── newsletter.liquid      # Suscripción newsletter
├── blog-posts.liquid      # Artículos del blog
├── product-bundles.liquid # Paquetes de productos
├── trust-badges.liquid    # Insignias de confianza
├── faq.liquid            # Preguntas frecuentes
└── countdown-timer.liquid # Temporizador de ofertas
```

### 📁 snippets/
Componentes pequeños y reutilizables

```
snippets/
├── components/
│   ├── product-card.liquid        # Tarjeta de producto
│   ├── product-price.liquid       # Precio del producto
│   ├── product-rating.liquid      # Calificación con estrellas
│   ├── add-to-cart.liquid         # Botón agregar al carrito
│   ├── quantity-selector.liquid   # Selector de cantidad
│   ├── variant-selector.liquid    # Selector de variantes
│   ├── wishlist-button.liquid     # Botón de lista de deseos
│   ├── social-share.liquid        # Compartir en redes sociales
│   ├── breadcrumbs.liquid         # Migas de pan
│   ├── pagination.liquid          # Paginación
│   └── loading-spinner.liquid     # Spinner de carga
├── forms/
│   ├── contact-form.liquid        # Formulario de contacto
│   ├── newsletter-form.liquid     # Formulario de newsletter
│   ├── review-form.liquid         # Formulario de reseñas
│   └── search-form.liquid         # Formulario de búsqueda
├── media/
│   ├── product-image.liquid       # Imagen de producto
│   ├── responsive-image.liquid    # Imagen responsiva
│   ├── video-player.liquid        # Reproductor de video
│   └── icon.liquid               # Iconos SVG
└── utilities/
    ├── format-money.liquid        # Formato de moneda
    ├── format-date.liquid         # Formato de fecha
    ├── truncate-text.liquid       # Truncar texto
    └── meta-tags.liquid          # Meta tags SEO
```

### 📁 templates/
Plantillas principales de páginas

```
templates/
├── index.liquid               # Página principal
├── product.liquid             # Detalle de producto
├── collection.liquid          # Página de colección
├── cart.liquid               # Carrito de compras
├── page.liquid               # Página estática
├── blog.liquid               # Página del blog
├── article.liquid            # Artículo del blog
├── search.liquid             # Página de búsqueda
├── 404.liquid               # Página de error 404
├── customers/
│   ├── account.liquid         # Cuenta del cliente
│   ├── activate_account.liquid # Activar cuenta
│   ├── addresses.liquid       # Direcciones del cliente
│   ├── login.liquid          # Inicio de sesión
│   ├── order.liquid          # Detalle de pedido
│   ├── register.liquid       # Registro de cliente
│   └── reset_password.liquid  # Restablecer contraseña
└── gift_card.liquid          # Tarjeta de regalo
```

## Archivos de Configuración

### package.json
```json
{
  "name": "recoversups-theme",
  "version": "1.0.0",
  "description": "Tema personalizado para Recoversups",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --mode development --watch",
    "build": "webpack --mode production",
    "deploy": "shopify theme push",
    "pull": "shopify theme pull",
    "serve": "shopify theme serve"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "swiper": "^11.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "babel-loader": "^9.1.0",
    "css-loader": "^6.8.0",
    "mini-css-extract-plugin": "^2.7.0",
    "sass": "^1.69.0",
    "sass-loader": "^13.3.0",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.0"
  }
}
```

### webpack.config.js
```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './assets/scripts/main.js',
    product: './assets/scripts/pages/product.js',
    cart: './assets/scripts/pages/cart.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ]
};
```

## Convenciones de Nomenclatura

### Archivos Liquid
- **Templates:** `nombre-pagina.liquid`
- **Sections:** `nombre-seccion.liquid`
- **Snippets:** `nombre-componente.liquid`
- **Layout:** `nombre-layout.liquid`

### Archivos CSS/SCSS
- **Componentes:** `_nombre-componente.scss`
- **Páginas:** `_nombre-pagina.scss`
- **Utilidades:** `_nombre-utilidad.scss`
- **Variables:** `_variables.scss`

### Archivos JavaScript
- **Componentes:** `nombre-componente.js` (envueltos en IIFEs)
- **Páginas:** `nombre-pagina.js` (envueltos en IIFEs)
- **Utilidades:** `nombre-utilidad.js` (envueltos en IIFEs)
- **Main:** `main.js` (punto de entrada principal)

### Clases CSS
- **Componentes:** `.component-name`
- **Modificadores:** `.component-name--modifier`
- **Estados:** `.component-name.is-active`
- **Utilidades:** `.u-text-center`

## Organización de Código

### Estructura de Componentes
```liquid
<!-- snippets/product-card.liquid -->
<div class="product-card {{ class }}">
  <div class="product-card__image">
    {% render 'product-image', product: product %}
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">{{ product.title }}</h3>
    {% render 'product-price', product: product %}
    {% render 'product-rating', product: product %}
  </div>
  <div class="product-card__actions">
    {% render 'add-to-cart', product: product %}
    {% render 'wishlist-button', product: product %}
  </div>
</div>
```

### Estructura SCSS
```scss
// components/_product-card.scss
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &__image {
    position: relative;
    padding-bottom: 75%; // Aspect ratio 4:3
    overflow: hidden;
  }

  &__content {
    padding: $spacing-md;
    flex-grow: 1;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
  }

  &__actions {
    padding: $spacing-md;
    border-top: 1px solid $border-color;
  }
}
```

## Mejores Prácticas

### Organización de Archivos
1. **Separación de responsabilidades:** Cada archivo tiene una función específica
2. **Reutilización:** Componentes pequeños y reutilizables
3. **Mantenibilidad:** Estructura clara y documentada
4. **Rendimiento:** Lazy loading y optimización de assets

### JavaScript Moderno (Shopify 2025)
1. **IIFEs:** Envolver código en funciones autoejecutables para evitar conflictos de namespace
2. **Modularidad:** Separar funcionalidades en archivos específicos
3. **Optimización:** Minimizar dependencias externas y frameworks
4. **Carga diferida:** Cargar componentes solo cuando sea necesario

### Nomenclatura
1. **Consistencia:** Usar siempre la misma convención
2. **Descriptividad:** Nombres que explican la función
3. **Brevedad:** Evitar nombres excesivamente largos
4. **Jerarquía:** Usar prefijos para agrupar elementos relacionados

### Versionado
1. **Git:** Control de versiones para todo el código
2. **Branches:** Separar desarrollo de producción
3. **Tags:** Versiones específicas del tema
4. **Backup:** Copias de seguridad regulares
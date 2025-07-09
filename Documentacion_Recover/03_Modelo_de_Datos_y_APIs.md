# Modelo de Datos y APIs - Recoversups

## Modelo de Datos Shopify

### Entidades Principales

#### 1. Product (Producto)
```json
{
  "id": "product_id",
  "title": "Whey Protein Isolate",
  "description": "Proteína de suero aislada de alta calidad",
  "vendor": "Optimum Nutrition",
  "product_type": "Proteinas",
  "handle": "whey-protein-isolate",
  "status": "active",
  "tags": ["proteina", "whey", "masa-muscular", "post-entreno"],
  "images": [
    {
      "src": "https://cdn.shopify.com/s/files/1/...",
      "alt": "Whey Protein Isolate - Chocolate"
    }
  ],
  "variants": [
    {
      "id": "variant_id",
      "title": "Chocolate / 2kg",
      "price": "150.00",
      "sku": "WPI-CHOC-2KG",
      "inventory_quantity": 25,
      "option1": "Chocolate",
      "option2": "2kg",
      "weight": 2000,
      "requires_shipping": true
    }
  ],
  "options": [
    {
      "name": "Sabor",
      "values": ["Chocolate", "Vainilla", "Fresa"]
    },
    {
      "name": "Tamaño",
      "values": ["1kg", "2kg", "5kg"]
    }
  ],
  "metafields": [
    {
      "namespace": "producto",
      "key": "informacion_nutricional",
      "value": "Por porción (30g): Proteína 25g, Carbohidratos 2g..."
    },
    {
      "namespace": "producto",
      "key": "modo_uso",
      "value": "Mezclar 1 scoop con 250ml de agua o leche"
    },
    {
      "namespace": "producto",
      "key": "objetivo_fitness",
      "value": "ganar-musculo"
    }
  ]
}
```

#### 2. Collection (Categoría)
```json
{
  "id": "collection_id",
  "title": "Proteínas",
  "description": "Suplementos proteicos para el desarrollo muscular",
  "handle": "proteinas",
  "sort_order": "manual",
  "products": ["product_id_1", "product_id_2"],
  "metafields": [
    {
      "namespace": "categoria",
      "key": "icono",
      "value": "protein-icon.svg"
    },
    {
      "namespace": "categoria",
      "key": "color_tema",
      "value": "#B62921"
    }
  ]
}
```

#### 3. Customer (Cliente)
```json
{
  "id": "customer_id",
  "email": "juan.perez@email.com",
  "first_name": "Juan",
  "last_name": "Pérez",
  "phone": "+51987654321",
  "accepts_marketing": true,
  "created_at": "2024-01-15T10:00:00-05:00",
  "addresses": [
    {
      "id": "address_id",
      "first_name": "Juan",
      "last_name": "Pérez",
      "address1": "Av. Javier Prado 123",
      "address2": "Dpto. 501",
      "city": "Lima",
      "province": "Lima",
      "country": "Peru",
      "zip": "15036",
      "phone": "+51987654321",
      "default": true
    }
  ],
  "metafields": [
    {
      "namespace": "cliente",
      "key": "objetivo_fitness",
      "value": "ganar-musculo"
    },
    {
      "namespace": "cliente",
      "key": "fecha_nacimiento",
      "value": "1990-05-15"
    }
  ]
}
```

#### 4. Order (Pedido)
```json
{
  "id": "order_id",
  "order_number": "1001",
  "customer": "customer_id",
  "email": "juan.perez@email.com",
  "created_at": "2024-01-15T10:00:00-05:00",
  "total_price": "180.00",
  "subtotal_price": "150.00",
  "total_tax": "27.00",
  "shipping_lines": [
    {
      "title": "Envío Standard",
      "price": "15.00",
      "code": "STANDARD"
    }
  ],
  "line_items": [
    {
      "id": "line_item_id",
      "variant_id": "variant_id",
      "title": "Whey Protein Isolate",
      "quantity": 1,
      "price": "150.00",
      "sku": "WPI-CHOC-2KG"
    }
  ],
  "billing_address": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "address1": "Av. Javier Prado 123",
    "city": "Lima",
    "country": "Peru"
  },
  "shipping_address": {
    "first_name": "Juan",
    "last_name": "Pérez",
    "address1": "Av. Javier Prado 123",
    "city": "Lima",
    "country": "Peru"
  },
  "fulfillment_status": "pending",
  "financial_status": "paid"
}
```

#### 5. Blog & Article (Blog y Artículos)
```json
{
  "blog": {
    "id": "blog_id",
    "title": "Blog Fitness Recoversups",
    "handle": "fitness-blog"
  },
  "article": {
    "id": "article_id",
    "title": "Cómo elegir la proteína correcta",
    "author": "Dr. Carlos Nutricionista",
    "created_at": "2024-01-15T10:00:00-05:00",
    "content": "Contenido del artículo...",
    "excerpt": "Guía completa para elegir la proteína adecuada",
    "handle": "como-elegir-proteina-correcta",
    "tags": ["proteina", "nutricion", "guia"],
    "image": "https://cdn.shopify.com/s/files/1/...",
    "metafields": [
      {
        "namespace": "articulo",
        "key": "tiempo_lectura",
        "value": "5 minutos"
      },
      {
        "namespace": "articulo",
        "key": "productos_relacionados",
        "value": "product_id_1,product_id_2"
      }
    ]
  }
}
```

## Metafields Personalizados

### Metafields para Productos
```json
{
  "producto": {
    "informacion_nutricional": "string",
    "modo_uso": "string",
    "objetivo_fitness": "string",
    "ingredientes": "string",
    "advertencias": "string",
    "certificaciones": "string",
    "video_producto": "string",
    "fecha_vencimiento": "date"
  }
}
```

### Metafields para Clientes
```json
{
  "cliente": {
    "objetivo_fitness": "string",
    "fecha_nacimiento": "date",
    "genero": "string",
    "nivel_actividad": "string",
    "preferencias_comunicacion": "string"
  }
}
```

## APIs de Shopify Utilizadas

### 1. Storefront API
Utilizada para el frontend del sitio web

#### Consultas Principales
```graphql
# Obtener productos destacados
query getFeaturedProducts {
  products(first: 8, query: "tag:destacado") {
    edges {
      node {
        id
        title
        handle
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
      }
    }
  }
}

# Obtener detalle de producto
query getProduct($handle: String!) {
  product(handle: $handle) {
    id
    title
    description
    images(first: 10) {
      edges {
        node {
          originalSrc
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          price
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
    options {
      name
      values
    }
    metafields(namespace: "producto") {
      key
      value
    }
  }
}
```

### 2. Admin API
Para gestión de datos desde el backend

#### Endpoints Principales
```javascript
// Actualizar inventario
PUT /admin/api/2023-10/variants/{variant_id}.json
{
  "variant": {
    "id": variant_id,
    "inventory_quantity": 25
  }
}

// Crear pedido
POST /admin/api/2023-10/orders.json
{
  "order": {
    "line_items": [
      {
        "variant_id": variant_id,
        "quantity": 1
      }
    ],
    "customer": {
      "email": "customer@email.com"
    }
  }
}
```

## Integraciones de Terceros

### 1. Payment Gateway
```javascript
// Shopify Payments
const payment = {
  gateway: "shopify_payments",
  amount: "150.00",
  currency: "PEN",
  payment_method: "credit_card",
  billing_address: billingAddress
};
```

### 2. Shipping API
```javascript
// Cálculo de envío
const shipping = {
  origin: {
    country: "PE",
    city: "Lima"
  },
  destination: customerAddress,
  items: cartItems,
  service_type: "standard"
};
```

### 3. Email Marketing (Klaviyo)
```javascript
// Evento de compra
const purchaseEvent = {
  token: "klaviyo_token",
  event: "Placed Order",
  customer_properties: {
    email: customer.email,
    first_name: customer.first_name
  },
  properties: {
    order_id: order.id,
    value: order.total_price,
    items: order.line_items
  }
};
```

## Estructura de Datos para Funcionalidades Custom

### 1. Wishlist (Lista de Deseos)
```json
{
  "customer_id": "customer_id",
  "products": [
    {
      "product_id": "product_id",
      "variant_id": "variant_id",
      "added_at": "2024-01-15T10:00:00-05:00"
    }
  ]
}
```

### 2. Reviews (Reseñas)
```json
{
  "product_id": "product_id",
  "customer_id": "customer_id",
  "rating": 5,
  "title": "Excelente proteína",
  "content": "Muy buen sabor y calidad...",
  "created_at": "2024-01-15T10:00:00-05:00",
  "verified_purchase": true,
  "helpful_votes": 12
}
```

### 3. Bundle Products
```json
{
  "bundle_id": "bundle_id",
  "title": "Pack Ganador de Masa",
  "products": [
    {
      "product_id": "product_id_1",
      "quantity": 1,
      "variant_id": "variant_id_1"
    },
    {
      "product_id": "product_id_2",
      "quantity": 1,
      "variant_id": "variant_id_2"
    }
  ],
  "discount_percentage": 15,
  "bundle_price": "255.00",
  "individual_price": "300.00"
}
```

## Validaciones y Reglas de Negocio

### 1. Validaciones de Producto
- Stock mínimo antes de mostrar "Últimas unidades"
- Validación de combinaciones de variantes
- Verificación de productos activos

### 2. Validaciones de Cliente
- Formato de email válido
- Teléfono con código de país peruano
- Validación de dirección de envío

### 3. Validaciones de Pedido
- Disponibilidad de stock al momento de compra
- Métodos de pago válidos para Perú
- Validación de cupones de descuento

## Backup y Recuperación

### Estrategia de Backup
- Backup diario de datos de productos
- Backup semanal de datos de clientes
- Backup de configuración de tema
- Exportación mensual de pedidos

### Recuperación de Datos
- Procedimiento para restaurar productos
- Recuperación de pedidos perdidos
- Restauración de configuración de tema
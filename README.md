# Danger AK — SPA Oficial

Página web oficial del rapero mexicano Danger AK. Solo frontend (UI). Datos editables manualmente en los archivos de `src/data/` y `src/api/`.

## Tecnologías

- **React 19** — UI
- **Vite 8** — Build y dev server
- **Tailwind CSS 4** — Estilos (mobile first)
- **React Router DOM 7** — Navegación (solo checkout)
- **React Helmet Async** — SEO

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abre http://localhost:3020

## Deploy en producción (proxy Nginx, puerto 8090)

Nginx escucha en 8090 y hace proxy a la app en 3020.

### 1. Build y arranque en el VPS

```bash
cd /ruta/dangerak
npm ci
npm run build
npm run start   # Sirve dist en puerto 3020
```

### 2. Mantener el proceso activo (PM2)

```bash
pm2 start npm --name "danger-ak" -- run start
pm2 save
pm2 startup
```

### 3. Nginx

Sitio en `sites-available/danger-ak`: escucha puerto 8090, proxy a `http://127.0.0.1:3020`. Acceso: `http://TU_IP:8090`

### 4. Alternativa: Nginx sirve archivos estáticos

Si prefieres no usar Node en producción:

```bash
npm run build
# Copiar dist/ al VPS, ej: rsync -avz dist/ usuario@vps:/var/www/danger-ak/dist/
```

En Nginx, usar `root /var/www/danger-ak/dist` y `try_files $uri $uri/ /index.html` en lugar de `proxy_pass`.

---

## Estructura

- **`/`** — Homepage con secciones: Hero, Música, Tour, Merch, Contacto
- **`/carrito`** — Carrito de compras
- **`/checkout`** — Formulario de pago
- **`/orden-exitosa`** — Confirmación

## Datos manuales

Edita estos archivos para actualizar el contenido:

| Archivo | Contenido |
|---------|-----------|
| `src/data/estreno.js` | Último sencillo: título, portada, YouTube ID, URLs de plataformas |
| `src/data/products.js` | Catálogo de merch |
| `src/api/events.js` | Fechas del tour |

## Paleta

- Negro: `#0a0a0a`
- Negro rojizo (navbar): `rgba(26, 5, 5, 0.92)`
- Blanco: `#fafafa`
- Rojo: `#b91c1c`
- Dorado: `#d4af37`

## Tipografías

- Títulos: Bebas Neue
- Cuerpo: Inter (300, 400, 500, 600)

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

Abre http://localhost:5173

## Deploy (sitio estático)

### 1. Build

```bash
npm run build
```

Los archivos están en `dist/`.

### 2. Servir con Nginx

Crear sitio en `/etc/nginx/sites-available/dangerak`:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    root /var/www/dangerak/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/dangerak /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. Subir archivos al VPS

```bash
rsync -avz dist/ usuario@tu-vps:/var/www/dangerak/dist/
# O: scp -r dist/* usuario@tu-vps:/var/www/dangerak/dist/
```

### 4. SSL (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com
```

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

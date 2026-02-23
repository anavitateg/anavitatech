# 🚀 DevPortfolio — Fullstack Professional Portfolio

> Portafolio web one-page, minimalista, futurista y moderno. Construido con React + Vite + Tailwind CSS (frontend) y NestJS (backend).

![Preview](https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80)

---

## ✨ Características

- **One-page layout** con scroll suave entre secciones
- **Hero** con animación de partículas en canvas y efecto typewriter
- **Proyectos** en grid con cards animadas y hover effects
- **Sobre mí** con timeline de experiencia y badges de tecnologías
- **Contacto** con formulario validado conectado al backend
- **Navbar** fija con glassmorphism y scroll spy
- **Cursor personalizado** interactivo
- **Barra de progreso** de scroll
- **Animaciones** con Intersection Observer + CSS transitions
- **SEO básico** con meta tags OpenGraph y Twitter Card
- **Modo oscuro** por defecto
- **Responsive** (mobile-first)
- **Backend** con NestJS, Nodemailer, validación DTO y CORS

---

## 🧱 Arquitectura

```
Anavitatech/
├── client/                  # Frontend — React + Vite + Tailwind
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── data/
│   │   │   └── projects.js
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── server/                  # Backend — NestJS
    ├── src/
    │   ├── contact/
    │   │   ├── contact.controller.ts
    │   │   ├── contact.service.ts
    │   │   ├── contact.module.ts
    │   │   └── contact.dto.ts
    │   ├── app.module.ts
    │   └── main.ts
    ├── .env.example
    ├── nest-cli.json
    ├── tsconfig.json
    └── package.json
```

---

## 🚀 Instalación local

### Prerequisitos

- Node.js 18+
- npm o pnpm

### 1. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Abre http://localhost:3000

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
# Edita .env con tus credenciales SMTP
npm run start:dev
```

Backend en http://localhost:4000

---

## ⚙️ Variables de entorno

### Frontend (`client/.env`)

| Variable | Default | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000` | URL del backend |

### Backend (`server/.env`)

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `4000` | Puerto del servidor |
| `CORS_ORIGIN` | `http://localhost:3000` | URL del frontend |
| `SMTP_HOST` | `smtp.gmail.com` | Host SMTP |
| `SMTP_PORT` | `587` | Puerto SMTP |
| `SMTP_SECURE` | `false` | TLS/SSL |
| `SMTP_USER` | — | Email SMTP |
| `SMTP_PASS` | — | App Password SMTP |
| `CONTACT_EMAIL` | — | Email donde recibir mensajes |

#### Configurar Gmail

1. Activa la verificación en 2 pasos en tu cuenta Google
2. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Genera una "App Password" y úsala como `SMTP_PASS`

---

## 🌐 Deploy en producción

### Frontend → Vercel

```bash
# Instala Vercel CLI
npm i -g vercel

cd client
vercel --prod
# Agrega VITE_API_URL=https://tu-backend.railway.app en Vercel Dashboard
```

### Backend → Railway

1. Sube el código a GitHub
2. Crea nuevo proyecto en [railway.app](https://railway.app)
3. Conecta tu repositorio, selecciona la carpeta `/server`
4. Agrega todas las variables de entorno en Railway Dashboard
5. Railway desplegará automáticamente

### Backend → Render

1. Crea un nuevo "Web Service" en [render.com](https://render.com)
2. Conecta el repositorio, root directory: `server`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`
5. Agrega las variables de entorno

---

## 🎨 Personalización

### Datos personales

Edita en estos archivos:

| Archivo | Qué personalizar |
|---|---|
| `client/src/sections/Hero.jsx` | Nombre, frase, estadísticas |
| `client/src/sections/About.jsx` | Bio, timeline de experiencia, stack |
| `client/src/data/projects.js` | Proyectos, tecnologías, links |
| `client/src/components/Footer.jsx` | Redes sociales, copyright |
| `client/src/sections/Contact.jsx` | Email de contacto |
| `client/index.html` | SEO meta tags |

### Colores y tema

Edita `client/tailwind.config.js`:

```js
colors: {
  neon: {
    cyan: '#00f5ff',     // Color principal
    purple: '#a855f7',   // Acento
    blue: '#3b82f6',     // Secundario
    pink: '#f472b6',     // Extra
  }
}
```

---

## 🔌 API Reference

### POST `/contact`

Envía un mensaje de contacto y dispara emails.

**Request body:**
```json
{
  "name": "string (2-100 chars)",
  "email": "valid email",
  "message": "string (10-2000 chars)"
}
```

**Response 200:**
```json
{
  "status": "ok",
  "message": "Mensaje enviado correctamente."
}
```

**Response 400 (validación):**
```json
{
  "statusCode": 400,
  "message": ["El nombre es requerido.", "El email no es válido."],
  "error": "Bad Request"
}
```

**Response 500:**
```json
{
  "statusCode": 500,
  "message": "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde."
}
```

---

## 🛠️ Scripts

### Frontend

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server en localhost:3000 |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |

### Backend

| Comando | Descripción |
|---|---|
| `npm run start:dev` | Dev server con hot-reload |
| `npm run build` | Compilar TypeScript |
| `npm run start:prod` | Ejecutar en producción |

---

## 📦 Stack completo

**Frontend:** React 18, Vite, Tailwind CSS, CSS3, Vanilla JS (Canvas API, IntersectionObserver)

**Backend:** NestJS, Node.js, Nodemailer, class-validator, class-transformer, @nestjs/config

**Deploy:** Vercel (frontend) + Railway/Render (backend)

---

## 📄 Licencia

MIT © Tu Nombre

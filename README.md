# AnavitaTECH — Portafolio Personal v1.0

> Portafolio web personal de **Juan José Anavitate Gómez** — Ingeniero de Sistemas, Backend Developer y QA Engineer. Diseño inmersivo de pantalla completa con navegación por secciones, modo oscuro/claro, slider de proyectos interactivo y formulario de contacto funcional.

---

## Vista general

**AnavitaTECH** es un portafolio profesional construido como una Single Page Application (SPA) con arquitectura fullstack desacoplada:

- **Frontend:** React + Vite + Tailwind CSS — desplegable de forma estática.
- **Backend:** NestJS — API REST para el formulario de contacto con envío real de correos vía SMTP.

---

## Estructura del proyecto

```
Anavitatech/
├── client/          # Frontend — React + Vite
│   ├── public/
│   │   └── assets/
│   │       ├── juan.png
│   │       ├── portada.jpg
│   │       └── HDVJuanAnavitate_2026.pdf
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── ThemeToggle.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── AboutPage.jsx
│           └── ProjectDetail.jsx
└── server/          # Backend — NestJS
    └── src/
        ├── main.ts
        ├── app.module.ts
        └── contact/
            ├── contact.controller.ts
            ├── contact.service.ts
            ├── contact.module.ts
            └── contact.dto.ts
```

---

## Stack tecnológico

### Frontend

| Tecnología | Versión | Rol |
|---|---|---|
| React | 18 | UI y estado de componentes |
| Vite | 5 | Bundler y servidor de desarrollo |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| React Router DOM | 7 | Enrutamiento entre páginas |
| Plus Jakarta Sans | — | Tipografía principal |
| Caveat / Dancing Script | — | Tipografías decorativas secundarias |
| Playfair Display | — | Tipografía serif para citas |

### Backend

| Tecnología | Versión | Rol |
|---|---|---|
| NestJS | 10 | Framework principal |
| TypeScript | 5 | Lenguaje base del servidor |
| Nodemailer | 6 | Envío de correos vía SMTP |
| class-validator | 0.14 | Validación y sanitización del DTO |
| @nestjs/config | 3 | Gestión de variables de entorno |

---

## Secciones del portafolio

El portafolio está organizado en **4 secciones** que se navegan con efecto snap-scroll vertical en escritorio, y scroll interno por sección en móvil.

### Sección 0 — Resumen
Vista general del portafolio. Presenta:
- Card de **perfil profesional** con foto, nombre, rol, habilidades clave, lenguajes y enlace a GitHub.
- Card de **Mis proyectos** con un mini slider interactivo que muestra los proyectos de forma resumida.
- Botón CTA para navegar a la siguiente sección.

### Sección 1 — Sobre mí
Perfil personal y profesional detallado. Incluye:
- Experiencia laboral con timeline (Baco Adventure SAS, UnimetaDocs, Quapi).
- Card de **habilidades** organizadas por categoría: Backend, Bases de datos, QA & Testing, DevOps & Tools.
- Card de **lenguajes de programación**: JavaScript, TypeScript, Python, PHP, Java, SQL, HTML/CSS.

### Sección 2 — Proyectos
Galería completa de proyectos con un **FullSlider** interactivo. Cada proyecto incluye:
- Imagen de fondo con overlay de color por proyecto.
- Badge de estado (En desarrollo / Activo).
- Pestañas internas: **Descripción**, **Características** y **Tecnologías usadas**.
- Botones de acción: *Conocer más* (enlaza a página de detalle) y *Ver demo*.
- Proyectos: **UnimetaDocs** (NestJS, Next.js, PostgreSQL) y **Quapi** (Node.js, React, MongoDB, Jest).

### Sección 3 — Contacto
Página de contacto con dos columnas:
- **Formulario** con nombre, email, asunto y mensaje — conectado al backend para envío real de correos.
- **Card de redes** con imagen de portada, cita personal, redes personales (YouTube, X, Facebook) y profesionales (LinkedIn, GitHub).

---

## Características técnicas destacadas

- **Snap-scroll vertical** en escritorio: navegación fluida entre secciones con `translateY` animado (700ms cúbico).
- **Viewport-per-section** en móvil: cada sección ocupa exactamente la altura de la pantalla con scroll interno independiente.
- **Modo oscuro / claro** persistente vía clase `dark` en `<html>`, accesible desde el navbar.
- **Navbar responsive**: pill flotante en escritorio; hamburguesa con dropdown en móvil (logo, links, toggle de tema).
- **Neural Background**: fondo SVG procedural animado único por sección.
- **MiniSlider y FullSlider**: sliders de proyectos con transición horizontal, paginado circular y tabs de contenido.
- **Páginas independientes**: `/projects/:slug` para detalle de cada proyecto; `/about` para perfil profesional completo.
- **API de contacto** con validación, sanitización y doble envío de correo (al dueño + confirmación al remitente).

---

## Variables de entorno

### `client/.env`
```env
VITE_API_URL=http://localhost:4000
```

### `server/.env`
```env
PORT=4000
CORS_ORIGIN=http://localhost:3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_app_password

CONTACT_EMAIL=correo_donde_recibes@gmail.com
```

> Para Gmail, genera una **App Password** en: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

---

## Instalación y desarrollo local

### Requisitos
- Node.js 18+
- npm 9+

### Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev        # http://localhost:3000
```

### Backend
```bash
cd server
npm install
cp .env.example .env   # Configurar SMTP y CONTACT_EMAIL
npm run start:dev      # http://localhost:4000
```

---

## Scripts disponibles

### Client
| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Preview del build |

### Server
| Script | Descripción |
|---|---|
| `npm run start:dev` | Servidor en modo watch |
| `npm run build` | Compilar TypeScript |
| `npm run start:prod` | Iniciar en producción |
| `npm run test` | Ejecutar tests |

---

## API del backend

### `POST /contact`

Envía un correo al propietario del portafolio y un correo de confirmación al remitente.

**Body:**
```json
{
  "name": "Tu Nombre",
  "email": "tu@email.com",
  "message": "Hola, me gustaría trabajar contigo..."
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente."
}
```

**Validaciones:** nombre (2–100 caracteres), email válido, mensaje (10–2000 caracteres). Todos los campos son sanitizados con `class-transformer`.

---

## Despliegue

### Frontend — Netlify / Vercel

```bash
cd client
npm run build
# Subir carpeta dist/ o conectar el repositorio
```

> Incluye `public/_redirects` con `/* /index.html 200` para que las rutas de React Router funcionen en Netlify.

### Backend — Railway / Render

```bash
cd server
npm run build
npm run start:prod
```

Configurar las variables de entorno en el panel del proveedor. Ajustar `CORS_ORIGIN` con la URL del frontend en producción.

---

## Autor

**Juan José Anavitate Gómez**
Ingeniero de Sistemas · Backend Developer · QA Engineer
Villavicencio, Colombia

- GitHub: [github.com/JuanAnavitate](https://github.com/JuanAnavitate)
- LinkedIn: [linkedin.com/in/juananavitate](https://linkedin.com/in/juananavitate)
- YouTube: [youtube.com/@juananavitate](https://youtube.com/@juananavitate)

---

*Construido con React, Vite, Tailwind CSS y NestJS — 2025/2026*

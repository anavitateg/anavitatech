# UnimetaDocs V1 — Documentación Técnica Completa

> **Versión:** 1.1.0  
> **Fecha de cierre:** Marzo 2026  
> **Última actualización:** 12 de Marzo 2026 — Ver [Historial de Cambios](#13-historial-de-cambios)  
> **Institución:** Corporación Universitaria del Meta (Unimeta)  
> **Propósito:** Sistema institucional de gestión docente, análisis de datos y generación de documentos académicos.

---

## Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Infraestructura y Stack Tecnológico](#2-infraestructura-y-stack-tecnológico)
3. [Estructura de Repositorio](#3-estructura-de-repositorio)
4. [Base de Datos](#4-base-de-datos)
5. [Backend — NestJS](#5-backend--nestjs)
   - 5.1 [Configuración Global](#51-configuración-global)
   - 5.2 [Autenticación y Autorización](#52-autenticación-y-autorización)
   - 5.3 [Módulo: Users](#53-módulo-users)
   - 5.4 [Módulo: Carreras](#54-módulo-carreras)
   - 5.5 [Módulo: Asignaturas](#55-módulo-asignaturas)
   - 5.6 [Módulo: Subtipo Contratos](#56-módulo-subtipo-contratos)
   - 5.7 [Módulo: Tipo Contratos](#57-módulo-tipo-contratos)
   - 5.8 [Módulo: Profesores (Docentes)](#58-módulo-profesores-docentes)
   - 5.9 [Módulo: Notas ED](#59-módulo-notas-ed)
   - 5.10 [Módulo: Informes (Analisis)](#510-módulo-informes-analisis)
   - 5.11 [Módulo: Analyzer](#511-módulo-analyzer)
   - 5.12 [Módulo: Documentos](#512-módulo-documentos)
   - 5.13 [Módulo: Generador](#513-módulo-generador)
   - 5.14 [Módulo: Logs](#514-módulo-logs)
6. [Frontend — Next.js](#6-frontend--nextjs)
   - 6.1 [Organización de Rutas](#61-organización-de-rutas)
   - 6.2 [Estado Global (Zustand)](#62-estado-global-zustand)
   - 6.3 [Contextos React](#63-contextos-react)
   - 6.4 [Cliente HTTP](#64-cliente-http)
   - 6.5 [Sección: Login](#65-sección-login)
   - 6.6 [Sección: Dashboard (Home)](#66-sección-dashboard-home)
   - 6.7 [Sección: Usuarios](#67-sección-usuarios)
   - 6.8 [Sección: Carreras](#68-sección-carreras)
   - 6.9 [Sección: Asignaturas](#69-sección-asignaturas)
   - 6.10 [Sección: Contratos](#610-sección-contratos)
   - 6.11 [Sección: Subtipo Contratos](#611-sección-subtipo-contratos)
   - 6.12 [Sección: Docentes](#612-sección-docentes)
   - 6.13 [Sección: Notas ED](#613-sección-notas-ed)
   - 6.14 [Sección: Analyzer](#614-sección-analyzer)
   - 6.15 [Sección: Generador de Documentos](#615-sección-generador-de-documentos)
   - 6.16 [Sección: Logs de Auditoría](#616-sección-logs-de-auditoría)
   - 6.17 [Componentes de Layout](#617-componentes-de-layout)
7. [Sistema de Roles y Permisos](#7-sistema-de-roles-y-permisos)
8. [Sistema de Logs de Auditoría](#8-sistema-de-logs-de-auditoría)
9. [Motor de Análisis (Analyzer Engine)](#9-motor-de-análisis-analyzer-engine)
10. [Motor de Generación de Documentos](#10-motor-de-generación-de-documentos)
11. [Configuración de Entornos](#11-configuración-de-entornos)
12. [Despliegue con Docker](#12-despliegue-con-docker)
13. [Historial de Cambios](#13-historial-de-cambios)

---

## 1. Descripción General

**UnimetaDocs** es una plataforma web institucional desarrollada para la Corporación Universitaria del Meta. Su objetivo es centralizar y digitalizar la gestión del cuerpo docente, facilitando el análisis de datos académicos y la generación de documentos formales (informes y reportes) con exportación directa a PDF, DOCX y XLSX.

### Capacidades principales

| Área | Descripción |
|---|---|
| **Gestión de datos** | CRUD completo de docentes, carreras, asignaturas, contratos (tipo y subtipo) y notas de evaluación docente |
| **Importación masiva** | Soporte de bulk-import con JSON para todos los catálogos |
| **Analyzer** | Motor de análisis visual interactivo por sesiones: filtros, joins, agrupaciones, operaciones estadísticas y visualizaciones guardadas |
| **Generador de Documentos** | Constructor paso a paso de informes (portada + contenidos + conclusión + referencias) y reportes; guardado como borrador o marcado como finalizado; exportación a PDF/DOCX/XLSX con formato institucional |
| **Reportes automáticos** | Plantillas preconfiguradas que consultan la BD en tiempo real y generan documentos directamente |
| **Dark Mode** | Soporte completo de modo oscuro en toda la interfaz, incluyendo el Analyzer (PipelineCanvas, Sidebar, barras de acciones) y el constructor del Generador (barra de navegación inferior) |
| **Auditoría** | Registro cronológico completo de todas las mutaciones del sistema por usuario y sección |

| **Control de acceso** | Dos roles (WEBMASTER / ADMINISTRATIVO) con granularidad por endpoint y por sección |

### Backend

| Componente | Tecnología | Versión |
|---|---|---|
| Framework | NestJS | 10.x |
| ORM | Prisma | 5.x |
| Base de datos | PostgreSQL | 16 |
| Autenticación | JWT (passport-jwt) | — |
| Hashing | bcrypt | — |
| Generación PDF | pdfkit | — |
| Generación DOCX | docx | — |
| Generación XLSX | ExcelJS | — |
| Validación DTO | class-validator / class-transformer | — |
| Lenguaje | TypeScript | 5.x |

### Frontend

| Componente | Tecnología | Versión |
|---|---|---|
| Framework | Next.js | 14.x (App Router) |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 3.x |
| Estado global | Zustand | 4.x |
| Cliente HTTP | Axios | — |
| Gráficos | Recharts | — |
| Notificaciones | react-hot-toast | — |
| Iconos | lucide-react | — |
| Render | React | 18.x |

### Infraestructura de despliegue

```
┌──────────────────────────────────────────────────────────────────┐
│  Docker Compose                                                    │
│                                                                    │
│  ┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐  │
│  │  PostgreSQL  │◄───│  NestJS Backend │◄───│  Next.js Frontend│  │
│  │  :5432       │    │  :3001/api      │    │  :3000           │  │
│  └─────────────┘    └─────────────────┘    └──────────────────┘  │
│                                                                    │
│  ┌─────────────┐                                                   │
│  │  pgAdmin 4  │  (herramienta de administración BD)               │
│  │  :5050       │                                                   │
│  └─────────────┘                                                   │
└──────────────────────────────────────────────────────────────────┘
```

Todos los servicios se levantan con `docker-compose up`. El backend ejecuta `prisma migrate deploy` automáticamente antes de iniciar.

---

## 3. Estructura de Repositorio

```
UnimetaDocs/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          ← Modelos y relaciones de BD
│   │   ├── seed.ts                ← Datos semilla
│   │   └── migrations/            ← Historial de migraciones SQL
│   └── src/
│       ├── main.ts                ← Bootstrap NestJS (CORS, ValidationPipe, prefijo /api)
│       ├── app.module.ts          ← Módulo raíz, registra todos los módulos
│       ├── prisma/                ← PrismaModule + PrismaService (global)
│       ├── auth/                  ← Autenticación JWT, guards, estrategias, decoradores
│       ├── users/                 ← CRUD de usuarios del sistema
│       ├── carreras/              ← Gestión de carreras académicas
│       ├── asignaturas/           ← Gestión de asignaturas
│       ├── subtipo-contratos/     ← Gestión de subtipos de contrato
│       ├── tipo-contratos/        ← Gestión de tipos de contrato
│       ├── profesores/            ← Gestión de docentes (registro más complejo)
│       ├── notas-ed/              ← Notas de evaluación docente
│       ├── informes/              ← Proveedor de análisis para el Generador
│       ├── analyzer/              ← Motor de análisis (sesiones + ejecución de pipelines)
│       │   ├── engine/
│       │   │   ├── type-checker.ts   ← Validación de tipos del grafo
│       │   │   └── graph-executor.ts ← Ejecutor topológico de pipelines
│       │   └── dto/
│       ├── documentos/            ← Persistencia de documentos del Generador
│       ├── generador/             ← Compilador + exportador de documentos (PDF/DOCX/XLSX)
│       └── logs/                  ← Sistema global de auditoría
│
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── page.tsx                    ← Pantalla de login
│       │   ├── (auth)/login/               ← Redirección legacy
│       │   └── (dashboard)/dashboard/
│       │       ├── page.tsx                ← Dashboard principal
│       │       ├── usuarios/               ← Gestión de usuarios (solo WEBMASTER)
│       │       ├── carreras/               ← CRUD carreras
│       │       ├── asignaturas/            ← CRUD asignaturas
│       │       ├── contratos/              ← CRUD tipos de contrato
│       │       ├── subtipo-contratos/      ← CRUD subtipos de contrato
│       │       ├── docentes/               ← CRUD docentes + importación masiva
│       │       ├── notas-ed/               ← CRUD notas ED + importación masiva
│       │       ├── analyzer/               ← Dashboard de sesiones + editor de sesión
│       │       │   └── [sessionId]/        ← Editor de sesión individual
│       │       ├── generador/              ← Hub del generador
│       │       │   ├── page.tsx            ← Lista de documentos guardados
│       │       │   ├── nuevo/
│       │       │   │   ├── page.tsx        ← Selector de tipo (informe/reporte)
│       │       │   │   ├── informe/        ← Constructor de informe (5 pasos)
│       │       │   │   └── reporte/        ← Constructor de reporte
│       │       │   └── automatico/         ← Plantillas preconfiguradas
│       │       ├── informes/               ← Redirección a /generador
│       │       └── logs/                   ← Visor de auditoría (solo WEBMASTER)
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Sidebar.tsx             ← Navegación lateral con secciones colapsables
│       │   │   └── Header.tsx              ← Barra superior
│       │   ├── analyzer/
│       │   │   ├── PipelineCanvas.tsx      ← UI del constructor de pipelines (6 pasos)
│       │   │   ├── ResultsConsole.tsx      ← Panel de resultados del análisis
│       │   │   └── LogsPanel.tsx           ← Panel de logs de actividad del Analyzer
│       │   ├── generador/
│       │   │   └── MetricTextArea.tsx      ← Textarea con picker de métricas ($$V tokens)
│       │   ├── ImportDocentesModal.tsx     ← Modal de importación masiva de docentes
│       │   ├── ImportCarrerasModal.tsx     ← Modal de importación masiva de carreras
│       │   ├── ImportAsignaturasModal.tsx  ← Modal de importación masiva de asignaturas
│       │   └── ImportNotasEdModal.tsx      ← Modal de importación masiva de notas ED
│       ├── contexts/
│       │   ├── MetricContext.tsx           ← Proveedor de análisis de tipo métrica (para $$V)
│       │   └── VizContext.tsx              ← Proveedor de análisis de tabla/gráfico (para VizPicker)
│       ├── stores/
│       │   ├── authStore.ts               ← Estado de autenticación (Zustand + persist)
│       │   ├── analyzerStore.ts           ← Estado del Analyzer (sesiones, pipeline, resultados)
│       │   └── sidebarStore.ts            ← Estado del sidebar (colapsado/abierto)
│       ├── lib/
│       │   ├── api.ts                     ← Axios instance con interceptores de token y 401
│       │   ├── analyzerApi.ts             ← Funciones fetch para el Analyzer
│       │   ├── generadorApi.ts            ← Funciones para exportar documentos/plantillas
│       │   └── utils.ts                   ← Utilidades generales
│       └── types/
│           ├── index.ts                   ← Tipos principales del sistema
│           └── analyzer.ts                ← Tipos del Analyzer (PipelineData, AnalyzerSession, etc.)
│
├── docker-compose.yml
├── README.md
├── API.md
├── ARCHITECTURE.md
├── DOCKER.md
├── ENTORNOS.md
├── INSTALLATION.md
├── PROJECT_SUMMARY.md
└── QUICKSTART.txt
```

---

## 4. Base de Datos

Motor: **PostgreSQL 16**. Schema gestionado con **Prisma Migrate**.  
Nombre de la base de datos: `unimetadocs`.

### Diagrama de Entidades

```
users ──────────────────────────── analyzer_sessions
(id UUID)                          (userId FK → users.id)

carreras ──────────────── asignaturas
(cod_carrera)              (cod_carrera FK)

subtipo_contratos ──────── tipo_contratos
(id_subtipo_contrato)      (id_subtipo_contrato FK)

profesores     (tabla independiente, id_tipo_contrato es VarChar no FK)
notas_ed       (tabla independiente, cedula_profesor VarChar sin FK)
documentos     (tabla independiente, payload JSON)
logs           (tabla de auditoría, sin relaciones FK)
```

> **Nota — tablas eliminadas:** Las tablas `informes` y `analisis` que existían en V1.0.0 como intermediario entre el Analyzer y el Generador fueron **eliminadas en su totalidad** (migración `20260312203044_remove_analisis_table`). El Generador accede ahora directamente al campo `analyzer_sessions.graph.result`.

### Detalle de cada tabla

#### `users`
| Campo | Tipo | Detalle |
|---|---|---|
| `id` | UUID (PK) | Generado automáticamente |
| `email` | VARCHAR UNIQUE | Identificador de login |
| `password` | VARCHAR | Hash bcrypt (10 rondas) |
| `role` | Enum Role | `WEBMASTER` \| `ADMINISTRATIVO` |
| `nombres` | VARCHAR(100)? | Nombre del usuario |
| `apellidos` | VARCHAR(100)? | Apellido del usuario |
| `numero_contacto` | VARCHAR(20)? | Teléfono |
| `cargo` | VARCHAR(100)? | Cargo institucional |
| `isActive` | Boolean | Control de acceso suave |
| `createdAt` | DateTime | Creación |
| `updatedAt` | DateTime | Última modificación |

#### `carreras`
| Campo | Tipo | Detalle |
|---|---|---|
| `id_carrera` | Int (PK, autoincrement) | — |
| `cod_carrera` | VARCHAR(20) UNIQUE | Código de la carrera |
| `nombre_carrera` | VARCHAR(100) | Nombre completo |

#### `asignaturas`
| Campo | Tipo | Detalle |
|---|---|---|
| `id_asignatura` | Int (PK, autoincrement) | — |
| `cod_carrera` | VARCHAR(20) FK → `carreras.cod_carrera` | — |
| `cod_asignatura` | VARCHAR(20) | Código de la asignatura |
| `nombre_asignatura` | VARCHAR(100) | Nombre completo |

#### `subtipo_contratos`
| Campo | Tipo | Detalle |
|---|---|---|
| `id_subtipo_contrato` | Int (PK, autoincrement) | — |
| `nombre_subtipo` | VARCHAR(100) UNIQUE | Ej: "Tiempo Completo" |

#### `tipo_contratos`
| Campo | Tipo | Detalle |
|---|---|---|
| `id_tipo_contrato` | Int (PK, autoincrement) | — |
| `nombre_contrato` | VARCHAR(100) | Ej: "Planta" |
| `id_subtipo_contrato` | Int FK → `subtipo_contratos` | — |

#### `profesores`
| Campo | Tipo | Detalle |
|---|---|---|
| `id_profesor` | Int (PK, autoincrement) | — |
| `cedula_profesor` | VARCHAR(20) UNIQUE | Cédula de identidad |
| `nombre_profesor` | VARCHAR(100) | Nombre completo |
| `nivel_formacion` | VARCHAR(100) | Ej: "Magister", "Doctor" |
| `id_tipo_contrato` | VARCHAR(50) | Referencia no-FK al tipo de contrato |
| `anio_entrada` | Int? | Año de vinculación |
| `periodo_entrada` | Int? | Período (1 o 2) de vinculación |
| `anio_salida` | Int? | Año de desvinculación (null = activo) |
| `periodo_salida` | Int? | Período de desvinculación |

> **Nota:** `id_tipo_contrato` se almacena como VARCHAR para preservar el texto original en importaciones históricas donde el texto no coincide exactamente con registros en `tipo_contratos`.

#### `notas_ed`
| Campo | Tipo | Detalle |
|---|---|---|
| `id_nota` | Int (PK, autoincrement) | — |
| `cedula_profesor` | VARCHAR(20) | Cédula del docente evaluado |
| `anio` | Int | Año académico de la evaluación |
| `periodo` | Int | Período (1 o 2) |
| `nota` | Float | Calificación obtenida (0–10) |

#### ~~`informes`~~ — **ELIMINADA**

> Esta tabla fue eliminada en la migración `20260312203044_remove_analisis_table`. Ya no existe en el schema ni en el cliente Prisma.

#### ~~`analisis`~~ — **ELIMINADA**

> Esta tabla fue eliminada en la misma migración. Era el intermediario entre Analyzer y Generador. Toda la información relevante vive ahora en `analyzer_sessions.graph.result`.

#### `documentos`
| Campo | Tipo | Detalle |
|---|---|---|
| `id` | Int (PK, autoincrement) | — |
| `tipo` | VARCHAR(20) | `'informe'` \| `'reporte'` |
| `nombre` | VARCHAR(200) | Nombre para mostrar |
| `estado` | VARCHAR(20) | `'borrador'` \| `'finalizado'`. Un borrador se puede editar y re-guardar; un finalizado da por cerrado el documento. El cambio de estado es reversible vía PATCH desde los constructores. |
| `datos` | JSON | Payload completo: `DocumentoInforme` \| `DocumentoReporte` |
| `creado_en` | DateTime | — |
| `actualizado_en` | DateTime | — |

#### `analyzer_sessions`
| Campo | Tipo | Detalle |
|---|---|---|
| `id` | Int (PK, autoincrement) | — |
| `nombre` | VARCHAR(200) | Nombre de la sesión |
| `descripcion` | Text? | Descripción opcional |
| `estado` | VARCHAR DEFAULT `'borrador'` | `'borrador'` \| `'finalizado'`. Controlado desde el botón **Finalizar** en el editor. Determina el badge en la lista de sesiones. |
| `graph` | JSON | Grafo serializado: `{ pipeline, result }`. `result` es el último resultado calculado y guardado. |
| `userId` | String FK → `users.id` | Propietario de la sesión |
| `createdAt` | DateTime | — |
| `updatedAt` | DateTime | — |

#### `logs`
| Campo | Tipo | Detalle |
|---|---|---|
| `id` | Int (PK, autoincrement) | — |
| `createdAt` | DateTime | Timestamp del evento |
| `section` | VARCHAR(50) | Sección del sistema |
| `action` | Enum LogAction | `CREAR` \| `ACTUALIZAR` \| `ELIMINAR` |
| `affected_count` | Int | Número de registros afectados |
| `description` | VARCHAR(500) | Texto legible del evento |
| `details` | JSON | Detalles específicos (antes/después) |
| `user_id` | String? | ID del usuario ejecutor |
| `user_email` | VARCHAR(200) | Email del usuario ejecutor |
| `user_nombres` | VARCHAR(100)? | Nombre del usuario |
| `user_apellidos` | VARCHAR(100)? | Apellido del usuario |
| `user_role` | VARCHAR(50) | Rol en el momento de la acción |

---

## 5. Backend — NestJS

### 5.1 Configuración Global

**`main.ts`** inicializa la aplicación con:
- `body parser` deshabilitado por defecto; reemplazado con `json({ limit: '50mb' })` y `urlencoded({ limit: '50mb' })` para soportar importaciones masivas.
- **`ValidationPipe` global:** `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`. Toda entrada de red pasa por validación de DTOs.
- **CORS:** origen configurado por `FRONTEND_URL` (default `http://localhost:3000`), con `credentials: true`.
- **Prefijo global:** todas las rutas del API bajo `/api`.
- Puerto: variable `PORT` (default `3001`).

### 5.2 Autenticación y Autorización

**Módulo:** `auth/`

#### Flujo JWT
1. Usuario envía credenciales a `POST /api/auth/login`.
2. `AuthService` busca el usuario, compara la contraseña con `bcrypt.compare`, verifica `isActive`.
3. Se genera un token JWT con payload `{ sub: userId, email, role }` firmado con `JWT_SECRET`, expiración configurada por `JWT_EXPIRES_IN`.
4. El token se devuelve junto a los datos del usuario.
5. El cliente lo almacena en `localStorage` y lo envía en cada petición como `Authorization: Bearer <token>`.
6. `JwtStrategy` extrae el token del header, lo valida y llama a `AuthService.validateUser(payload.sub)` para re-hidratar el usuario completo desde BD.
7. El usuario re-hidratado queda disponible como `req.user` en todos los handlers.

#### Guards
- **`JwtAuthGuard`:** verifica que el token sea válido. Si no hay token o está expirado, responde 401.
- **`RolesGuard`:** verifica que `req.user.role` esté en la lista de roles requeridos del decorador `@Roles(...)`. Si no tiene permisos, responde 403.

#### Decoradores
- `@Roles(Role.WEBMASTER, Role.ADMINISTRATIVO)` — define los roles permitidos para un handler.
- `@GetUser()` y `@GetUser('id')` — inyectan el usuario completo o un campo específico del usuario autenticado.

#### Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de nuevo usuario |
| `POST` | `/api/auth/login` | Login, retorna JWT |

### 5.3 Módulo: Users

**Ruta base:** `/api/users`  
**Módulo:** `users/`

Gestión de cuentas de usuario del sistema. Todos los endpoints requieren `WEBMASTER` salvo `GET /profile`.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/profile` | Cualquier autenticado | Perfil del usuario en sesión |
| `GET` | `/` | WEBMASTER | Lista todos los usuarios |
| `GET` | `/:id` | WEBMASTER | Obtiene un usuario por ID |
| `POST` | `/` | WEBMASTER | Crea nuevo usuario |
| `PATCH` | `/:id` | WEBMASTER | Actualiza usuario (nombre, apellido, cargo, rol, isActive) |
| `DELETE` | `/:id` | WEBMASTER | Elimina usuario |

**Logging:** CREAR, ACTUALIZAR, ELIMINAR → sección `'Usuarios'`.

### 5.4 Módulo: Carreras

**Ruta base:** `/api/carreras`  
**Módulo:** `carreras/`

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | Todos | Lista todas las carreras |
| `GET` | `/stats` | WEBMASTER, ADMINISTRATIVO | Estadísticas (total carreras, total asignaturas) |
| `GET` | `/:id` | Todos | Obtiene carrera por ID |
| `POST` | `/` | WEBMASTER | Crea carrera manualmente |
| `POST` | `/bulk-import` | WEBMASTER | Importación masiva (array de `{ cod_carrera, nombre_carrera }`) |
| `PATCH` | `/:id` | WEBMASTER | Actualiza carrera |
| `DELETE` | `/:id` | WEBMASTER | Elimina carrera individual |
| `DELETE` | `/bulk` | WEBMASTER | Elimina por lista de IDs |
| `DELETE` | `/all` | WEBMASTER | Elimina todas las carreras + resetea secuencia |

**Logging:** todas las mutaciones → sección `'Carreras'` con `affected_count` para operaciones masivas.

### 5.5 Módulo: Asignaturas

**Ruta base:** `/api/asignaturas`  
**Módulo:** `asignaturas/`

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista todas (incluye relación `carrera`) |
| `GET` | `/stats` | WEBMASTER, ADMINISTRATIVO | Estadísticas (total asignaturas) |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene asignatura por ID |
| `POST` | `/` | WEBMASTER | Crea asignatura |
| `POST` | `/bulk-import` | WEBMASTER | Importación masiva |
| `PATCH` | `/:id` | WEBMASTER | Actualiza asignatura |
| `DELETE` | `/:id` | WEBMASTER | Elimina individual |
| `DELETE` | `/bulk` | WEBMASTER | Elimina por IDs |
| `DELETE` | `/all` | WEBMASTER | Elimina todas + resetea secuencia |

**Logging:** sección `'Asignaturas'`.

### 5.6 Módulo: Subtipo Contratos

**Ruta base:** `/api/subtipo-contratos`  
**Módulo:** `subtipo-contratos/`

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista todos |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene por ID |
| `POST` | `/` | WEBMASTER | Crea subtipo |
| `PATCH` | `/:id` | WEBMASTER | Actualiza |
| `DELETE` | `/:id` | WEBMASTER | Elimina individual |
| `DELETE` | `/bulk` | WEBMASTER | Elimina por IDs |
| `DELETE` | `/all` | WEBMASTER | Elimina todos + resetea secuencia |

**Logging:** sección `'Subtipo Contratos'`.

### 5.7 Módulo: Tipo Contratos

**Ruta base:** `/api/tipo-contratos`  
**Módulo:** `tipo-contratos/`

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista todos (incluye relación subtipo) |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene por ID |
| `POST` | `/` | WEBMASTER | Crea tipo de contrato |
| `PATCH` | `/:id` | WEBMASTER | Actualiza |
| `DELETE` | `/:id` | WEBMASTER | Elimina individual |
| `DELETE` | `/bulk` | WEBMASTER | Elimina por IDs |
| `DELETE` | `/all` | WEBMASTER | Elimina todos + resetea secuencia |

**Logging:** sección `'Contratos'`.

### 5.8 Módulo: Profesores (Docentes)

**Ruta base:** `/api/profesores`  
**Módulo:** `profesores/`

Módulo más completo del sistema. Maneja el registro de todos los docentes.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista todos los docentes |
| `GET` | `/stats` | WEBMASTER, ADMINISTRATIVO | Estadísticas: total, activos, por nivel de formación |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene docente por ID |
| `POST` | `/` | WEBMASTER, ADMINISTRATIVO | Crea docente individual |
| `POST` | `/bulk-import` | WEBMASTER, ADMINISTRATIVO | Importación masiva via JSON |
| `PATCH` | `/:id` | WEBMASTER, ADMINISTRATIVO | Actualiza datos del docente |
| `DELETE` | `/:id` | WEBMASTER | Elimina individual |
| `DELETE` | `/bulk` | WEBMASTER | Elimina por lista de IDs |
| `DELETE` | `/all` | WEBMASTER | Elimina todos + resetea secuencia |

**Logging:** sección `'Docentes'`. El bulk-import registra `affected_count` con la cantidad importada.

### 5.9 Módulo: Notas ED

**Ruta base:** `/api/notas-ed`  
**Módulo:** `notas-ed/`

Registra las calificaciones de evaluación docente por cédula, año y período.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista todas con nombre del docente join por cédula |
| `GET` | `/count` | WEBMASTER, ADMINISTRATIVO | Conteo total de notas |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene nota por ID |
| `POST` | `/` | WEBMASTER, ADMINISTRATIVO | Crea nota individual |
| `POST` | `/bulk-import` | WEBMASTER, ADMINISTRATIVO | Importación masiva |
| `PATCH` | `/:id` | WEBMASTER, ADMINISTRATIVO | Actualiza nota |
| `DELETE` | `/:id` | WEBMASTER | Elimina individual |
| `DELETE` | `/bulk` | WEBMASTER | Elimina por IDs |
| `DELETE` | `/all` | WEBMASTER | Elimina todas + resetea secuencia |

**Logging:** sección `'Notas ED'`.

### 5.10 Módulo: Informes (proveedor de análisis)

**Ruta base:** `/api/informes`  
**Módulo:** `informes/`

Este módulo expone los 2 endpoints que el Generador usa para poblar los pickers de análisis. **Ya no lee de las tablas `informes`/`analisis`** (eliminadas). Lee directamente de `analyzer_sessions.graph.result`.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/analisis/metricas` | WEBMASTER, ADMINISTRATIVO | Sesiones cuyo `graph.result.type === 'metric'` |
| `GET` | `/analisis/visualizaciones` | WEBMASTER, ADMINISTRATIVO | Sesiones cuyo `graph.result.type ∈ ['table', 'chart']` |

Ambos endpoints devuelven objetos con `id` (= `analyzerSession.id`), `titulo` (= `session.nombre`) y `resultado` en el formato normalizado que consumen `MetricContext` y `VizContext`.

### 5.11 Módulo: Analyzer

**Ruta base:** `/api/analyzer`  
**Módulo:** `analyzer/`

Motor de análisis interactivo. Cada usuario tiene sus propias sesiones con grafos de pipeline.

#### Endpoints

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/schema` | WEBMASTER, ADMINISTRATIVO | Mapa estático de campos disponibles por entidad |
| `GET` | `/schema/relationships` | WEBMASTER, ADMINISTRATIVO | Mapa de FK entre entidades para el JOIN builder |
| `GET` | `/values/:entity/:field` | WEBMASTER, ADMINISTRATIVO | Valores distintos de un campo (para dropdowns de filtro) |
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista sesiones del usuario autenticado |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene sesión completa (con graph JSON) |
| `POST` | `/` | WEBMASTER, ADMINISTRATIVO | Crea nueva sesión con grafo vacío |
| `PATCH` | `/:id` | WEBMASTER, ADMINISTRATIVO | Actualiza nombre, descripción, grafo o `estado` |
| `POST` | `/:id/execute` | WEBMASTER, ADMINISTRATIVO | Ejecuta el pipeline del grafo |
| `DELETE` | `/:id` | WEBMASTER, ADMINISTRATIVO | Elimina sesión propia |
| `DELETE` | `/bulk` | WEBMASTER | Eliminación masiva de sesiones |
| `DELETE` | `/all` | WEBMASTER | Elimina todas las sesiones |

#### Entidades disponibles en el Analyzer
`docentes`, `contratos`, `subtipo_contratos`, `asignaturas`, `carreras`, `notas_ed`

#### Operaciones disponibles
| Clave | Descripción |
|---|---|
| `CONTAR` | Total de registros |
| `PROMEDIO` | Media de un campo numérico |
| `SUMA` | Suma total |
| `MAXIMO` | Valor máximo |
| `MINIMO` | Valor mínimo |
| `VER_TODOS` | Lista todos los registros sin agregar |

#### Visualizaciones
`METRICA`, `TABLA`, `GRAFICO_BARRAS`, `GRAFICO_LINEAS`, `GRAFICO_PIE`

#### `UpdateSessionDto` — campos aceptados
| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | string? | Nuevo nombre de la sesión |
| `descripcion` | string? | Nueva descripción |
| `graph` | object? | Grafo serializado completo (pipeline + result) |
| `estado` | `'borrador'\|'finalizado'`? | Cambia el estado de la sesión (toggle Finalizar) |

#### Endpoints eliminados en V1.1
Los siguientes endpoints que existían en V1.0 fueron eliminados al desmantelar las tablas `analisis`/`informes`:
- `POST /:id/persist-resultado` — persistía resultado en tablas `analisis`
- `POST /:id/save-result` — creaba registros en `analisis`/`informes`

- `findAll` devuelve el campo `estado` y el campo derivado `resultTipo` (extraído de `graph.result.type`).

### 5.12 Módulo: Documentos

**Ruta base:** `/api/documentos`  
**Módulo:** `documentos/`

Persistencia de los documentos creados con el Generador. El campo `datos` almacena toda la estructura del documento como JSON.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER, ADMINISTRATIVO | Lista todos los documentos |
| `GET` | `/:id` | WEBMASTER, ADMINISTRATIVO | Obtiene documento por ID |
| `POST` | `/` | WEBMASTER, ADMINISTRATIVO | Crea nuevo documento (informe o reporte) |
| `PATCH` | `/:id` | WEBMASTER, ADMINISTRATIVO | Actualiza documento (borrador → finalizado, edición de contenidos) |
| `DELETE` | `/:id` | WEBMASTER, ADMINISTRATIVO | Elimina documento |

**Logging:** sección `'Generador Informe'` o `'Generador Reporte'` según `tipo`.

### 5.13 Módulo: Generador

**Ruta base:** `/api/generador`  
**Módulo:** `generador/`

Motor de compilación y exportación. No persiste datos; toma un documento de la BD (o genera desde plantilla) y devuelve el archivo como stream.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/:id/export?formato=pdf\|docx\|xlsx` | WEBMASTER, ADMINISTRATIVO | Compila y descarga el documento guardado |
| `GET` | `/automatico/:plantillaId/export?formato=pdf\|docx\|xlsx` | WEBMASTER, ADMINISTRATIVO | Genera desde plantilla predefinida con datos en vivo |

#### Plantillas automáticas disponibles (`plantillaId`)

| ID | Nombre | Fuente | Formatos |
|---|---|---|---|
| `docentes-2025` | Reporte de Docentes Año 2025 | `profesores` | PDF, DOCX, XLSX |
| `docentes-2020-2025` | Reporte de Docentes 2020–2025 | `profesores` | PDF, DOCX, XLSX |
| `notas-ed` | Reporte de Notas de Evaluación Docente | `notas_ed` + `profesores` | PDF, DOCX, XLSX |
| `seguimiento-docentes` | Informe de Seguimiento de Docentes | `profesores` | PDF, DOCX (no disponible aún) |

#### Resolución de tokens `$$V` en informes
Cuando el campo `desarrollo` de un contenido contiene tokens de la forma `{{metrica:sessionId}}`, el `GeneradorService` los resuelve en tiempo de exportación **consultando directamente `analyzer_sessions.graph.result`** para cada ID de sesión y sustituyendo el token por el valor numérico del resultado de tipo `metric`.

Formato del token: `{{metrica:N}}` donde `N` es el `id` de `analyzer_sessions` (no un ID de la tabla `analisis` que ya no existe).

#### Librerías de generación
- **PDF:** `pdfkit` — genera documentos con layout institucional (logo, cabecera, tablas, tipografía).
- **DOCX:** `docx` — genera documentos Word estructurados (portada, secciones, tablas, numeración de página).
- **XLSX:** `ExcelJS` — genera hojas de cálculo con datos tabulares, encabezados estilizados.

### 5.14 Módulo: Logs

**Ruta base:** `/api/logs`  
**Módulo:** `logs/`

El módulo es `@Global()`, lo que significa que `LogsService` está disponible en cualquier módulo del backend sin necesidad de importar `LogsModule` individualmente.

| Método | Ruta | Roles | Descripción |
|---|---|---|---|
| `GET` | `/` | WEBMASTER | Lista todos los logs en orden descendente |
| `DELETE` | `/all` | WEBMASTER | Elimina todos los logs y resetea la secuencia |

**`LogsService.log(payload)`** recibe:
```typescript
{
  section: string;      // Nombre de la sección
  action: LogAction;    // CREAR | ACTUALIZAR | ELIMINAR
  affected_count: number;
  details: Record<string, unknown>;
  user: LogUserInfo;    // { id, email, role, nombres?, apellidos? }
}
```
Los errores en el logging nunca interrumpen la operación principal (try/catch silencioso).

---

## 6. Frontend — Next.js

### 6.1 Organización de Rutas

Next.js 14 App Router con dos grupos de rutas:
- `(auth)/` — página de login (actualmente redirige a `/`).
- `(dashboard)/dashboard/` — todas las rutas protegidas del sistema.

La protección de rutas se maneja en el `layout.tsx` del grupo `(dashboard)`: si no hay token en el `authStore`, redirige a `/`.

### 6.2 Estado Global (Zustand)

#### `authStore`
Persiste en `localStorage` bajo la clave `auth-storage`.

| Pieza de estado | Tipo | Descripción |
|---|---|---|
| `user` | `User \| null` | Usuario autenticado |
| `token` | `string \| null` | JWT activo |
| `isAuthenticated` | `boolean` | Derivado del token |

**Acciones:** `login`, `register`, `logout`, `setUser`.

#### `analyzerStore`
Estado en memoria (no persiste). Contiene:

| Pieza de estado | Tipo | Descripción |
|---|---|---|
| `sessions` | `AnalyzerSessionMeta[]` | Lista de sesiones del usuario |
| `activeSession` | `AnalyzerSession \| null` | Sesión abierta actualmente |
| `pipeline` | `PipelineData` | Estado actual del constructor de pipeline |
| `result` | `AnalyzerResult \| null` | Último resultado de ejecución |
| `schema` | `SystemSchema \| null` | Campos disponibles por entidad (cacheado) |
| `relationships` | `RelationshipMap` | FK entre entidades (cacheado) |
| `executing` / `saving` / `savingResult` | `boolean` | Estados de operaciones asíncronas |
| `isFinalized` | `boolean` | Refleja si la sesión activa tiene `estado === 'finalizado'`. Se inicializa al abrir sesión. |
| `activityLogs` / `errorLogs` | arrays | Logs de actividad del panel interno |

**Acciones nuevas en V1.1:**
- `toggleFinalize(token)` — llama a `PATCH /analyzer/:id` con `{ estado: 'borrador' | 'finalizado' }` alternando el estado actual. Actualiza `isFinalized`, `resultSaved` y la `sessions` list en el store.

**Auto-guardado:** el editor de sesión registra un `setTimeout` de 2000 ms tras cada cambio de `pipeline`. Si el timeout completa antes del siguiente cambio, ejecuta `saveCurrent(token)` que hace `PATCH /analyzer/:id` con el grafo serializado.

#### `sidebarStore`
| Pieza de estado | Descripción |
|---|---|
| `isOpen` | Sidebar abierto en móvil |
| `isCollapsed` | Sidebar colapsado en desktop (muestra solo iconos) |

### 6.3 Contextos React

#### `MetricContext`
Provee la lista de sesiones de tipo `metric` (obtenidos de `GET /informes/analisis/metricas`, que internamente lee `analyzer_sessions.graph.result`) al componente `MetricTextArea`. Carga al montar. Expone `{ metrics, loading, refresh }`.

#### `VizContext`
Provee la lista de sesiones de tipo `table` o `chart` para el `VizPicker` del constructor de informes. Mismo patrón que `MetricContext`. Expone `{ vizAnalyses, loading, refresh }`.

### 6.4 Cliente HTTP

**`lib/api.ts`** — instancia Axios configurada con:
- `baseURL`: `NEXT_PUBLIC_API_URL` (default `http://localhost:3001/api`).
- **Interceptor de request:** agrega `Authorization: Bearer <token>` desde `localStorage`.
- **Interceptor de response:** si la respuesta es 401, limpia `localStorage` y redirige a `/login`.

**`lib/analyzerApi.ts`** — funciones `fetch` nativas para el Analyzer (no usa la instancia Axios). Requiere pasar el token explícitamente.

**`lib/generadorApi.ts`** — funciones `exportDocument` y `exportPlantilla` que llaman al backend, reciben el blob y lo descargan automáticamente creando un `<a>` temporal.

### 6.5 Sección: Login

**Ruta:** `/` (raíz)

Pantalla de inicio de sesión con panel izquierdo decorativo (logo Unimeta, copy institucional, tarjetas de características) y formulario a la derecha. Al autenticarse correctamente, redirige a `/dashboard`.

### 6.6 Sección: Dashboard (Home)

**Ruta:** `/dashboard`

Panel de bienvenida con:
- **Tarjetas de estadísticas:** conteos en tiempo real de docentes, carreras, asignaturas, contratos, notas ED y sesiones del Analyzer.
- **Tarjeta "Documentos generados":** muestra el total de documentos (`documentos`) con dos sub-contadores inline: informes (violeta) y reportes (teal). Los conteos se obtienen de `GET /documentos` y se calculan en cliente filtrando por `tipo`. Enlaza a `/dashboard/generador`.
- **Gráfico de actividad:** líneas temporales con `Recharts` mostrando creaciones, modificaciones y eliminaciones del sistema en los últimos 30 días.
- **Accesos rápidos** a las secciones principales.

### 6.7 Sección: Usuarios

**Ruta:** `/dashboard/usuarios` (solo WEBMASTER)

CRUD de cuentas del sistema. Permite crear, editar (nombre, apellido, cargo, rol, estado) y eliminar usuarios. No expone la contraseña existente; al crear se genera el hash en backend.

### 6.8 Sección: Carreras

**Ruta:** `/dashboard/carreras` (solo WEBMASTER)

Tabla de carreras académicas con búsqueda, creación individual, edición inline, eliminación individual y masiva, y modal de **importación masiva** por JSON (`ImportCarrerasModal`).

### 6.9 Sección: Asignaturas

**Ruta:** `/dashboard/asignaturas` (solo WEBMASTER)

Tabla de asignaturas con relación a carrera. Modal de **importación masiva** (`ImportAsignaturasModal`). CRUD completo.

### 6.10 Sección: Contratos

**Ruta:** `/dashboard/contratos` (solo WEBMASTER)

Gestión de tipos de contrato con su subtipo asociado. Muestra la relación `tipo → subtipo` en la tabla.

### 6.11 Sección: Subtipo Contratos

**Ruta:** `/dashboard/subtipo-contratos` (solo WEBMASTER)

Gestión del catálogo de subtipos de contrato. Los subtipos son la categoría padre de los tipos de contrato.

### 6.12 Sección: Docentes

**Ruta:** `/dashboard/docentes` (WEBMASTER + ADMINISTRATIVO)

La sección más densa de gestión. Incluye:
- Tabla con columnas: cédula, nombre, nivel de formación, tipo de contrato, año/período entrada-salida.
- Búsqueda y filtrado en tiempo real.
- Creación y edición individual.
- Eliminación individual y masiva (con checkbox).
- **Importación masiva** via `ImportDocentesModal` con soporte para JSON de cientos de registros.

### 6.13 Sección: Notas ED

**Ruta:** `/dashboard/notas-ed` (WEBMASTER + ADMINISTRATIVO)

Tabla de calificaciones de evaluación docente. El `GET /notas-ed` hace join por cédula con la tabla de profesores para mostrar el nombre del docente. Modal de **importación masiva** (`ImportNotasEdModal`).

### 6.14 Sección: Analyzer

**Ruta base:** `/dashboard/analyzer`

El Analyzer es la herramienta de análisis de datos del sistema. Funciona con el concepto de **sesiones** y **pipelines visuales**.

#### Dashboard de sesiones (`/dashboard/analyzer`)
- Lista todas las sesiones del usuario con nombre, fecha de última modificación, **estado** (`Borrador` en ámbar / `Guardado` en verde — basado en el campo `estado` de la BD) y tipo de último resultado calculado (métrica / tabla / gráfico).
- Permite crear, renombrar y eliminar sesiones.
- Eliminación masiva con selección por checkbox.
- Al crear una sesión, redirige automáticamente al editor.

#### Editor de sesión (`/dashboard/analyzer/[sessionId]`)
Divide la pantalla en dos paneles:
1. **`PipelineCanvas`** (izquierda): constructor visual por pasos.
2. **`ResultsConsole`** (derecha): visualización del resultado y controles de guardado.

#### `PipelineCanvas` — Constructor de pipelines por pasos

El pipeline consta de 6 pasos secuenciales:

| Paso | Nombre | Descripción |
|---|---|---|
| 1 | **Entidad** | Selección del dataset principal (docentes, contratos, asignaturas, carreras, notas_ed, subtipo_contratos) |
| 2 | **JOIN** | Opcional: incorporar datos de una entidad relacionada via FK |
| 3 | **Filtros** | Condiciones sobre campos: `igual`, `mayor`, `menor`, `entre`, `contiene`, `sin_vacios`. Los valores de filtro se cargan dinámicamente con `GET /analyzer/values/:entity/:field` |
| 4 | **Operación** | CONTAR, PROMEDIO, SUMA, MÁXIMO, MÍNIMO, VER_TODOS. Si se selecciona "Agrupar por campo", se activa la lógica de `groupBy` |
| 5 | **Visualización** | METRICA, TABLA, GRAFICO_BARRAS/LINEAS/PIE — solo las opciones compatibles con la operación elegida se presentan |
| 6 | **Ejecutar** | Botón `POST /analyzer/:id/execute` + Ctrl+Enter |

Una **frase en lenguaje natural** se construye dinámicamente en la parte superior del canvas resumiendo el pipeline configurado (ej: _"Contar Docentes agrupado por Tipo de contrato con 1 filtro → gráfico de barras"_).

#### `ResultsConsole` — Panel de resultados
Muestra el resultado según el tipo:
- **METRICA:** número grande con etiqueta.
- **TABLA:** tabla scrolleable con columnas auto-detectadas.
- **GRAFICO_BARRAS / LINEAS / PIE:** gráfico renderizado con `Recharts`.

#### Barra de acciones del `StepResumen` (paso 6)

Ubicada en la parte superior derecha del panel de resumen, debajo del panel de vista previa en vivo:

| Botón | Estado | Comportamiento |
|---|---|---|
| **Guardar sesión** | Siempre visible | Llama a `saveCurrent(token)` — persiste el grafo+resultado en BD sin cambiar `estado`. Muestra ícono `<Save>` + texto en desktop, solo ícono en móvil. |
| **Finalizar** | `isFinalized === false` | Botón **rojo** (`bg-red-500`). Al presionar llama `toggleFinalize(token)` → `PATCH estado: 'finalizado'`. |
| **Finalizado** | `isFinalized === true` | Botón **verde** (`bg-emerald-600`). Al presionar vuelve a `'borrador'` — el análisis regresa al estado borrador. |

El toggle es completamente reversible. El texto y color del botón reflejan siempre el estado real almacenado en la BD.

Botón **"Guardar resultado"** persiste el resultado en el `graph.result` de la sesión (en el campo JSON de `analyzer_sessions`). Esto hace que el resultado quede disponible para los pickers del Generador.

#### Auto-guardado
El grafo del pipeline se guarda automáticamente 2 segundos después de cualquier modificación, sin acción explícita del usuario.

### 6.15 Sección: Generador de Documentos

**Ruta base:** `/dashboard/generador`

#### Lista de documentos (`/dashboard/generador`)
Muestra todos los documentos creados y guardados en la BD. Desde aquí se puede:
- Ver documentos existentes (borradores o finalizados).
- Exportar un documento guardado (PDF/DOCX/XLSX).
- Eliminar documentos.
- Navegar al constructor para crear uno nuevo.

#### Selector de tipo (`/dashboard/generador/nuevo`)
Tarjetas para elegir entre crear un **Informe** o un **Reporte**.

#### Constructor de Informes (`/dashboard/generador/nuevo/informe`)

Flujo de 5 pasos:

| Paso | Nombre | Descripción |
|---|---|---|
| 1 | **Portada** | Título, autor, ciudad, fecha |
| 2 | **Contenido** | N bloques, cada uno con: título, desarrollo (textarea con soporte `$$V`), y vinculación opcional a un análisis de visualización del Analyzer |
| 3 | **Conclusión** | Textarea con soporte `$$V` |
| 4 | **Referencias** | Lista de URLs con generación automática de citación APA |
| 5 | **Exportar** | Selección de formato (PDF/DOCX), acciones de estado y descarga |

**Acciones disponibles en el paso 5 y en la barra de navegación inferior (último paso):**

| Botón | Color | Estado resultante | Exporta |
|---|---|---|---|
| **Guardar borrador** | Gris / gris oscuro | `borrador` | No |
| **Finalizar** | Verde (`emerald`) | `finalizado` | No |
| **Generar PDF / Word** | Degradado teal → emerald | `finalizado` | Sí |

- **Guardar borrador:** persiste el documento con `estado: 'borrador'`. El documento puede recuperarse y editarse desde la lista del Generador.
- **Finalizar:** persiste el documento con `estado: 'finalizado'` sin generar ningún archivo. Permite marcar el informe como cerrado sin necesidad de exportar. Si ya existe un `savedId`, se hace `PATCH`; si no, se hace `POST` y se guarda el ID devuelto.
- **Generar PDF/Word:** guarda con `estado: 'finalizado'` y dispara la descarga del archivo.

**Característica $$V (MetricTextArea):** En los campos de desarrollo y conclusión, el usuario puede escribir `$$V` para abrir un picker flotante que muestra todos los análisis de tipo `metrica` guardados en el Analyzer. Al seleccionar uno, se inserta el token `{{metrica:id}}` en el texto. Al exportar, el backend sustituye cada token con el valor real del análisis.

**VizPicker:** Cada bloque de contenido puede vincular un análisis de tabla o gráfico del Analyzer. El picker muestra el tipo (tabla/gráfico) y el título de cada análisis disponible.

#### Constructor de Reportes (`/dashboard/generador/nuevo/reporte`)

Constructor simplificado de una sola página con:
- Título del reporte.
- Descripción con soporte `$$V`.
- Vinculación a un análisis de visualización del Analyzer.
- Observación adicional.
- Configuración de página (tamaño, orientación, márgenes).

**Acciones disponibles en la barra de botones inferior:**

| Botón | Color | Estado resultante | Exporta |
|---|---|---|---|
| **Guardar borrador** | Gris (borde `gray-200`) | `borrador` | No |
| **Finalizar** | Verde (`emerald-50` / borde `emerald-400`) | `finalizado` | No |
| **Generar PDF / Word / Excel** | Degradado teal → emerald | `finalizado` | Sí |

- **Guardar borrador:** llama a `buildPayload('borrador')`. Requiere únicamente que el título no esté vacío para poder guardar.
- **Finalizar:** llama a `buildPayload('finalizado')`. Se deshabilita si el título está vacío. Permite marcar el reporte como finalizado sin exportar.
- **Generar formato:** llama a `buildPayload('finalizado')` + descarga del archivo. Requiere título, formato seleccionado y visualización vinculada válida.

#### Generador Automático (`/dashboard/generador/automatico`)

Tarjetas de plantillas predefinidas. Cada plantilla consulta los datos en vivo de la BD al momento de generarla. El usuario selecciona el formato y hace click en "Generar". No requiere configuración manual.

### 6.16 Sección: Logs de Auditoría

**Ruta:** `/dashboard/logs` (solo WEBMASTER)

Tabla cronológica de todos los eventos del sistema. Columnas: timestamp, usuario (nombre + email + rol), sección (con link a la sección), acción (badge de color: verde=CREAR, azul=ACTUALIZAR, rojo=ELIMINAR), registros afectados, descripción, detalles expandibles (JSON).

Controles: búsqueda por texto, filtro por acción, filtro por sección, borrar todos los logs.

### 6.17 Componentes de Layout

#### `Sidebar`
- Colapsable en desktop (modo ícono) con `isCollapsed` del `sidebarStore`.
- Deslizable en móvil con overlay oscuro.
- **Secciones colapsables** (acordeón):
  - **Sistema:** Usuarios, Logs (solo WEBMASTER).
  - **Gestión:** Carreras, Asignaturas, Contratos, Subtipo Contratos (WEBMASTER); Docentes, Notas ED (WEBMASTER + ADMINISTRATIVO).
  - **Herramientas:** Analyzer, Generador de Documentos (ambos roles).
- Menú de usuario en la parte inferior con nombre, email, rol y botón de logout.
- Los ítems visibles se filtran según `user.role`.

#### `Header`
Barra superior con botón de menú hamburguesa (móvil), título de sección y accesos rápidos.

---

## 7. Sistema de Roles y Permisos

El sistema tiene **2 roles** definidos como enum Prisma `Role`:

| Rol | Descripción |
|---|---|
| `WEBMASTER` | Acceso total al sistema incluyendo configuración, gestión de usuarios, logs y eliminaciones destructivas |
| `ADMINISTRATIVO` | Acceso de lectura y operaciones de gestión de datos (crear, editar docentes, notas, etc.) pero sin acceso a logs, usuarios ni eliminaciones masivas |

### Matriz de permisos por módulo

| Operación | WEBMASTER | ADMINISTRATIVO |
|---|---|---|
| Gestión de Usuarios | ✅ Completo | ❌ Solo perfil propio |
| Logs de Auditoría | ✅ Ver + Borrar | ❌ Sin acceso |
| Carreras (CRUD) | ✅ Completo | ❌ Solo lectura |
| Asignaturas (CRUD) | ✅ Completo | ❌ Solo lectura |
| Contratos (CRUD) | ✅ Completo | ❌ Solo lectura |
| Subtipo Contratos | ✅ Completo | ❌ Solo lectura |
| Docentes (crear/editar) | ✅ Completo | ✅ Crear + Editar |
| Docentes (eliminar) | ✅ Individual + Masivo | ❌ Sin eliminar |
| Notas ED | ✅ Completo | ✅ Crear + Editar + Eliminar individual |
| Analyzer (sesiones propias) | ✅ Completo | ✅ Completo |
| Analyzer (otras sesiones) | ✅ Masivo + All | ❌ Prohibido |
| Generador de Documentos | ✅ Completo | ✅ Completo |
| Exportación | ✅ | ✅ |

---

## 8. Sistema de Logs de Auditoría

### Secciones instrumentadas

| Sección | Acciones registradas | Módulo |
|---|---|---|
| `Usuarios` | CREAR, ACTUALIZAR, ELIMINAR | `UsersService` |
| `Carreras` | CREAR, ACTUALIZAR, ELIMINAR | `CarrerasService` |
| `Asignaturas` | CREAR, ACTUALIZAR, ELIMINAR | `AsignaturasService` |
| `Contratos` | CREAR, ACTUALIZAR, ELIMINAR | `TipoContratosService` |
| `Subtipo Contratos` | CREAR, ACTUALIZAR, ELIMINAR | `SubtipoContratosService` |
| `Docentes` | CREAR, ACTUALIZAR, ELIMINAR | `ProfesoresService` |
| `Notas ED` | CREAR, ACTUALIZAR, ELIMINAR | `NotasEdService` |
| `Analyzer` | CREAR sesión, ACTUALIZAR sesión, ELIMINAR sesión | `AnalyzerService` |
| `Generador Informe` | CREAR documento, ACTUALIZAR, ELIMINAR | `DocumentosService` |
| `Generador Reporte` | CREAR documento, ACTUALIZAR, ELIMINAR | `DocumentosService` |

### Detalle del registro
Cada entrada de log contiene:
- **Quién:** ID, email, nombre completo y rol del usuario que ejecutó la acción.
- **Qué:** acción y sección.
- **Cuánto:** `affected_count` (especialmente relevante en operaciones masivas).
- **Detalle:** JSON con datos específicos (ej: `{ id, nombre, before: {...}, after: {...} }`).
- **Cuándo:** timestamp automático.

---

## 9. Motor de Análisis (Analyzer Engine)

### Arquitectura del engine

```
PipelineCanvas (Frontend)
        │
        │  PipelineData (JSON)
        ▼
POST /analyzer/:id/execute
        │
        ▼
GraphExecutor.execute(pipeline)
        │
        ├── Construye query Prisma (groupBy / aggregate / findMany)
        ├── Resuelve JOINs en memoria
        ├── Aplica filtros (igual, mayor, menor, entre, contiene, sin_vacios)
        ├── Ejecuta operación (CONTAR, PROMEDIO, SUMA, MAXIMO, MINIMO, VER_TODOS)
        └── Formatea resultado según visualización (METRICA / TABLA / GRAFICO_*)
```

### `type-checker.ts`
Valida que el grafo recibido contenga los tipos de nodos correctos antes de ejecutar. Evita errores de runtime por configuraciones inconsistentes.

### `graph-executor.ts`
Implementa la ejecución del pipeline. Características clave:
- **Mapeo entidad → modelo Prisma:** `docentes → profesor`, `contratos → tipoContrato`, etc.
- **Resolución de FK para etiquetas:** al agrupar por `id_tipo_contrato`, el executor consulta la tabla `tipo_contratos` y sustituye el ID por el nombre legible en las etiquetas del gráfico.
- **groupBy con Prisma:** usa `prisma.xx.groupBy` para operaciones de conteo agrupado.
- **aggregate con Prisma:** usa `prisma.xx.aggregate` para PROMEDIO, SUMA, MAXIMO, MINIMO sobre un campo específico.
- **JOIN en memoria:** cuando hay un JOIN configurado, carga los dos datasets y los une por el campo FK. El campo de la entidad unida se expone con prefijo `join__` en el pipeline.
- **Filtros:** se traducen al objeto `where` de Prisma. El operador `entre` genera `{ gte: v1, lte: v2 }`, `sin_vacios` genera `{ not: null }`.
- **Tiempo de ejecución:** se mide con `Date.now()` y se incluye en el resultado como `executionMs`.

### Persistencia del resultado
Al ejecutar el pipeline, el resultado se guarda automáticamente en `analyzer_sessions.graph.result` mediante `saveCurrent`. El campo `estado` de la sesión permanece en `'borrador'` hasta que el usuario presione **Finalizar** explícitamente.

---

## 10. Motor de Generación de Documentos

### Flujo de exportación

```
GET /api/generador/:id/export?formato=pdf
        │
        ▼
GeneradorService.export(id, formato)
        │
        ├── 1. Carga Documento desde BD (datos JSON)
        ├── 2. Resuelve tokens $$V ({{metrica:sessionId}} → valor real)
        │        └── consulta analyzerSession.graph.result para cada sessionId
        │        └── si result.type === 'metric' extrae el valor numérico
        ├── 3. Para bloques con analisisVinculado:
        │        └── loadVizData(sessionId) lee graph.result
        │        └── normaliza a { tipo, columnas, filas } para tablas
        │        └── normaliza a { tipo, tipoGrafico, datos } para gráficos
        ├── 4. Delega al compilador según formato:
        │        ├── generatePdf(data)    → Buffer
        │        ├── generateDocx(data)   → Buffer
        │        └── generateXlsx(data)   → Buffer
        └── 5. Responde con StreamableFile + headers de Content-Disposition
```

### Formato PDF (`pdfkit`)
- Logo institucional embebido desde el sistema de archivos del backend.
- Portada con título, autor, ciudad y fecha.
- Secciones con encabezados en rojo institucional (#c00).
- Tablas de datos con bordes y líneas alternadas.
- Pie de página con número de página.

### Formato DOCX (`docx`)
- Documento Word con estructura `Document > Section > Paragraph/Table`.
- Portada con `HeadingLevel.TITLE` y metadatos.
- Cada contenido como sección con `HeadingLevel.HEADING_1`.
- Tablas con estilos de celda.
- Encabezado con logo y número de página automático (`PageNumber`).
- Márgenes y tamaño de página configurables para reportes.

### Formato XLSX (`ExcelJS`)
- Hoja de cálculo con encabezado institucional en la fila 1.
- Columnas auto-detectadas a partir de los datos.
- Filas alternadas con fill de color para legibilidad.
- Anchos de columna ajustados automáticamente.

### Plantillas automáticas
Para las plantillas del Generador Automático, `GeneradorService.exportPlantilla(plantillaId, formato)`:
1. Consulta los datos directamente de la BD con queries Prisma optimizados.
2. Construye la estructura `PlantillaTablaData` en memoria.
3. Delega al mismo compilador de formato que los documentos manuales.

---

## 11. Configuración de Entornos

### Backend — `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/unimetadocs?schema=public
JWT_SECRET=secreto-muy-seguro-cambiar-en-produccion
JWT_EXPIRES_IN=24h
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend — `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Valores de producción (Docker Compose)
- `DATABASE_URL`: apunta al servicio `db` interno de Docker (`@db:5432`).
- `JWT_SECRET`: cambiar por un valor fuerte en producción.
- `NEXT_PUBLIC_API_URL`: en Docker Compose se configura como build arg (`http://localhost:3001/api` para acceso desde el host).

---

## 12. Despliegue con Docker

### Servicios definidos en `docker-compose.yml`

| Servicio | Imagen | Puerto |
|---|---|---|
| `db` | `postgres:16-alpine` | `5432:5432` |
| `backend` | Build desde `./backend` | `3001:3001` |
| `frontend` | Build desde `./frontend` | `3000:3000` |
| `pgadmin` | `dpage/pgadmin4:latest` | `5050:5050` |

### Inicio de producción

```bash
docker-compose up --build
```

El backend ejecuta `prisma migrate deploy` antes de iniciar el servidor NestJS, garantizando que el schema de BD esté sincronizado.

### Inicio de desarrollo local

```bash
# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Iniciar PostgreSQL con Docker solamente
docker-compose up db pgadmin -d

# Backend en modo watch
cd backend && npm run start:dev

# Frontend en modo dev
cd frontend && npm run dev
```

Accesos:
- Frontend: `http://localhost:3000`
- API: `http://localhost:3001/api`
- pgAdmin: `http://localhost:5050`

---

## 13. Historial de Cambios

### V1.1.0 — 12 de Marzo 2026

#### Eliminación de tablas legacy (`analisis` + `informes`)
- Las tablas `analisis` e `informes` fueron **eliminadas completamente** de la BD (migración `20260312203044_remove_analisis_table`).
- El Generador ya no depende de esas tablas. Toda la información de resultados vive en `analyzer_sessions.graph.result`.
- **`generador.service.ts`:** `resolveTokens` ahora consulta `analyzerSession.findMany`; nuevo método privado `loadVizData(sessionId)` reemplaza las 3 consultas a `prisma.analisis` en los exportadores PDF/DOCX/XLSX.
- **`analyzer.service.ts`:** eliminados los métodos `persistResultado` y `saveToAnalisis`.
- **`analyzer.controller.ts`:** eliminados los endpoints `POST /:id/persist-resultado` y `POST /:id/save-result`.
- **`analyzerApi.ts`:** eliminadas las funciones `persistResultado` y `saveSessionResult`.
- **`analyzerStore.ts`:** eliminada la llamada a `persistResultado` en `executeSession`; `saveResult` simplificado a `saveCurrent`.
- **`informes.service.ts`:** `getMetricAnalyses` y `getVisualizationAnalyses` ahora leen de `analyzerSession` directamente.
- **`schema.prisma`:** modelos `Informe` y `Analisis` eliminados; cliente Prisma regenerado.

#### Campo `estado` en `analyzer_sessions`
- Nueva columna `estado VARCHAR DEFAULT 'borrador'` (`'borrador'` | `'finalizado'`) añadida a `analyzer_sessions` (migración `20260312205050_add_estado_to_analyzer_sessions`).
- **`UpdateSessionDto`:** acepta `estado?: 'borrador' | 'finalizado'`.
- **`analyzerStore`:** nuevo estado `isFinalized` (boolean), inicializado al abrir sesión. Nueva acción `toggleFinalize(token)` que llama `PATCH /:id` con el nuevo estado.
- Al abrir una sesión (`openSession`), `isFinalized` y `resultSaved` se inicializan según `session.estado`.
- El campo `estado` y el campo derivado `resultTipo` son devueltos por `findAll` (listado de sesiones).

#### Botones del editor de Analyzer (PipelineCanvas — `StepResumen`)
- **"Guardar sesión":** siempre visible en desktop (`sm:inline`). El texto anterior tenía un breakpoint `xs` inexistente en Tailwind que lo ocultaba permanentemente. Corregido a `sm:inline`.
- **"Finalizar" / "Finalizado":** reemplaza el antiguo botón "Guardar resultado" / "Generar". Es un toggle: rojo cuando el análisis está en borrador, verde cuando está finalizado. El estado persiste en BD.
- La prop de `StepResumen` cambió de `resultSaved` / `canSaveResult` / `onSaveResult` a `isFinalized` / `onToggleFinalize`.

#### Lista de sesiones del Analyzer (`/dashboard/analyzer`)
- La columna **Estado** ahora refleja el campo `estado` de la BD en lugar del campo derivado `resultTipo`.
- Badge **"Borrador"** (ámbar) cuando `estado === 'borrador'`.
- Badge **"Guardado"** (verde) cuando `estado === 'finalizado'`.
- Añadidos estilos dark mode a los badges.

#### Corrección de sintaxis JSX — `reporte/page.tsx`
- Eliminado un `>` duplicado en el picker de análisis del constructor de reportes que causaba fallo de compilación en producción (Render).

#### Dark Mode — mejoras visuales
- Soporte dark mode aplicado al `PipelineCanvas` (fondo, bordes, nodos, selector de entidad, botones).
- Sidebar: toggle de colapso y hover states con colores dark correctos.
- Constructor de informe: barra de navegación inferior y botones de acción con estilos dark.
- Badges del estado en la lista del Analyzer con clases `dark:` correctas.

---

*Documento actualizado para UnimetaDocs V1.1.0 — 12 de Marzo 2026.*

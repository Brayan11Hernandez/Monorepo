# Assignment 05 - Task List App

## Descripción
Aplicación web sencilla tipo lista de tareas construida como monorepo. El proyecto incluye frontend, backend y base de datos, con integración a través de una API REST.

## Tecnologías utilizadas
- React + Vite
- Node.js + Express
- MySQL
- Prisma ORM
- Swagger UI
- Doppler

## Estructura del monorepo
- `apps/frontend`
- `apps/backend`

## Funcionalidades
- Crear tareas
- Listar tareas
- Marcar tareas como completadas
- Eliminar tareas

## Variables de entorno
Las variables sensibles fueron gestionadas con Doppler.

Variables principales:
- `DATABASE_URL`
- `PORT`
- `VITE_API_URL`

## Migraciones
Las migraciones de la base de datos se encuentran en:

- `apps/backend/prisma/migrations`

## Base de datos
Se utilizó MySQL como motor de base de datos.  
La estructura fue creada y gestionada mediante Prisma Migrate.

## URLs
- Frontend:[ (http://localhost:5173/](http://localhost:5173/))
- Backend: http://localhost:3000/
- API Docs: http://localhost:3000/docs/

## Evidencia de base de datos
Incluir una captura de pantalla donde se observen las tablas:
- `task`
- `_prisma_migrations`

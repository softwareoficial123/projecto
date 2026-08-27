# High-Traffic Monorepo

## Estructura del Proyecto

- `apps/api-gateway`: Backend (NestJS + Fastify).
- `apps/web`: Frontend (Next.js).
- `packages/database`: Prisma schema y migraciones.
- `packages/logger`: Logger estructurado (Pino).

## Despliegue (Railway)

Este proyecto está configurado para despliegue automatizado mediante `railway.toml`.

- Railway detecta automáticamente los Dockerfiles en la raíz.
- Cada despliegue ejecuta automáticamente las migraciones de Prisma.

## Desarrollo Local

Para arrancar todo el ecosistema (DB + API + WEB) de forma idéntica a producción:

1. Construir imágenes:
   `docker build -t projecto-api:prod -f Dockerfile.api .`
   `docker build -t projecto-web:prod -f Dockerfile.web .`

2. Arrancar:
   `docker-compose -f docker-compose.dev.yml up`

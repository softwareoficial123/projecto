# High-Traffic Monorepo: Plug-and-Play Architecture

Plataforma modular escalable para integraciones de mensajería y orquestación de servicios.

## 1. Estructura del Proyecto

Este monorepo utiliza **Turborepo** y **pnpm** para gestionar múltiples aplicaciones y paquetes:

- **`apps/api-gateway`**: Orquestador central construido con NestJS + Fastify. Gestiona la lógica de negocio y la carga dinámica de módulos.
- **`apps/web`**: Frontend administrativo construido con Next.js.
- **`packages/core`**: Define los contratos maestros (`BaseModule`, `ModuleConfig`) que garantizan la modularidad.
- **`packages/infra-*`**: Adaptadores e integraciones independientes (ej. WhatsApp, TestPlug).
- **`packages/database`**: Capa de persistencia centralizada usando Prisma ORM.
- **`packages/logger`**: Sistema de logging estructurado basado en Pino con soporte para contextos (Scoped Loggers).
- **`packages/domain-messaging`**: Lógica de dominio pura para el manejo de mensajes y eventos.

## 2. Despliegue (Railway & Docker)

El proyecto está listo para producción mediante Dockerfiles optimizados:

- `Dockerfile.api`: Construye y despliega el API Gateway y sus dependencias internas.
- `Dockerfile.web`: Construye y despliega el frontend.

**Automatización:** Cada despliegue en Railway ejecuta automáticamente `prisma migrate deploy`.

## 3. Desarrollo Local Rápido

Para arrancar el ecosistema completo (Base de Datos + API + Web):

1. **Construir Imágenes Locales:**
   ```bash
   docker build -t projecto-api:prod -f Dockerfile.api .
   docker build -t projecto-web:prod -f Dockerfile.web .
   ```

2. **Levantar Contenedores:**
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

3. **Ver Logs:**
   ```bash
   docker compose -f docker-compose.dev.yml logs -f api
   ```

---
*Este proyecto sigue reglas estrictas de calidad. Consulta `DEVELOPING.md` para empezar a contribuir.*

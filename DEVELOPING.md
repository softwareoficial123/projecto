# Manual del Desarrollador: High Traffic Monorepo

Este repositorio contiene la plataforma centralizada para integraciones de mensajería (WhatsApp, Telegram, etc.) y pagos (Mercado Pago, etc.). La arquitectura está diseñada para ser escalable, portable y modular.

## 1. Filosofía de Arquitectura

Trabajamos bajo el patrón de **Bounded Contexts** (Contextos Acotados) y **Adaptadores**:

- `apps/`: Son los puntos de entrada (Interfaces: API Gateway, Web). **NUNCA** se importan entre sí.
- `packages/`: Contienen la lógica y adaptadores.
  - `core/`: Contiene los contratos (interfaces) que **deben** cumplir todas las integraciones.
  - `infra-*/`: Adaptadores que implementan los contratos del `core`.

## 2. Configuración Inicial

```bash
# 1. Instalar dependencias
pnpm install

# 2. Levantar entorno local
pnpm dev
```

## 3. Crear una Nueva Integración

Para añadir un nuevo proveedor (ej. `facebook`), **NO** crees carpetas manualmente. Usa el script automatizado que garantiza la estructura base obligatoria:

```bash
# Genera toda la estructura: src, tests, mappers, servicios
./scripts/init-integration.sh facebook
```

El script creará un paquete en `packages/infra-facebook/`. **Todo nuevo paquete DEBE cumplir con la interfaz `BaseIntegration` definida en `@repo/core`.**

## 4. Calidad y Guardias (Obligatorio)

Este repositorio cuenta con guardias automáticas que impiden commits de código defectuoso o mal estructurado.

- **Pre-commit Hooks:** Al intentar hacer commit, se ejecuta automáticamente:
  1. `typecheck` (TypeScript)
  2. `lint` (ESLint + SonarJS)
  3. `test` (Vitest)
  4. `lint-staged` (Prettier + Validación de arquitectura con `dependency-cruiser`)

**Si el `pre-commit` falla, el código NO se confirma.** Debes corregir los errores para poder hacer commit.

## 5. Reglas de Oro (Arquitectura)

1.  **Arquitectura por Contrato:** Todo paquete `infra-*` debe implementar `BaseIntegration` de `@repo/core`.
2.  **No importaciones cruzadas:** Las aplicaciones (`apps/`) no pueden importar directamente de otras aplicaciones. Deben pasar por paquetes en `packages/`.
3.  **Tests de Regresión:** Ante la corrección de un bug, es **obligatorio** añadir un test que reproduzca el bug.
4.  **Desacople:** Si un paquete crece en complejidad, separa la lógica en `services/` y `mappers/` dentro de su carpeta `src/`.

## 6. Despliegue

El despliegue está automatizado mediante GitHub Actions y Railway.

- Cualquier push a `main` dispara el pipeline de CI.
- El sistema utiliza `turbo` para reconstruir solo las partes afectadas (`--filter`).

# Instrucciones para Agentes IA (GEMINI.md)

Este documento es la guía maestra para cualquier agente IA que trabaje en este repositorio. **Debes leer y seguir estas reglas antes de realizar cualquier cambio.**

## 1. Arquitectura del Proyecto
Este es un monorepo basado en **Turborepo** y **pnpm**.
- **`apps/`**: Puntos de entrada (api-gateway, web).
- **`packages/`**: Lógica compartida y adaptadores.
- **Filosofía**: Arquitectura Plug-and-Play. Cada módulo es independiente y debe implementar `BaseModule` de `@repo/core`.

## 2. Flujo de Trabajo (Git & Issues)
1. **Identificación**: Antes de empezar, busca o crea un **Issue** en GitHub/GitLab.
2. **Branching**: Crea una rama siguiendo el formato: `feat/#ID-nombre`, `fix/#ID-nombre` o `docs/#ID-nombre`.
3. **Desarrollo Modular**:
   - Para nuevas integraciones: Usa obligatoriamente `./scripts/init-integration.sh`.
   - Lógica de negocio en `src/domain/`.
   - Infraestructura en `src/infrastructure/`.
4. **Commit**: Los commits deben ser descriptivos y seguirán [Conventional Commits](https://www.conventionalcommits.org/).

## 3. Calidad y Validación (Mandatorio)
El sistema tiene **Husky** activo. No intentes saltarte los hooks (`--no-verify` está prohibido).
Para validar manualmente antes de un commit, ejecuta:
```bash
pnpm build && pnpm lint && pnpm typecheck && pnpm test && npx depcruise --validate .dependency-cruiser.js .
```

## 4. Reglas de Oro para la IA
- **Modularidad Total**: NUNCA crees dependencias cruzadas entre aplicaciones.
- **Logger Scoped**: Usa siempre `createScopedLogger` de `@repo/logger` dentro de los módulos.
- **Configuración Local**: Cada módulo debe tener su `src/module.config.ts`.
- **Fallo Seguro**: Si una funcionalidad falla, el sistema debe degradarse graciosamente, no colapsar.
- **Documentación**: Si creas una función compleja, actualiza el `README.md` del paquete correspondiente.

## 5. Comandos Útiles
- `pnpm dev`: Inicia el entorno de desarrollo.
- `pnpm build`: Construye todos los paquetes.
- `pnpm test`: Ejecuta la suite de pruebas.

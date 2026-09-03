# Manual del Desarrollador: Contribución y Arquitectura

Bienvenido al equipo. Este documento detalla cómo contribuir manteniendo la integridad y modularidad del sistema.

## 1. Filosofía de Arquitectura: Plug-and-Play

Operamos bajo una arquitectura **Contract-First**. Nada en el sistema depende directamente de una implementación, sino de interfaces definidas en `@repo/core`.

- **Aislamiento Total**: Las aplicaciones (`apps/`) NUNCA se importan entre sí.
- **Independencia de Módulos**: Si eliminas una carpeta `infra-*`, el sistema debe arrancar correctamente, simplemente desactivando esa funcionalidad.
- **Lógica en el Dominio**: La lógica de negocio pesada debe vivir en `src/domain/` de cada módulo, no en los controladores del API.

## 2. Configuración Inicial

```bash
# 1. Instalar dependencias del workspace
pnpm install

# 2. Construir paquetes base
pnpm build

# 3. Levantar entorno de desarrollo
pnpm dev
```

## 3. Creación de Nuevos Módulos o Librerías

**REGLA DE ORO**: No crees carpetas de paquetes manualmente. Usa el script automatizado:

```bash
# Genera estructura, contratos BaseModule y configuraciones locales
./scripts/init-integration.sh mi-nueva-lib
```

### Pasos tras la creación:
1. Define los objetivos y dependencias en `packages/infra-mi-nueva-lib/src/module.config.ts`.
2. Implementa la lógica en `src/domain/`.
3. Registra el módulo en `apps/api-gateway/src/main.ts` usando el `ModuleRegistry`.

## 4. Reglas de Oro (Arquitectura)

1. **Arquitectura por Contrato**: Todo paquete `infra-*` debe implementar `BaseModule` de `@repo/core`.
2. **No importaciones cruzadas**: Las aplicaciones (`apps/`) no pueden importar directamente de otras aplicaciones. Deben pasar por paquetes en `packages/`.
3. **Tests de Regresión**: Ante la corrección de un bug, es **obligatorio** añadir un test que reproduzca el bug.
4. **Desacople**: Si un paquete crece en complejidad, separa la lógica en `src/domain/` (lógica pura) y `src/infrastructure/` (implementación).

## 5. Control de Calidad (Obligatorio)

No podrás confirmar código (Git Commit) si no superas los **Quality Gates**:

- **Pre-commit Hooks (Husky)**:
  1. `typecheck`: Valida integridad de tipos global.
  2. `lint`: Aplica reglas de SonarJS y ESLint.
  3. `test`: Ejecuta pruebas con Vitest.
  4. `depcruise`: Valida que no haya importaciones prohibidas o circulares.

**Comando de validación manual:**
```bash
pnpm build && pnpm lint && pnpm typecheck && pnpm test && npx depcruise --validate .dependency-cruiser.js .
```

## 6. Gestión de Tareas e IA

- **Issues**: Todas las tareas comienzan con un Issue. Usa las plantillas de `bug_report` o `feature_request`.
- **Ramas**: Formato `feat/#ID-nombre` o `fix/#ID-nombre`.
- **Agentes IA**: Si utilizas un agente IA, asegúrate de que lea el archivo `GEMINI.md` en la raíz antes de proceder.

## 7. Logging y Debugging

Usa siempre el logger contextual:
```typescript
const logger = createScopedLogger('mi-modulo');
logger.info('Tarea completada'); // Saldrá con el tag del módulo en los logs
```

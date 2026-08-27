#!/bin/sh
set -e

# Ejecuta las migraciones de Prisma antes de iniciar el servidor.
# Si la migración falla, el contenedor se detiene inmediatamente (set -e).
./node_modules/.bin/prisma migrate deploy --schema=packages/database/schema.prisma

# Reemplaza el proceso del shell por el de Node (PID 1),
# garantizando el manejo correcto de señales (SIGTERM/SIGINT).
exec node apps/api-gateway/dist/index.js

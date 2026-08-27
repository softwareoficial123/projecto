#!/bin/sh
set -e

# Ejecutar migraciones de Prisma
echo "Running Prisma migrations..."
./node_modules/.bin/prisma migrate deploy --schema=packages/database/schema.prisma

# Iniciar la aplicación principal
echo "Starting API Gateway..."
node apps/api-gateway/dist/index.js

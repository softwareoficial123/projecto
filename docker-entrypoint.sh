#!/bin/sh
set -e

log() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S')] $1"
}

log "Iniciando proceso de despliegue del contenedor..."

# Ejecutar migraciones de Prisma
log "Running Prisma migrations..."
./node_modules/.bin/prisma migrate deploy --schema=packages/database/schema.prisma
log "Migraciones finalizadas con éxito."

# Iniciar la aplicación principal
log "Iniciando API Gateway..."
node apps/api-gateway/dist/index.js

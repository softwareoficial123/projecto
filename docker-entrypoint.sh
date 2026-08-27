#!/bin/sh
set -e

echo "[$(date +'%Y-%m-%dT%H:%M:%S')] Aplicando migraciones de base de datos..."
# La ruta es relativa al WORKDIR (/app) donde se copian los archivos
./node_modules/.bin/prisma migrate deploy --schema=packages/database/schema.prisma

echo "[$(date +'%Y-%m-%dT%H:%M:%S')] Iniciando aplicación..."
node dist/main.js

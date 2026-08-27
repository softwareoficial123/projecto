#!/bin/bash
# Script maestro de arranque local

echo "1. Limpiando contenedores anteriores..."
docker-compose -f docker-compose.dev.yml down

echo "2. Arrancando Base de Datos..."
docker-compose -f docker-compose.dev.yml up -d

echo "3. Esperando BD..."
sleep 5

echo "4. Ejecutando migraciones..."
export DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
pnpm --filter database migrate:deploy

echo "5. Arrancando servicios en caliente..."
# Ejecutamos turbo dev en segundo plano para manejar los servicios
pnpm dev &
echo "Servicios arrancados en background. PID: $!"

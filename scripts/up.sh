#!/bin/bash
# Script maestro de arranque local (sin depender de docker-compose)
set -e

echo "--- 1. Limpiando contenedores anteriores ---"
docker rm -f monorepo_db || true

echo "--- 2. Arrancando Base de Datos ---"
docker run -d --name monorepo_db -p 5432:5432 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydb \
  postgres:15-alpine

echo "--- 3. Esperando que la BD esté lista ---"
until docker exec monorepo_db pg_isready -U user -d mydb; do
  echo "Esperando a Postgres..."
  sleep 2
done

echo "--- 4. Ejecutando migraciones ---"
export DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
pnpm --filter database migrate:deploy

echo "--- 5. Arrancando servicios de desarrollo ---"
# Limpiar procesos previos por si acaso
pkill -f next || true
pkill -f ts-node-dev || true
pkill -f turbo || true

pnpm dev

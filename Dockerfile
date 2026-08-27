# Stage 1: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Pinned to match packageManager in package.json to avoid drift between
# the latest pnpm release and the version this repo was tested against.
RUN npm install -g pnpm@9.0.0

# Copiar package.json y pnpm-lock.yaml para instalar dependencias reproducibles en Alpine
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instalar dependencias usando el lockfile del repositorio
# --verbose para exponer logs detallados y detectar en qué paso falla la instalación
RUN pnpm install --frozen-lockfile --verbose
RUN echo "Dependencies installed successfully"

# Copiar el resto del proyecto
COPY . .

# Build separado del install para aislar fallos de compilación en logs propios
RUN pnpm build
RUN echo "Build completed successfully"

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/dist ./apps/api-gateway/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Verificación explícita de que el artefacto de build fue copiado correctamente.
# Ayuda a diferenciar un fallo en el build (Stage 1) de un fallo en la copia (Stage 2).
RUN test -f /app/apps/api-gateway/dist/index.js || (echo "ERROR: dist/index.js not found" && exit 1)

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Lógica Zero-Touch: Migración previa al inicio del servidor.
# Se usa formato JSON exec (en lugar de "sh -c") para que el proceso
# reciba y maneje correctamente las señales del contenedor (SIGTERM/SIGINT).
CMD ["./docker-entrypoint.sh"]

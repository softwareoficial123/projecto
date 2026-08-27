# --- Etapa 1: Builder ---
FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN npm install -g pnpm

# Copiar configuración del workspace
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* turbo.json ./
# Copiar configuración de aplicaciones y paquetes
COPY apps/web ./apps/web
COPY packages ./packages

# Instalar TODO (para poder ejecutar builds)
RUN pnpm install

# Construir específicamente el frontend
RUN pnpm --filter web build

# Desplegar la app construida a una carpeta limpia /app/dist
RUN pnpm --filter web --prod deploy /app/dist

# --- Etapa 2: Runner ---
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Crear usuario seguro
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nodejs

# Copiar desde el builder (artefactos listos)
COPY --from=builder --chown=nodejs:nodejs /app/dist .

USER nodejs

# Next.js standalone suele ejecutar el servidor en un archivo llamado server.js
CMD ["node", "apps/web/dist/server.js"]

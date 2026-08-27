# Stage 1: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm

# Copiar package.json y el pnpm-lock.yaml (generado localmente y limpio)
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instalar dependencias usando --frozen-lockfile para reproducibilidad
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente explícitamente
COPY apps ./apps
COPY packages ./packages
COPY turbo.json ./turbo.json
COPY eslint.config.mjs ./eslint.config.mjs
COPY vitest.config.ts ./vitest.config.ts
COPY scripts ./scripts
COPY .dockerignore ./.dockerignore
# Copiar también el dockerignore

RUN pnpm build

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/dist ./apps/api-gateway/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Lógica Zero-Touch: Migración previa al inicio del servidor
CMD ["./docker-entrypoint.sh"]

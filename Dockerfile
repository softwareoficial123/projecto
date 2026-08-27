# Stage 1: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm

# Copiar package.json
COPY package.json ./

# Asegurarse de que no haya pnpm-lock.yaml previo para forzar una generación nueva y compatible con Alpine
RUN rm -f pnpm-lock.yaml

# Instalar dependencias (se generará un pnpm-lock.yaml compatible con Alpine)
RUN pnpm install

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

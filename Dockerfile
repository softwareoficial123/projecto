# Stage 1: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm
COPY . .
RUN rm -f pnpm-lock.yaml # Forzar a pnpm a generar un nuevo lockfile compatible con Alpine
RUN pnpm install
RUN pnpm build

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/dist ./apps/api-gateway/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/package.json ./package.json

# Lógica Zero-Touch: Migración previa al inicio del servidor
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy --schema=packages/database/schema.prisma && node apps/api-gateway/dist/index.js"]

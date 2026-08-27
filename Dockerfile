# Stage 1: Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

# Copiar archivos necesarios para producción
COPY . .

# Lógica Zero-Touch: Migración previa al inicio del servidor
CMD ["sh", "-c", "npx prisma migrate deploy --schema=packages/database/schema.prisma && node apps/api-gateway/dist/index.js"]

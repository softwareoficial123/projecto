# Stage 1: Runner
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

# Copiar archivos necesarios para producción
COPY . .
# (En un escenario real, aquí se instalarían dependencias y se compilaría)

# Lógica Zero-Touch: Migración previa al inicio del servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node apps/api-gateway/dist/index.js"]

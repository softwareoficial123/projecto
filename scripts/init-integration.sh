#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Uso: ./scripts/init-integration.sh <nombre-integracion>"
  exit 1
fi

INTEGRATION_NAME=$1
DIR="packages/infra-$INTEGRATION_NAME"

echo "Creando estructura para $INTEGRATION_NAME en $DIR..."

mkdir -p "$DIR/src/internal" "$DIR/src/mappers" "$DIR/src/services" "$DIR/tests"

# package.json
cat <<EOF > "$DIR/package.json"
{
  "name": "@repo/infra-$INTEGRATION_NAME",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "dependencies": {
    "@repo/core": "workspace:*"
  }
}
EOF

# index.ts (El contrato obligatorio)
cat <<EOF > "$DIR/src/index.ts"
import { BaseIntegration } from '@repo/core';

export class ${INTEGRATION_NAME^}Adapter implements BaseIntegration {
  readonly id = '$INTEGRATION_NAME';

  async initialize(): Promise<void> {
    // Inicializar cliente
  }

  async healthcheck(): Promise<{ status: 'healthy' | 'unhealthy' }> {
    return { status: 'healthy' };
  }
}
EOF

echo "Estructura creada en $DIR. ¡Ya puedes empezar a desarrollar!"
EOF

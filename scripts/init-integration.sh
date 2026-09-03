#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Uso: ./scripts/init-integration.sh <nombre-modulo>"
  exit 1
fi

MODULE_NAME=$1
DIR="packages/infra-$MODULE_NAME"

echo "Creando estructura Plug-and-Play para $MODULE_NAME en $DIR..."

mkdir -p "$DIR/src/domain" "$DIR/src/infrastructure" "$DIR/tests"

# package.json
cat <<EOF > "$DIR/package.json"
{
  "name": "@repo/infra-$MODULE_NAME",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "dependencies": {
    "@repo/core": "workspace:*",
    "@repo/logger": "workspace:*"
  }
}
EOF

# src/module.config.ts
cat <<EOF > "$DIR/src/module.config.ts"
import { ModuleConfig } from '@repo/core';

export const config: ModuleConfig = {
  metadata: {
    name: '$MODULE_NAME',
    version: '1.0.0',
    description: 'Módulo de integración para $MODULE_NAME',
    goals: ['Conectividad con API', 'Manejo de eventos'],
  },
  dependencies: {
    modules: [],
  },
  settings: {
    enabled: true,
  },
};
EOF

INTEGRATION_CLASS_NAME=$(echo "$MODULE_NAME" | sed -r 's/(^|-)([a-z])/\U\2/g')

# src/index.ts (Implementación BaseModule)
cat <<EOF > "$DIR/src/index.ts"
import { BaseModule, ModuleConfig } from '@repo/core';
import { Logger } from 'pino';
import { config } from './module.config';

export class ${INTEGRATION_CLASS_NAME}Module implements BaseModule<unknown, Logger> {
  readonly id = '$MODULE_NAME';
  readonly config: ModuleConfig = config;
  private logger?: Logger;

  async initialize(context: { logger: Logger }): Promise<void> {
    this.logger = context.logger;
    this.logger.info('$MODULE_NAME inicializado correctamente');
  }

  async healthcheck(): Promise<{ status: 'healthy' | 'unhealthy' }> {
    return { status: 'healthy' };
  }
}
EOF

echo "Estructura modular creada en $DIR."
echo "Configura tus objetivos en $DIR/module.config.ts"

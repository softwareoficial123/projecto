import { ModuleConfig } from '@repo/core';

export const config: ModuleConfig = {
  metadata: {
    name: 'test-plug',
    version: '1.0.0',
    description: 'Módulo de integración para test-plug',
    goals: ['Conectividad con API', 'Manejo de eventos'],
  },
  dependencies: {
    modules: [],
  },
  settings: {
    enabled: true,
  },
};

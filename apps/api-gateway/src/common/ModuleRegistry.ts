import { BaseModule } from '@repo/core';
import { createScopedLogger } from '@repo/logger';
import { Logger } from 'pino';

export class ModuleRegistry {
  private modules: Map<string, BaseModule<unknown, Logger>> = new Map();
  private logger = createScopedLogger('ModuleRegistry');

  async register(module: BaseModule<unknown, Logger>): Promise<void> {
    const moduleId = module.id;
    
    try {
      this.logger.info(`Registrando módulo: ${moduleId} (v${module.config.metadata.version})`);
      
      // Validar dependencias (simplificado por ahora)
      if (module.config.dependencies.modules) {
        for (const dep of module.config.dependencies.modules) {
          if (!this.modules.has(dep)) {
            this.logger.warn(`Módulo ${moduleId} depende de ${dep}, que aún no ha sido registrado.`);
          }
        }
      }

      await module.initialize({
        logger: createScopedLogger(moduleId),
      });

      this.modules.set(moduleId, module);
      this.logger.info(`Módulo ${moduleId} registrado y activado.`);
    } catch (error) {
      this.logger.error({ err: error }, `Error al inicializar el módulo ${moduleId}`);
      // El sistema sigue funcionando sin este módulo
    }
  }

  getModule<T extends BaseModule<unknown, Logger>>(id: string): T | undefined {
    return this.modules.get(id) as T;
  }

  async getStatus() {
    const status: Record<string, unknown> = {};
    for (const [id, module] of this.modules.entries()) {
      status[id] = await module.healthcheck();
    }
    return status;
  }
}

export const registry = new ModuleRegistry();

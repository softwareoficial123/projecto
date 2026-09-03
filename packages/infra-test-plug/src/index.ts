import { BaseModule, ModuleConfig } from '@repo/core';
import { Logger } from 'pino';
import { config } from './module.config';

export class TestPlugModule implements BaseModule<unknown, Logger> {
  readonly id = 'test-plug';
  readonly config: ModuleConfig = config;
  private logger?: Logger;

  async initialize(context: { logger: Logger }): Promise<void> {
    this.logger = context.logger;
    this.logger.info('test-plug inicializado correctamente');
  }

  async healthcheck(): Promise<{ status: 'healthy' | 'unhealthy' }> {
    return { status: 'healthy' };
  }
}

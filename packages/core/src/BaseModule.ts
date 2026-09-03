export interface ModuleMetadata {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly goals: string[];
}

export interface ModuleDependencies {
  readonly modules?: string[];
  readonly functions?: string[];
}

export interface ModuleConfig {
  readonly metadata: ModuleMetadata;
  readonly dependencies: ModuleDependencies;
  readonly settings: Record<string, unknown>;
}

export interface BaseModule<T = unknown, L = unknown> {
  readonly id: string;
  readonly config: ModuleConfig;
  
  initialize(context: { logger: L }): Promise<void>;
  healthcheck(): Promise<{
    status: "healthy" | "unhealthy";
    details?: T;
  }>;
  shutdown?(): Promise<void>;
}

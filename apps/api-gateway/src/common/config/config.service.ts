import { Injectable } from "@nestjs/common";
import { env } from "../../env";

@Injectable()
export class ConfigService {
  get<K extends keyof typeof env>(key: K): (typeof env)[K] {
    return env[key];
  }
}

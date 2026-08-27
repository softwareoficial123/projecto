import { Injectable } from "@nestjs/common";
import { ConfigService } from "../../common/config/config.service";

@Injectable()
export class GeminiService {
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get("GEMINI_API_KEY") || "";
  }

  async generate(prompt: string): Promise<string> {
    // Ejemplo de encapsulación del SDK
    // const client = new GoogleGenerativeAI(this.apiKey);
    return `Simulación de respuesta para prompt: ${prompt} usando llave configurada.`;
  }
}

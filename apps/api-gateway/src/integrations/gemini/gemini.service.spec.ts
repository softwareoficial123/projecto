import { describe, it, expect, beforeEach } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { GeminiService } from "./gemini.service";
import { ConfigService } from "../../common/config/config.service";

describe("GeminiService", () => {
  let service: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        {
          provide: ConfigService,
          useValue: { get: () => "test-key" },
        },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should generate content", async () => {
    const result = await service.generate("Hello");
    expect(result).toContain("Hello");
  });
});

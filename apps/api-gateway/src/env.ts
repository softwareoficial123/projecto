import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL debe ser una URL válida")
    .default("postgresql://user:password@localhost:5432/mydb"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET debe tener al menos 32 caracteres")
    .default("super-secret-key-de-al-menos-32-caracteres"),
  PORT: z.string().default("3001"),
  GEMINI_API_KEY: z.string().optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Error de configuración en variables de entorno:");
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;
export type Env = z.infer<typeof envSchema>;

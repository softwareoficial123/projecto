import { test, expect } from "@playwright/test";

interface LogRequest {
  level: string;
  message: string;
  platform: string;
  timestamp: string;
}

test("verificar envio estructurado de logs de todos los niveles", async ({
  page,
}) => {
  // Interceptar la petición de logs al backend
  const logRequests: LogRequest[] = [];
  page.on("request", async (request) => {
    if (request.url().includes("/api/logs") && request.method() === "POST") {
      const data = (await request.postDataJSON()) as LogRequest;
      logRequests.push(data);
    }
  });

  // Navegar a la página
  await page.goto("http://localhost:8080/");

  // Disparar logs desde el navegador
  await page.evaluate(() => {
    console.log("Test Info Log");
    console.warn("Test Warn Log");
    console.error("Test Error Log");
  });

  // Esperar a que se procesen las peticiones verificando la cantidad
  await expect.poll(() => logRequests.length).toBeGreaterThanOrEqual(3);

  // Verificar la estructura de al menos uno
  const errorLog = logRequests.find((req) => req.level === "error");
  expect(errorLog).toBeDefined();
  expect(errorLog?.platform).toBe("frontend");
  expect(errorLog?.message).toContain("console.error");
  expect(errorLog?.timestamp).toBeDefined();
});

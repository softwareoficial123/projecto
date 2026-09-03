import { test, expect } from '@playwright/test';

test('verificar logs de consola', async ({ page }) => {
  // Escuchar logs de consola
  page.on('console', msg => console.log(`BROWSER LOG: [${msg.type()}] ${msg.text()}`));
  
  // Escuchar errores de página
  page.on('pageerror', exception => console.log(`BROWSER ERROR: ${exception}`));

  // Navegar a la página raíz
  // Asumimos que el servidor de desarrollo o producción está corriendo en 8080
  await page.goto('http://localhost:8080/');

  // Esperar un momento para asegurar que los scripts carguen y logueen
  await page.waitForTimeout(2000);
});

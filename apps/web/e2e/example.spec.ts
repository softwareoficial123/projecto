import { test, expect } from '@playwright/test';

test('has welcome message', async ({ page }) => {
  await page.goto('http://localhost:3002/test-tenant');
  await expect(page.getByText('¡Bienvenido a CRM Projecto!')).toBeVisible();
});

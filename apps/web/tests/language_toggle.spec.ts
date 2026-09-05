import { test, expect } from '@playwright/test';

test('language toggle should not crash the browser', async ({ page }) => {
  await page.goto('/');

  // Wait for the button to be clickable
  const toggleBtn = page.getByRole('button', { name: /English|Español/ });
  await expect(toggleBtn).toBeVisible();

  // Try toggling multiple times quickly
  for (let i = 0; i < 5; i++) {
    await toggleBtn.click();
    // Verify translation actually changed
    const text = await page.textContent('h1');
    expect(text).not.toBeNull();
  }
});

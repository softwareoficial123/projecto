# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: apps/web/tests/language_toggle.spec.ts >> language toggle should not crash the browser
- Location: apps/web/tests/language_toggle.spec.ts:3:5

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('language toggle should not crash the browser', async ({ page }) => {
> 4  |   await page.goto('/');
     |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  5  | 
  6  |   // Wait for the button to be clickable
  7  |   const toggleBtn = page.getByRole('button', { name: /English|Español/ });
  8  |   await expect(toggleBtn).toBeVisible();
  9  | 
  10 |   // Try toggling multiple times quickly
  11 |   for (let i = 0; i < 5; i++) {
  12 |     await toggleBtn.click();
  13 |     // Verify translation actually changed
  14 |     const text = await page.textContent('h1');
  15 |     expect(text).not.toBeNull();
  16 |   }
  17 | });
  18 | 
```
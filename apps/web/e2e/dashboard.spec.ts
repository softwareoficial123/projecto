import { test, expect } from "@playwright/test";

test("dashboard page loads", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await expect(page.locator("h1")).toHaveText("Dashboard");
});

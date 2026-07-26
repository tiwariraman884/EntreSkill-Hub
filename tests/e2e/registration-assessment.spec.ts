import { test, expect } from "@playwright/test";

test.describe("Registration and Assessment Flow", () => {
  test("user can register and see assessment page", async ({ page }) => {
    await page.goto("/register");

    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/assessment/);
  });
});

import { test, expect } from "@playwright/test";

test.describe("Critical User Journeys", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("homepage loads", async ({ page }) => {
    await expect(page.locator("text=EntreSkill Hub")).toBeVisible();
  });

  test("navigation links are accessible", async ({ page }) => {
    await expect(page.locator('a[href="/learn"]')).toBeVisible();
    await expect(page.locator('a[href="/mentors"]')).toBeVisible();
    await expect(page.locator('a[href="/assessment"]')).toBeVisible();
  });
});

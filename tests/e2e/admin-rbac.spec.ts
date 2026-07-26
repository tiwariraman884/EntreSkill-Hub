import { test, expect } from "@playwright/test";

test.describe("Admin RBAC", () => {
  test("non-admin is blocked from /admin", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
  });
});

import { expect, test } from "@playwright/test";

test.describe("Phoenix job operations app", () => {
  test("customer timeline is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /phoenix epoxy pros job app/i })).toBeVisible();
    await expect(page.getByText(/estimate received/i)).toBeVisible();
    await expect(page.getByText(/proposal sent/i)).toBeVisible();
    await expect(page.getByText(/final walkthrough/i)).toBeVisible();
  });

  test("company view is reachable", async ({ page }) => {
    await page.goto("/company");
    await expect(page.getByText(/company/i)).toBeVisible();
    await expect(page.getByText(/change order/i)).toBeVisible();
  });
});

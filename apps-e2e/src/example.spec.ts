import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect hero heading to reflect console branding.
  await expect(page.locator('h1')).toHaveText(/Asset Management Console/);
});

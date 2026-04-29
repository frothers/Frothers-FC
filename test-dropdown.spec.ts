import { test, expect } from '@playwright/test';

test('dropdown updates the season state', async ({ page }) => {
  // Listen for console errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // Navigate to graphs2
  await page.goto('/stats2');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Find the dropdown and check it's visible
  const dropdown = page.locator('select[name="selectedYear"]');
  await expect(dropdown).toBeVisible();

  // Get initial value
  const initialValue = await dropdown.inputValue();
  console.log('Initial dropdown value:', initialValue);

  // Select a different option (not "all")
  const options = await dropdown.locator('option').all();
  console.log('Available options:', await Promise.all(options.map(o => o.textContent())));

  // Select the second option if available
  if (options.length > 1) {
    await dropdown.selectOption({ index: 1 });
    const newValue = await dropdown.inputValue();
    console.log('New dropdown value after selection:', newValue);
  }

  // Check for console errors
  console.log('Console errors:', errors);
  expect(errors.length).toBe(0);
});

import { test, expect } from '@playwright/test';

test.describe('Settings View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Settings' }).click();
  });

  test('should allow entering API key', async ({ page }) => {
    await page.route('**/generativelanguage.googleapis.com/**', route => {
      route.abort(); 
    });

    const apiKeyInput = page.getByPlaceholder('Enter your API Key...');
    await expect(apiKeyInput).toBeVisible();
    
    await apiKeyInput.fill('fake-api-key-123');
    
    await page.reload();
    await page.getByRole('button', { name: 'Settings' }).click();
    await expect(apiKeyInput).toHaveValue('fake-api-key-123');
  });

  test('should toggle dark mode', async ({ page }) => {
    const appContainer = page.locator('#root > div').first();
    const themeToggle = page.locator('header button').first(); 
    
    await themeToggle.click();
    await expect(appContainer).toHaveClass(/dark/);
    
    await themeToggle.click();
    await expect(appContainer).not.toHaveClass(/dark/);
  });
});

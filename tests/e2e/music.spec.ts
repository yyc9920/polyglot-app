import { test, expect } from '@playwright/test';

test.describe('Music View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Music' }).click();
  });

  test('should display search input and playlist header', async ({ page }) => {
    await expect(page.getByPlaceholder('Search song or artist...')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'My Playlist' })).toBeVisible();
  });

  test('should show warning if YouTube API key is missing', async ({ page }) => {
    await page.getByPlaceholder('Search song or artist...').fill('Test Song');
    
    const dialogPromise = page.waitForEvent('dialog');
    
    await page.getByRole('button', { name: 'Search' }).click();
    
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Please set your YouTube API Key');
    await dialog.dismiss();
  });
});

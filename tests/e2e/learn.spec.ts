import { test, expect } from '@playwright/test';
import { seedData, SAMPLE_PHRASE } from './test-utils';

test.describe('Learn View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show empty state initially if no items', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByRole('button', { name: 'Learn' }).click();
    await expect(page.getByText('No items to learn')).toBeVisible();
  });

  test('should display flashcards when items exist', async ({ page }) => {
    await seedData(page, [{ 
      ...SAMPLE_PHRASE, 
      meaning: 'Dog', 
      sentence: 'This is a dog',
      pronunciation: 'Dog',
      tags: ['Animal'] 
    }]);

    await page.getByRole('button', { name: 'Learn' }).click();

    await expect(page.getByText('Dog')).toBeVisible();
    
    await page.getByText('Dog').click(); 
    await expect(page.getByText('This is a dog')).toBeVisible();
  });

  test('should toggle between card and list view', async ({ page }) => {
    await seedData(page, [{
      ...SAMPLE_PHRASE,
      meaning: 'Cat',
      sentence: 'Meow'
    }]);
    
    await page.getByRole('button', { name: 'Learn' }).click();

    await page.getByTitle('List View').click();
    await expect(page.getByText('Cat')).toBeVisible();
    await expect(page.getByText('Meow')).toBeVisible();

    await page.getByTitle('Card View').click();
    await expect(page.getByText('Cat')).toBeVisible(); 
  });
});

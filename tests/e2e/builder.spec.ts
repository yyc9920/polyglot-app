import { test, expect } from '@playwright/test';

test.describe('Builder View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Build' }).click();
  });

  test('should allow manual entry of new phrases', async ({ page }) => {
    await page.getByRole('button', { name: 'Manual' }).click();

    await page.getByPlaceholder('Meaning').fill('Apple');
    await page.getByPlaceholder('Sentence').fill('I eat an apple');
    await page.getByPlaceholder('Pronunciation').fill('Ap-ple');
    await page.getByPlaceholder('Tags (comma separated)').fill('Fruit, Food');

    await page.getByRole('button', { name: 'Add Item' }).click();

    await expect(page.getByRole('heading', { name: 'Stored Items' })).toBeVisible();
    await expect(page.getByText('Apple', { exact: true })).toBeVisible();
    await expect(page.getByText('I eat an apple')).toBeVisible();
  });

  test('should show validation error or disable button if fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Manual' }).click();
    
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeDisabled();
    
    await page.getByPlaceholder('Meaning').fill('Test');
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeEnabled();
  });
});

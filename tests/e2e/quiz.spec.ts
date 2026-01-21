import { test, expect } from '@playwright/test';
import { seedData, SAMPLE_PHRASE } from './test-utils';

test.describe('Quiz View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    await seedData(page, [{
      ...SAMPLE_PHRASE,
      meaning: 'Water',
      sentence: 'I drink water',
      pronunciation: 'Wa-ter',
      tags: ['Drink']
    }]);
  });

  test('should setup and start a quiz', async ({ page }) => {
    await page.getByRole('button', { name: 'Quiz' }).click();

    await expect(page.getByText('Quiz Setup')).toBeVisible();

    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Start Quiz' }).click();

    await expect(page.locator('button:has-text("Check Answer"), button:has-text("Show Answer")').first()).toBeVisible();
  });

  test('should complete a quiz flow', async ({ page }) => {
    await page.getByRole('button', { name: 'Quiz' }).click();
    
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Start Quiz' }).click();

    await page.addInitScript(() => {
        Math.random = () => 0; 
    });

    const showAnswerBtn = page.getByRole('button', { name: 'Show Answer' });
    if (await showAnswerBtn.isVisible()) {
        await showAnswerBtn.click();
    } else {
         const input = page.locator('input[type="text"]');
         if (await input.isVisible()) {
             await input.fill('I drink water');
             await page.getByRole('button', { name: 'Check Answer' }).click();
         }
    }
    
    const nextBtn = page.getByRole('button', { name: 'Next Question' });
    if (await nextBtn.isVisible()) {
        await nextBtn.click();
    }
    
    await page.getByRole('button', { name: 'Exit Quiz' }).click();
    await expect(page.getByText('Quiz Setup')).toBeVisible();
  });
});

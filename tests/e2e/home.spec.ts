import { test, expect } from '@playwright/test';
import { seedData, SAMPLE_PHRASE, PhraseItem } from './test-utils';

test.describe('Home View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    await seedData(page, [{ 
      ...SAMPLE_PHRASE, 
      meaning: 'Apple', 
      sentence: 'I eat an apple', 
      pronunciation: 'Ap-ple', 
      tags: ['Fruit', 'Food'] 
    }]);

    await page.reload();
  });

  test('should display welcome message and daily missions', async ({ page }) => {
    await expect(page.locator('header h1')).toContainText('Polyglot');
    await expect(page.getByRole('heading', { name: 'Daily Mission' })).toBeVisible();
    await expect(page.getByRole('heading', { name: "Today's Picks" })).toBeVisible();
  });

  test('should navigate to other views from bottom nav', async ({ page }) => {
    await page.getByRole('button', { name: 'Learn' }).click();
    await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible(); 

    await page.getByRole('button', { name: 'Home' }).click();
    await expect(page.getByRole('heading', { name: 'Daily Mission' })).toBeVisible();
  });

  test('should allow starting a daily quiz', async ({ page }) => {
    await page.getByRole('button', { name: 'Take Daily Quiz' }).click();
    await expect(page.locator('button:has-text("Check Answer"), button:has-text("Show Answer")').first()).toBeVisible();
  });

  test('should not generate more than 28 items for daily quiz', async ({ page }) => {
    const phrases: PhraseItem[] = [];
    
    for (let i = 0; i < 50; i++) {
        phrases.push({
            id: `phrase-${i}`,
            meaning: `Meaning ${i}`,
            sentence: `Sentence ${i}`,
            pronunciation: `Pron ${i}`,
            tags: [`Tag-${i % 10}`] 
        });
    }

    await seedData(page, phrases);
    
    await page.evaluate(() => localStorage.removeItem('dailyRecommendation'));
    await page.reload(); 

    await page.getByRole('button', { name: 'Take Daily Quiz' }).click();
    
    const queueLength = await page.evaluate(() => {
        const queueStr = localStorage.getItem('quizQueue');
        if (!queueStr) return 0;
        const queue = JSON.parse(queueStr);
        return queue.length;
    });

    console.log(`Quiz Queue Length: ${queueLength}`);
    
    expect(queueLength).toBeLessThanOrEqual(28);
    expect(queueLength).toBeGreaterThan(0);
  });
});

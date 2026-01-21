import { Page } from '@playwright/test';

export interface PhraseItem {
  id: string;
  meaning: string;
  sentence: string;
  pronunciation?: string;
  tags: string[];
  memo?: string;
}

export const seedData = async (page: Page, items: PhraseItem[]) => {
  await page.evaluate((items) => {
    localStorage.setItem('phraseList', JSON.stringify(items));
    localStorage.setItem('learningStatus', JSON.stringify({ completedIds: [], incorrectIds: [], points: 0, quizStats: {} }));
  }, items);
  await page.reload();
};

export const clearData = async (page: Page) => {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
};

export const SAMPLE_PHRASE: PhraseItem = {
  id: 'test-id-1',
  meaning: 'Apple',
  sentence: 'I eat an apple',
  pronunciation: 'Ap-ple',
  tags: ['Fruit', 'Food'],
};

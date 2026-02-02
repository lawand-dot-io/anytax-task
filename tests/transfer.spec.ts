import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');

test.describe('Task 1 - API Mocking (Money Transfer)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(html);
  });

});
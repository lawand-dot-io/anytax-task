import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');

test.describe('Task 1 - API Mocking (Money Transfer)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(html);
  });

  // Test A: Mock a successful money transfer response
  test('Test A (Success) - Mock 200 OK response', async ({ page }) => {
    // Handle alert dialog
    let alertMessage = '';
    page.on('dialog', async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Mock the API response for a successful transfer
    await page.route('**/api/transfer', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          transactionId: '12345',
        }),
      });
    });

    // Click the "Initiate Transfer" button
    await page.getByRole('button', { name: 'Initiate Transfer' }).click();

    // Verify the status message
    await expect(page.locator('#status')).toHaveText('Success! Transaction ID: 12345');
    
    // Verify the alert message
    expect(alertMessage).toBe('Success! Transaction ID: 12345');
  });
});
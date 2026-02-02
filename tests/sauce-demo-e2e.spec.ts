import { test, expect } from '@playwright/test';

test.describe('Task 2 - E2E UI Flow', () => {
  test('Login, add product to cart, verify item in cart, and validate price format', async ({ page }) => {
    //// 1. Login with standard_user

    // Navigate to Sauce Demo website
    await page.goto('https://www.saucedemo.com/');

    // Fill login form fields
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);

    //// 2. Add a product to the cart

    // Add first product to cart
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Verify cart badge shows 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    //// 3. Go to the Cart and verify the item is there

    // Navigate to cart page
    await page.locator('.shopping_cart_link').click();

    // Verify redirect to cart page
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify the added item is in the cart
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    //// 4. Fintech Twist: Verify that the price is a valid number format (e.g., contains a $ and decimals)

    // Get the price text of the item in the cart
    const priceText = await page.locator('.inventory_item_price').textContent();

    // Trim
    const price = priceText?.trim();

    // Must contain $
    expect(price).toContain('$');

    // Must have exactly two decimal places
    expect(price).toMatch(/\.\d{2}$/);

    // Full strict validation: $ followed by digits, decimal point, exactly two decimal places
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });
});
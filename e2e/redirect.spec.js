const { test, expect } = require('@playwright/test');

test('redirect unauthorized user to login page', async ({ page }) => {
  // Przejdź na stronę profilu bez zalogowania
  await page.goto('http://localhost:3000/user/profile');

  // Sprawdź, czy nastąpiło przekierowanie na stronę logowania z parametrem returnUrl
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/user\/login\?returnUrl=\/user\/profile/);

  // Sprawdź, czy strona logowania zawiera nagłówek
  await expect(page.locator('h1')).toContainText('Zaloguj się');
});

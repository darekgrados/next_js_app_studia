const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  // Otwórz stronę główną
  await page.goto('http://localhost:3000/');
  
  // Otwórz SideBar
  await page.click('label[for="my-drawer"]'); // Otwiera SideBar przez kliknięcie przycisku Menu

  // Czekaj na widoczność linku do logowania
  const loginLink = page.locator('a[href="/user/login"]');
  await expect(loginLink).toBeVisible();

  // Kliknij link do logowania
  await loginLink.click();

  // Sprawdź, czy URL zmienił się na stronę logowania
  await expect(page).toHaveURL('http://localhost:3000/user/login');
});

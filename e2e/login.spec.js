const { test, expect } = require('@playwright/test');

test('login and navigate to profile page', async ({ page }) => {
  // Otwórz stronę logowania
  await page.goto('http://localhost:3000/user/login?returnUrl=/user/profile');

  // Wypełnij formularz logowania
  await page.waitForSelector('input[name="email"]');
  await page.fill('input[name="email"]', 'dariusz.grados@microsoft.wsei.edu.pl');
  await page.fill('input[name="password"]', 'dariusz.grados@microsoft.wsei.edu.pl');

  // Wyślij formularz
  await page.click('button[type="submit"]');

  // Sprawdź, czy URL zmienia się na stronę profilu
  await expect(page).toHaveURL('http://localhost:3000/user/profile');
});

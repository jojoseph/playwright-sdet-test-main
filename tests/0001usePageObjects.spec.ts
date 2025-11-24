import { test } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Regression', () => {
  test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
  });
});
test.describe('Smoke', () => {
  test('navigate to date picker page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.datePickerPage();
  });
});

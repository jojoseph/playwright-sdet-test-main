import { Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async formLayoutsPage() {
  await this.page.getByRole('link', { name: 'Forms' }).click();
  await this.page.getByRole('link', { name: 'Form Layouts' }).click();
  await this.page.getByRole('textbox', { name: 'Jane Doe' }).click();
  await this.page.getByRole('textbox', { name: 'Jane Doe' }).fill('Joboy');
  await this.page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').click();
  }
}

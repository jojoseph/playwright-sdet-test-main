import { Page } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async formLayoutsPage() {
    await this.page.getByRole('link', { name: 'Forms' }).click();
    await this.page.getByRole('link', { name: 'Form Layouts' }).click();
  }

  async datePickerPage() {
    await this.page.getByRole('link', { name: 'Forms' }).click();
    await this.page.getByRole('link', { name: 'Datepicker' }).click();
    await this.page.getByRole('textbox', { name: 'Form Picker' }).click();
    await this.page.getByText('24').click();
    await this.page.getByRole('textbox', { name: 'Range Picker' }).click();
    await this.page.getByRole('button').nth(4).click();
    await this.page.getByText('11', { exact: true }).click();
  }
}

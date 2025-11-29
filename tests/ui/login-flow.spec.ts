import { test,expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/login.page';

test.beforeEach(async ({ page }) => {
  const joinReal = new RegistrationPage(page);
  const loaded = await joinReal.goto(page); // ← MUST await
  expect(loaded).toBeTruthy();
  await joinReal.clikJoinLink();
});

test('validate fields', async ({page})=>{
  const joinReal = new RegistrationPage(page);
  await joinReal.validation();
})
test.skip('Registration', async ({ page }) => {
  const joinReal = new RegistrationPage(page);
  await joinReal.fillDetails();
});

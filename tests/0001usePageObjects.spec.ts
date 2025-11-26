import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe.skip('Regression', () => {
  test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
  });
}); 

test.describe.skip('Smoke', () => {
  test('navigate to date picker page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.datePickerPage();
  });
});

test('Locator Syntax Rules', async({ page }) => {
  const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    //By Tag
    page.locator('input').first().click()
    //By Id
    await page.locator('#inputEmail1').click()
    //By Class
     page.locator('.shape-rectangle1')
    //By Attribute
    page.locator('[placeholder ="Email"]')
    //By Entair Class value
     page.locator('[input-full-width size-medium status-basic shape-rectangle nb-transition]')
   //combine selectors  
     page.locator('input[placeholder="Email"][nbinput]')
  //xPath Not Recommended
     page.locator('//input*[@id="inputEmail1"]')
  // partial test locator
     page.locator(':test("Using")')
  // by the exact text match
    page.locator(':test-is("Using the Grid")')
  })

  test('User Faceing elemnts', async({page}) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await page.getByRole('textbox', {name : "Email"} ).first().click()
    await page.getByRole('button', {name : "Sign In"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder("Jane Doe").click()
    await page.getByText("Using the Grid").click()
    await page.getByTitle("IoT Dashboard").click()
   // await page.getByTestId("Sign in").click()
  })

  test('Locating the child elements', async({page}) =>{
    const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    //child element
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').getByRole('button',{name: "Sign in" }).first().click()
    //parent element
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()
    await emailField.click()
    await emailField.fill("test@test.com")
    await expect(emailField).toHaveValue("test@test.com")
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
  } )
  test('extracting the values', async({page}) =>{
      const navigateTo = new NavigationPage(page);
      await navigateTo.formLayoutsPage();
     // extrace text field
      const basicForm =  page.locator('nb-card').filter({hasText: "Basic form"})
      const buttonText = await basicForm.locator('button').textContent()

      expect(buttonText).toEqual("Submit")
     // get all the values
       const allRadioButtonLabels = await page.locator('nb-radio').allInnerTexts()
       expect(allRadioButtonLabels).toContain("Option 1")

       //input value
       const emailField = basicForm.getByRole('textbox', {name: "Email"})
       await emailField.fill('test@test.com')
       const emailFieldValue = await emailField.inputValue()
       expect(emailFieldValue).toEqual('test@test.com')

       const placeHolderValue = await emailField.getAttribute('placeholder')
       expect(placeHolderValue).toEqual('Email')
    })
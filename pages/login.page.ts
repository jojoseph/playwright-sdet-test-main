import { expect, Page } from '@playwright/test';
import {Helper} from '../utils/helper.ts'

export class RegistrationPage {
  joinLink;
  firstname;
  lastname;
  username;
  email;
  password;
  conpassword;
  checkpolicy;
  checkagree;
  createBtn;
  createaccount;
  redColour;
  blueClour;
  checkpolicyText;
  checkagreeText;

  constructor(private page: Page) {
    this.joinLink = this.page.getByRole('link', { name: 'Join Real' });
    this.firstname = this.page.getByTestId('text-input-First Name');
    this.lastname = this.page.getByTestId('text-input-Last Name');
    this.username = this.page.getByTestId('text-input-Username');
    this.email = this.page.getByTestId('email-input-Email');
    this.password = this.page.getByTestId('password-input-Password');
    this.conpassword = this.page.getByTestId(
      'password-input-Password Confirmation',
    );
    this.checkpolicy = this.page.getByTestId('consentedToTerms');
    this.checkpolicyText = this.page.locator('div').filter({ hasText: 'Please provide your consent to continue' }).first()
    this.checkagree = this.page.getByTestId('consentedToCallMessage');
    this.checkagreeText = this.page.locator('div').filter({ hasText: 'Please provide your consent to continue' }).last()
    this.createBtn =  this.page.locator('[type="submit"]').last();
    this.createaccount = this.page.locator('p:has-text("Create Account")');
    this.redColour = 'rgb(248, 76, 108)';
    this.blueClour = 'rgb(73, 103, 253)';
    }    

  async goto(page: Page) {
    try {
    await this.page.goto('https://bolt.playrealbrokerage.com/login', {
    waitUntil: 'domcontentloaded',   // or 'load' if you really need everything
    timeout: 200_000});
    return true;
  } catch (err) {
    console.warn(`Navigation to url failed or timed out`, err);
    return false;
  }
  }

  async clikJoinLink(timeout = 90000) {
    await this.joinLink.click();
  }
  async validation(timeout = 120000){
    await this.createBtn.click();
    const helper = new Helper()

    await expect(this.createBtn).toHaveCSS('background-color', 'rgb(73, 103, 253)');
    // Check error message appears

    await expect(this.page.getByText('Please enter first name', { exact:true })).toBeVisible();
    await helper.checkColor(this.firstname, this.redColour);
    await expect(this.page.getByText('Please enter last name', { exact:true })).toBeVisible();
    await helper.checkColor(this.lastname, this.redColour);
    await expect(this.page.getByText('Please enter username', { exact:true })).toBeVisible();
    await helper.checkColor(this.username, this.redColour);
    await expect(this.page.getByText('Please enter email address', { exact:true })).toBeVisible();
    await helper.checkColor(this.email, this.redColour);
    await expect(this.page.getByText('Password is required', { exact:true })).toBeVisible();
    await helper.checkColor(this.password, this.redColour);
    await expect(this.page.getByText('Please re-enter your password', { exact:true })).toBeVisible();
    await helper.checkColor(this.conpassword, this.redColour);
    await helper.checkColor(this.checkpolicy, this.redColour);
    await helper.checkColor(this.checkagree, this.redColour)
    await expect(this.page.getByText('Please provide your consent to continue', { exact: true }).first()).toHaveText('Please provide your consent to continue');
    await expect(this.page.getByText('Please provide your consent to continue', { exact: true }).last()).toHaveText('Please provide your consent to continue');
    await helper.checkColor(this.checkpolicy, this.redColour);
    await helper.checkColor(this.checkagree, this.redColour);
    console.log(this.page.locator('button.bg-real-blue-500').last());
    
   

   // expect(someLocator).toHaveText('Please provide your consent to continue');
    //await expect(someLocator).toContainText('consent to continue');
   //  expect(someLocator).toHaveText('please provide your consent to continue', { ignoreCase: true });
  // expect(errcheckagreeText.trim()).toBe('Please provide your consent to continue');
  // expect(someLocator).toHaveText(/Please provide your consent/i);
  // expect(someLocator).toHaveText(['Please provide your consent to continue', 'Consent is required']);
  }
  
  async fillDetails() {
    await this.firstname.fill('Jo');
    await this.lastname.fill('Jose');
    await this.username.fill('joseph');
    await this.email.fill('joseph@gmail.com');
    await this.password.fill('password1');
    await this.password.fill('conpassword');
    await this.checkpolicy.click();
    await this.checkagree.click();
    await this.createBtn.click();
  }
}


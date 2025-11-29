import { expect, Page } from '@playwright/test';
import { Helper } from '../utils/helper.ts';

export class RegistrationPage {
  // ====================== LOCATORS ======================
  readonly joinLink;
  readonly firstname;
  readonly errfirstname;
  readonly lastname;
  readonly errlastname;
  readonly username;
  readonly errusername;
  readonly errusername1;
  readonly errusername2;
  readonly email;
  readonly erremail;
  readonly erremail1;
  readonly password;
  readonly errpassword;
  readonly errpassword1;
  readonly errpassword2;
  readonly errpassword3;
  readonly errpassword4;
  readonly errpassword5;
  readonly errconpassword1;
  readonly conpassword;
  readonly errconpassword;
  readonly checkpolicy;
  readonly checkagree;
  readonly createBtn;
  readonly createaccount;
  readonly redColour;
  readonly blueColour;
  readonly greyColour;
  readonly checkpolicyText; // Error message under "Terms" checkbox
  readonly checkagreeText; // Error message under "Call/Message consent" checkbox
  readonly usernameNormal; // Username field when valid (no error)
  readonly usernameError; // Username field when invalid
  readonly usernameFocused; // Username field when focused

  constructor(private page: Page) {
    // Main navigation & form fields
    this.joinLink = this.page.getByRole('link', { name: 'Join Real' });
    this.firstname = this.page.getByTestId('text-input-First Name');
    this.lastname = this.page.getByTestId('text-input-Last Name');
    this.username = this.page.getByTestId('text-input-Username');

    // Username field in different states
    this.usernameNormal = this.username.locator(':not([data-invalid])'); // No error
    this.usernameError = this.username.locator('[data-invalid="true"]'); // Has error
    this.usernameFocused = this.username.locator(':focus'); // Currently focused

    this.email = this.page.getByTestId('email-input-Email');
    this.password = this.page.getByTestId('password-input-Password');
    this.conpassword = this.page.getByTestId(
      'password-input-Password Confirmation',
    );

    // Checkboxes
    this.checkpolicy = this.page.getByTestId('consentedToTerms');
    this.checkpolicyText = this.page
      .locator('div')
      .filter({ hasText: 'Please provide your consent to continue' })
      .first();
    this.checkagree = this.page.getByTestId('consentedToCallMessage');
    this.checkagreeText = this.page
      .locator('div')
      .filter({ hasText: 'Please provide your consent to continue' })
      .last();

    // Submit button (the real blue one at the bottom)
    this.createBtn = this.page.locator('[type="submit"]').last();
    this.createaccount = this.page.locator('p:has-text("Create Account")');

    // All individual error message locators
    this.errfirstname = this.page.getByText('Please enter first name', {
      exact: true,
    });
    this.errlastname = this.page.getByText('Please enter last name', {
      exact: true,
    });
    this.errusername = this.page.getByText('Please enter username', {
      exact: true,
    });
    this.errusername1 = this.page.getByText(
      'Username must be at least 2 characters',
      { exact: true },
    );
    this.errusername2 = this.page.getByText('Username is already taken', {
      exact: true,
    });

    this.erremail = this.page.getByText('Please enter email address', {
      exact: true,
    });
    this.erremail1 = this.page.getByText('Please enter valid email address', {
      exact: true,
    });

    this.errpassword = this.page.getByText('Password is required', {
      exact: true,
    });
    this.errpassword1 = this.page.getByText(
      'Password must have a minimum of 12 characters',
      { exact: true },
    );
    this.errpassword2 = this.page.getByText(
      'Password must contain at least: 1 lower-case character',
      { exact: true },
    );
    this.errpassword3 = this.page.getByText(
      'Password must contain at least: 1 upper-case character',
      { exact: true },
    );
    this.errpassword4 = this.page.getByText(
      'Password must contain at least: 1 digit',
      { exact: true },
    );
    this.errpassword5 = this.page.getByText(
      'Password must contain at least: 1 symbol',
      { exact: true },
    );

    this.errconpassword1 = this.page.getByText('Passwords do not match', {
      exact: true,
    });
    this.errconpassword = this.page.getByText('Please re-enter your password', {
      exact: true,
    });

    // Colors used for visual validation
    this.redColour = 'rgb(248, 76, 108)'; // Error state (borders & text)
    this.blueColour = 'rgb(73, 103, 253)'; // Primary button color
    this.greyColour = 'rgb(29, 29, 29)'; // Normal/focused border (actually black-ish)
  }

  // Navigate to login page with long timeout (page can be slow)
  async goto(page: Page) {
    try {
      await this.page.goto('https://bolt.playrealbrokerage.com/login', {
        waitUntil: 'domcontentloaded',
        timeout: 200_000,
      });
      return true;
    } catch (err) {
      console.warn(`Navigation to url failed or timed out`, err);
      return false;
    }
  }

  // Click the "Join Real" link to go to registration form
  async clikJoinLink(timeout = 90000) {
    await this.joinLink.click();
  }

  // Full form validation: triggers all errors and validates colors/messages step by step
  async validation(timeout = 120000) {
    await this.createBtn.click();
    const helper = new Helper();

    // Verify submit button is blue
    await helper.checkColor(this.createBtn, this.blueColour, 'background');

    // === First Name validations ===
    await expect(
      this.page.getByText('Please enter first name', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.firstname, this.redColour, 'border');
    await helper.checkColor(this.errfirstname, this.redColour, 'color');

    // === Last Name validations ===
    await expect(
      this.page.getByText('Please enter last name', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.lastname, this.redColour, 'border');
    await helper.checkColor(this.errlastname, this.redColour, 'color');

    // === Username validations ===
    await expect(
      this.page.getByText('Please enter username', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.username, this.redColour, 'border');
    await helper.checkColor(this.errusername, this.redColour, 'color');

    // === Email validations ===
    await expect(
      this.page.getByText('Please enter email address', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.email, this.redColour, 'border');
    await helper.checkColor(this.erremail, this.redColour, 'color');

    // === Password validations ===
    await expect(
      this.page.getByText('Password is required', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.password, this.redColour, 'border');
    await helper.checkColor(this.errpassword, this.redColour, 'color');

    // === Confirm Password validations ===
    await expect(
      this.page.getByText('Please re-enter your password', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.conpassword, this.redColour, 'border');
    await helper.checkColor(this.errconpassword, this.redColour, 'color');

    // === Checkbox consent errors ===
    await helper.checkColor(this.checkpolicy, this.redColour, 'border');
    await helper.checkColor(this.checkagree, this.redColour, 'border');
    await expect(
      this.page
        .getByText('Please provide your consent to continue', { exact: true })
        .first(),
    ).toHaveText('Please provide your consent to continue');
    await expect(
      this.page
        .getByText('Please provide your consent to continue', { exact: true })
        .last(),
    ).toHaveText('Please provide your consent to continue');

    // Fill valid data step by step and verify fields turn from red → normal (grey/black)
    await this.firstname.fill('Jo');
    await helper.checkColor(this.firstname, this.greyColour, 'border');

    await this.lastname.fill('Jose');
    await helper.checkColor(this.lastname, this.greyColour, 'border');

    await this.username.fill('1');
    await helper.checkColor(this.username, this.greyColour, 'border');
    await this.email.click();
    await helper.checkColor(this.errusername1, this.redColour, 'color');
    await expect(
      this.page.getByText('Username must be at least 2 characters', {
        exact: true,
      }),
    ).toBeVisible();

    await this.username.fill('Admin');
    await helper.checkColor(this.username, this.greyColour, 'border');
    await this.email.click();
    await helper.checkColor(this.errusername2, this.redColour, 'color');
    await expect(
      this.page.getByText('Username is already taken', { exact: true }),
    ).toBeVisible();

    await this.username.clear();
    await this.username.fill('Admin123'); // Now valid username

    await this.email.fill('joseph');
    await expect(
      this.page.getByText('Please enter valid email address', { exact: true }),
    ).toBeVisible();
    await helper.checkColor(this.email, this.greyColour, 'border'); // turns normal after typing invalid
    await this.password.click();
    await helper.checkColor(this.erremail1, this.redColour, 'color');

    await this.email.fill('joseph@g.com');

    // Password strength checks
    await this.password.fill('123456789');
    await expect(
      this.page.getByText('Password must have a minimum of 12 characters', {
        exact: true,
      }),
    ).toBeVisible();
    await helper.checkColor(this.password, this.greyColour, 'border');
    await this.conpassword.click();
    await helper.checkColor(this.errpassword1, this.redColour, 'color');

    // Continue testing other password rules...
    await this.password.fill('aaQQaassssss');
    await expect(
      this.page.getByText('Password must contain at least: 1 digit', {
        exact: true,
      }),
    ).toBeVisible();
    await helper.checkColor(this.password, this.greyColour, 'border');
    await this.conpassword.click();
    await helper.checkColor(this.errpassword4, this.redColour, 'color');

    await this.password.fill('1234567890123');
    await expect(
      this.page.getByText(
        'Password must contain at least: 1 lower-case character',
        { exact: true },
      ),
    ).toBeVisible();
    await helper.checkColor(this.password, this.greyColour, 'border');
    await this.conpassword.click();
    await helper.checkColor(this.errpassword2, this.redColour, 'color');

    await this.password.fill('1234567890123a');
    await expect(
      this.page.getByText(
        'Password must contain at least: 1 upper-case character',
        { exact: true },
      ),
    ).toBeVisible();
    await helper.checkColor(this.password, this.greyColour, 'border');
    await this.conpassword.click();
    await helper.checkColor(this.errpassword3, this.redColour, 'color');

    await this.password.fill('1234567890123aB');
    await expect(
      this.page.getByText('Password must contain at least: 1 symbol', {
        exact: true,
      }),
    ).toBeVisible();
    await helper.checkColor(this.password, this.greyColour, 'border');
    await this.conpassword.click();
    await helper.checkColor(this.errpassword5, this.redColour, 'color');

    // Final valid password
    await this.password.fill('1234567890123a@');
    await this.conpassword.fill('1234567890123a'); // mismatch
    await this.checkpolicy.click();
    await this.checkagree.click();
    await this.createBtn.click();

    // Passwords don't match error
    await expect(
      this.page.getByText('Passwords do not match', { exact: true }),
    ).toBeVisible();
    await this.conpassword.click();
    await helper.checkColor(this.errconpassword1, this.redColour, 'color');

    // Fix mismatch
    await this.conpassword.fill('1234567890123a@');
    await this.createBtn.click();
  }
}
// expect(someLocator).toHaveText('Please provide your consent to continue');
//await expect(someLocator).toContainText('consent to continue');
//  expect(someLocator).toHaveText('please provide your consent to continue', { ignoreCase: true });
// expect(errcheckagreeText.trim()).toBe('Please provide your consent to continue');
// expect(someLocator).toHaveText(/Please provide your consent/i);
// expect(someLocator).toHaveText(['Please provide your consent to continue', 'Consent is required']);

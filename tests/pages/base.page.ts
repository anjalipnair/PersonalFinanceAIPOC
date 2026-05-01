import { expect, Page } from '@playwright/test';
import { CONFIG } from '../config';
import { SELECTORS } from '../utils/selectors';

export class BasePage {
  constructor(protected page: Page) {}
  
  // Common form interactions
  async clickButton(text: string) {
    await this.page.getByRole('button', { name: text }).click();
  }
  
  async selectRadio(text: string) {
    await this.page.getByRole('radio', { name: text }).click();
  }
  
  async fillTextbox(name: string, value: string) {
    await this.page.getByRole('textbox', { name }).fill(value);
  }
  
  async clickLink(name: string) {
    await this.page.getByRole('link', { name }).click();
  }
  
  async selectDropdownOption(dropdownName: string, option: string) {
    const dropdown = this.page.getByRole('combobox', { name: dropdownName });
    await dropdown.click();
    await dropdown.fill(option);
    await this.page.getByRole('option', { name: option }).click();
  }
  
  // Common navigation actions
  async saveAndContinue() {
    await this.clickButton('Save and continue');
  }
  
  async continue() {
    await this.clickButton('Continue');
  }
  
  // Verification helpers
  async waitForHeading(text: string, options?: { timeout?: number }) {
    await expect(this.page.getByRole('heading', { name: text }))
      .toBeVisible(options);
  }
  
  async verifyText(text: string, options?: { timeout?: number }) {
    await expect(this.page.getByText(text)).toBeVisible(options);
  }
  
  async verifyTaskCompletion(taskNumber: number) {
    await this.verifyText(`You have completed ${taskNumber} of 15 tasks`);
  }
  
  // Date input helper
  async fillDateInputs(date: { day: string; month: string; year: string }) {
    await this.fillTextbox('Day', date.day);
    await this.fillTextbox('Month', date.month);
    await this.fillTextbox('Year', date.year);
  }
  
  // Navigation with waiting
  async navigateAndWait(linkName: string, expectedHeading: string) {
    await this.clickLink(linkName);
    await this.waitForHeading(expectedHeading);
  }
  
  // Error handling
  async checkForErrors() {
    const errorSummary = this.page.getByRole('heading', { name: 'There is a problem' });
    if (await errorSummary.isVisible()) {
      const errors = await this.page.locator('.govuk-error-summary__list li').allTextContents();
      throw new Error(`Form validation errors: ${errors.join(', ')}`);
    }
  }
  
  // Debugging helper
  async takeScreenshot(name: string) {
    if (process.env.DEBUG_MODE === 'true') {
      await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
    }
  }
}
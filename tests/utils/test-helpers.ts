import { Page, expect } from '@playwright/test';
import { AuthenticationPage } from '../pages/authentication.page';
import { EligibilityPage } from '../pages/eligibility.page';
import { CompanyDetailsPage } from '../pages/company-details.page';
import { BusinessAddressPage } from '../pages/business-address.page';

export class EISTestHelper {
  private authPage: AuthenticationPage;
  private eligibilityPage: EligibilityPage;
  private companyPage: CompanyDetailsPage;
  private addressPage: BusinessAddressPage;
  
  constructor(private page: Page) {
    this.authPage = new AuthenticationPage(page);
    this.eligibilityPage = new EligibilityPage(page);
    this.companyPage = new CompanyDetailsPage(page);
    this.addressPage = new BusinessAddressPage(page);
  }
  
  // Setup Methods
  async setupPrerequisiteTasks(companyName?: string) {
    await this.authPage.authenticateAsOrganisation();
    await this.eligibilityPage.completeEISEligiblePath();
    await this.companyPage.completeMinimalCompanyDetails(companyName);
  }
  
  async setupFullCompanyPrerequisites(companyData: any) {
    await this.authPage.authenticateAsOrganisation();
    await this.eligibilityPage.completeEISEligiblePath();
    await this.companyPage.completeFullCompanyDetails(companyData);
  }
  
  // Page Access Methods
  getPages() {
    return {
      auth: this.authPage,
      eligibility: this.eligibilityPage,
      company: this.companyPage,
      address: this.addressPage
    };
  }
  
  // Helper Methods
  async verifyTaskCompletion(taskNumber: number) {
    await expect(this.page.getByText(`You have completed ${taskNumber} of 15 tasks`)).toBeVisible();
  }
  
  async completeRemainingTasksToFileUpload() {
    // Task 4: Knowledge-intensive companies
    await this.page.getByRole('link', { name: 'Knowledge-intensive companies' }).click();
    await this.page.getByRole('radio', { name: 'No' }).click();
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
    
    // Task 5: Share issue (until file upload boundary)
    await this.page.getByRole('link', { name: 'Share issue' }).click();
    await this.page.getByRole('textbox', { name: 'Description of shares' }).fill('Ordinary');
    await this.page.getByRole('textbox', { name: 'Day' }).fill('10');
    await this.page.getByRole('textbox', { name: 'Month' }).fill('07');
    await this.page.getByRole('textbox', { name: 'Year' }).fill('2020');
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
    
    await this.page.getByRole('combobox', { name: 'Currency' }).fill('British');
    await this.page.getByRole('option', { name: 'British Pound - GBP' }).click();
    await this.page.getByRole('textbox', { name: 'Amount in this currency' }).fill('1.00');
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
    
    await this.page.getByRole('textbox', { name: 'Number of investors requiring' }).fill('5');
    await this.page.getByRole('textbox', { name: 'Total amount paid by these' }).fill('250000');
    await this.page.getByRole('button', { name: 'Save and continue' }).click();

    // Verify we reach file upload boundary
    await expect(this.page.getByRole('heading', { name: 'Upload details of investors' })).toBeVisible();
  }
}
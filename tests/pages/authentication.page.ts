import { BasePage } from './base.page';
import { CONFIG } from '../config';

export class AuthenticationPage extends BasePage {
  
  async navigateToAuth() {
    await this.page.goto(CONFIG.AUTH_URL);
  }
  
  async authenticateAsOrganisation() {
    await this.navigateToAuth();
    await this.fillTextbox('Redirect URL', CONFIG.REDIRECT_PATH);
    await this.page.getByLabel('Affinity Group').selectOption(['Organisation']);
    await this.page.getByRole('button', { name: 'Submit' }).nth(2).click();
    
    // Wait for redirection to main form
    await this.page.waitForURL('**/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
  }
  
  async authenticateAsAgent() {
    await this.navigateToAuth();
    await this.fillTextbox('Redirect URL', CONFIG.REDIRECT_PATH);
    await this.page.getByLabel('Affinity Group').selectOption(['Agent']);
    await this.page.getByRole('button', { name: 'Submit' }).nth(2).click();
    
    await this.page.waitForURL('**/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
  }
  
  async authenticateAsIndividual() {
    await this.navigateToAuth();
    await this.fillTextbox('Redirect URL', CONFIG.REDIRECT_PATH);
    await this.page.getByLabel('Affinity Group').selectOption(['Individual']);
    await this.page.getByRole('button', { name: 'Submit' }).nth(2).click();
    
    await this.page.waitForURL('**/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
  }
}
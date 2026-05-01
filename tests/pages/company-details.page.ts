import { BasePage } from './base.page';
import { CONFIG, TEST_DATA } from '../config';

export class CompanyDetailsPage extends BasePage {
  
  async navigateToCompanyDetails() {
    await this.navigateAndWait('Company details', 'What is the name of the');
  }
  
  async completeMinimalCompanyDetails(companyName?: string) {
    await this.navigateToCompanyDetails();
    
    // Company name
    await this.fillTextbox('What is the name of the', companyName || TEST_DATA.COMPANIES.UK_MINIMAL.name);
    await this.saveAndContinue();
    
    // Trading name = No
    await this.waitForHeading('Does the company have a different trading name?');
    await this.selectRadio('No');
    await this.saveAndContinue();
    
    // UTR
    await this.waitForHeading('What is the Corporation Tax');
    await this.fillTextbox('What is the Corporation Tax', CONFIG.DEFAULT_UTR);
    await this.saveAndContinue();
    
    // Company registration number
    await this.waitForHeading('What is the company');
    await this.fillTextbox('What is the company', CONFIG.DEFAULT_COMPANY_REG);
    await this.saveAndContinue();
    
    // PAYE reference = No
    await this.waitForHeading('Does the company have an employer PAYE reference?');
    await this.selectRadio('No');
    await this.saveAndContinue();
    
    // Incorporation date
    await this.waitForHeading('When was the company incorporated?');
    await this.fillDateInputs(TEST_DATA.COMPANIES.UK_MINIMAL.incorporationDate);
    await this.saveAndContinue();
    
    // Complete check answers
    await this.waitForHeading('Check your answers for company details');
    await this.saveAndContinue();
    
    // Verify task completion
    await this.verifyTaskCompletion(2);
  }
  
  async completeFullCompanyDetails(companyData: any) {
    await this.navigateToCompanyDetails();
    
    // Company name
    await this.fillTextbox('What is the name of the', companyData.name);
    await this.saveAndContinue();
    
    // Trading name
    if (companyData.hasTradingName) {
      await this.selectRadio('Yes');
      await this.fillTextbox('Enter the trading name of the', companyData.tradingName);
    } else {
      await this.selectRadio('No');
    }
    await this.saveAndContinue();
    
    // UTR
    await this.fillTextbox('What is the Corporation Tax', companyData.utr);
    await this.saveAndContinue();
    
    // Company registration number  
    await this.fillTextbox('What is the company', companyData.registrationNumber);
    await this.saveAndContinue();
    
    // PAYE reference
    if (companyData.hasPaye) {
      await this.selectRadio('Yes');
      await this.saveAndContinue();
      await this.fillTextbox('What is the employer PAYE', companyData.payeRef);
    } else {
      await this.selectRadio('No');
    }
    await this.saveAndContinue();
    
    // Incorporation date
    await this.fillDateInputs(companyData.incorporationDate);
    await this.saveAndContinue();
    
    // Complete check answers
    await this.saveAndContinue();
    
    // Verify task completion
    await this.verifyTaskCompletion(2);
  }
}
import { BasePage } from './base.page';

export class EligibilityPage extends BasePage {
  
  async navigateToEligibility() {
    await this.navigateAndWait(
      'Eligibility for EIS service', 
      'Have the shares already been issued to the investors who want EIS relief?'
    );
  }
  
  async completeEISEligiblePath() {
    await this.navigateToEligibility();
    
    // Step 1: Shares already issued = Yes
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    
    // Step 2: Confirm EIS continuation = Yes
    await this.waitForHeading('Do you confirm you want to continue with this compliance statement for EIS?');
    await this.selectRadio('Yes, and I understand that if');
    await this.saveAndContinue();
    
    // Complete check answers
    await this.waitForHeading('Check your answers for eligibility for EIS service');
    await this.saveAndContinue();
    
    // Verify task completion
    await this.verifyTaskCompletion(1);
  }
  
  async completeSEISRedirectPath() {
    await this.navigateToEligibility();
    
    // Step 1: Shares already issued = Yes
    await this.selectRadio('Yes');
    await this.saveAndContinue();
    
    // Step 2: Select SEIS option (blocks continuation)
    await this.selectRadio('No, I intend for the shares to be treated as under the SEIS');
    await this.saveAndContinue();
    
    // Should redirect to SEIS information page
    await this.verifyText('If you want the shares to be treated as SEIS');
  }
  
  async completeAdvanceAssurancePath() {
    await this.navigateToEligibility();
    
    // Step 1: Not EIS eligible - want advance assurance
    await this.selectRadio('No, I want to know if future investments would qualify for EIS');
    await this.saveAndContinue();
    
    // Should redirect to advance assurance application
    await this.verifyText('If you want to apply for advance assurance');
  }
}
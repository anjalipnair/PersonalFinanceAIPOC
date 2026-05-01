import { BasePage } from './base.page';

export class BusinessAddressPage extends BasePage {
  
  async navigateToBusinessAddress() {
    await this.navigateAndWait('Business address', 'Was the company incorporated in the UK?');
  }
  
  async selectUKIncorporation() {
    await this.selectRadio('Yes');
    await this.saveAndContinue();
  }
  
  async selectNonUKIncorporation() {
    await this.selectRadio('No');
    await this.saveAndContinue();
  }
  
  async performPostcodeLookup(postcode: string, propertyNumber?: string) {
    await this.waitForHeading('What is the registered business address?');
    await this.fillTextbox('Postcode', postcode);
    
    if (propertyNumber) {
      await this.fillTextbox('Property name or number (optional)', propertyNumber);
    }
    
    await this.clickButton('Find address');
  }
  
  async selectManualEntryAfterLookup() {
    await this.verifyText('We cannot find any addresses for this postcode');
    await this.selectRadio('Enter the address manually');
    await this.saveAndContinue();
  }
  
  async navigateToManualEntry() {
    await this.clickLink('Enter the address manually');
  }
  
  async enterUKAddress(address: any) {
    await this.waitForHeading('Enter address');
    
    await this.fillTextbox('Address line 1', address.line1);
    
    if (address.line2) {
      await this.fillTextbox('Address line 2 (optional)', address.line2);
    }
    
    if (address.city) {
      await this.fillTextbox('Town or city (optional)', address.city);
    }
    
    await this.fillTextbox('Postcode', address.postcode);
    await this.continue();
  }
  
  async enterInternationalAddress(address: any) {
    await this.waitForHeading('What is the registered business address?');
    
    await this.fillTextbox('Address line 1', address.line1);
    
    if (address.line2) {
      await this.fillTextbox('Address line 2 (optional)', address.line2);
    }
    
    await this.fillTextbox('Town or city', address.city);
    
    if (address.region) {
      await this.fillTextbox('County, state, province or region (optional)', address.region);
    }
    
    if (address.postcode) {
      await this.fillTextbox('Postal code or zip code (optional)', address.postcode);
    }
    
    // Select country
    await this.selectDropdownOption('Country', address.country);
    await this.saveAndContinue();
  }
  
  async enterUKEstablishmentAddress(address: any) {
    await this.waitForHeading('UK permanent establishment address');
    
    await this.fillTextbox('Address line 1', address.line1);
    
    if (address.line2) {
      await this.fillTextbox('Address line 2 (optional)', address.line2);
    }
    
    if (address.city) {
      await this.fillTextbox('Town or city (optional)', address.city);
    }
    
    await this.fillTextbox('Postcode', address.postcode);
    await this.continue();
  }
  
  async confirmAddress() {
    await this.waitForHeading('Review and confirm');
    await this.clickButton('Confirm address');
  }
  
  async enterEstablishmentDetails(details: string) {
    await this.fillTextbox('Permanent establishment details', details);
    await this.saveAndContinue();
  }
  
  async completeTaskCheckAnswers() {
    await this.waitForHeading('Check your answers for business address');
    await this.saveAndContinue();
  }
  
  async verifyAddressFields(address: any) {
    await this.verifyText(address.line1);
    if (address.line2) await this.verifyText(address.line2);
    if (address.city) await this.verifyText(address.city);
    await this.verifyText(address.postcode);
  }
}
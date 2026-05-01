import { TEST_DATA } from '../config';

export class DataFactory {
  
  // Company Data Generators
  static createUKMinimalCompany(overrides: any = {}) {
    return {
      ...TEST_DATA.COMPANIES.UK_MINIMAL,
      ...overrides
    };
  }
  
  static createUKFullCompany(overrides: any = {}) {
    return {
      ...TEST_DATA.COMPANIES.UK_FULL,
      ...overrides
    };
  }
  
  static createNonUKCompany(country: string, overrides: any = {}) {
    return {
      ...TEST_DATA.COMPANIES.NON_UK_IRELAND,
      name: `${country} Innovation Corp`,
      ...overrides
    };
  }
  
  // Address Data Generators
  static getUKAddress(variant: 'manchester' | 'birmingham' | 'london' = 'manchester') {
    const addressMap = {
      manchester: TEST_DATA.ADDRESSES.UK_MANCHESTER,
      birmingham: TEST_DATA.ADDRESSES.UK_BIRMINGHAM,
      london: TEST_DATA.ADDRESSES.UK_LONDON
    };
    return addressMap[variant];
  }
  
  static getInternationalAddress(country: 'ireland' | 'germany' = 'ireland') {
    const addressMap = {
      ireland: TEST_DATA.ADDRESSES.IRELAND_DUBLIN,
      germany: TEST_DATA.ADDRESSES.GERMANY_BERLIN
    };
    return addressMap[country];
  }
  
  static createCustomAddress(addressData: any) {
    return {
      line1: addressData.line1 || 'Custom Address Line 1',
      line2: addressData.line2,
      city: addressData.city || 'Custom City',
      region: addressData.region,
      postcode: addressData.postcode || 'XX1 1XX',
      country: addressData.country
    };
  }
  
  // Random Data Generators
  static generateRandomUTR(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
  
  static generateRandomCompanyReg(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }
  
  static generateRandomPostcode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    const area = letters.charAt(Math.floor(Math.random() * letters.length));
    const district = Math.floor(Math.random() * 9) + 1;
    const sector = Math.floor(Math.random() * 9) + 1;
    const unit = letters.charAt(Math.floor(Math.random() * letters.length)) + 
                 letters.charAt(Math.floor(Math.random() * letters.length));
    
    return `${area}${district} ${sector}${unit}`;
  }
}
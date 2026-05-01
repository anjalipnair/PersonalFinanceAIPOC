// Test Configuration and Environment Variables
export const CONFIG = {
  // URLs and Endpoints
  BASE_URL: process.env.BASE_URL || 'https://test-www.tax.service.gov.uk',
  AUTH_URL: process.env.AUTH_URL || 'https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in',  
  REDIRECT_PATH: process.env.REDIRECT_PATH || '/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc',
  
  // Test Data
  DEFAULT_UTR: process.env.DEFAULT_UTR || '1111111111',
  DEFAULT_COMPANY_REG: process.env.DEFAULT_COMPANY_REG || '12345678',
  DEFAULT_PAYE_REF: process.env.DEFAULT_PAYE_REF || '123/AB456',
  
  // Timeouts
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
  NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || '60000'),
  
  // Browser Config
  HEADLESS: process.env.HEADLESS !== 'false',
  BROWSER_TYPE: process.env.BROWSER_TYPE || 'chromium'
};

export const TEST_DATA = {
  COMPANIES: {
    UK_MINIMAL: {
      name: 'UK Test Company Ltd',
      utr: CONFIG.DEFAULT_UTR,
      registrationNumber: CONFIG.DEFAULT_COMPANY_REG,
      incorporationDate: { day: '15', month: '6', year: '2020' },
      hasTradingName: false,
      hasPaye: false
    },
    UK_FULL: {
      name: 'UK Full Test Holdings Ltd',
      utr: CONFIG.DEFAULT_UTR, 
      registrationNumber: CONFIG.DEFAULT_COMPANY_REG,
      incorporationDate: { day: '15', month: '6', year: '2020' },
      hasTradingName: true,
      tradingName: 'Test Solutions Ltd',
      hasPaye: true,
      payeRef: CONFIG.DEFAULT_PAYE_REF
    },
    NON_UK_IRELAND: {
      name: 'Ireland Innovation Corp',
      utr: CONFIG.DEFAULT_UTR,
      registrationNumber: CONFIG.DEFAULT_COMPANY_REG, 
      incorporationDate: { day: '10', month: '4', year: '2019' },
      hasTradingName: false,
      hasPaye: false
    }
  },
  
  ADDRESSES: {
    UK_MANCHESTER: {
      line1: '10 Innovation Street',
      line2: 'Tech District',
      city: 'Manchester', 
      postcode: 'M1 1AA'
    },
    UK_BIRMINGHAM: {
      line1: '25 Business Park Way',
      line2: 'Innovation Quarter',
      city: 'Birmingham',
      postcode: 'B1 2XY'
    },
    UK_LONDON: {
      line1: '100 UK Operations Centre',
      line2: 'Financial District',
      city: 'London',
      postcode: 'SW1A 1AA'
    },
    IRELAND_DUBLIN: {
      line1: '456 International Boulevard',
      line2: 'Dublin Tech Quarter', 
      city: 'Dublin',
      region: 'Leinster',
      postcode: 'D02 XY45',
      country: 'Ireland'
    },
    GERMANY_BERLIN: {
      line1: '789 Berlin Innovation Center',
      line2: 'Tech Campus',
      city: 'Berlin',
      region: 'Berlin',
      postcode: '10115', 
      country: 'Germany'
    }
  }
};
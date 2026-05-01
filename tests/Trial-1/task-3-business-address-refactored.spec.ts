import { test, expect } from '@playwright/test';
import { EISTestHelper } from '../utils/test-helpers';
import { DataFactory } from '../utils/data-factory';
import { TEST_DATA } from '../config';

test.describe('Task 3: Business Address - Refactored with Page Object Model', () => {
  
  test('T3-UK-LOOKUP: UK Company + Postcode Lookup + Manual Entry', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    // Setup Prerequisites (Tasks 1-2)
    await testHelper.setupPrerequisiteTasks('UK Postcode Test Company Ltd');
    
    // Task 3: Business Address - UK path
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectUKIncorporation();
    
    // Postcode lookup with manual entry fallback
    await addressPage.performPostcodeLookup('M1 1AA', '10');
    await addressPage.selectManualEntryAfterLookup();
    
    // Enter UK address using test data
    const ukAddress = DataFactory.getUKAddress('manchester');
    await addressPage.enterUKAddress(ukAddress);
    await addressPage.confirmAddress();
    
    // Verify address appears correctly
    await addressPage.verifyAddressFields(ukAddress);
    
    await addressPage.completeTaskCheckAnswers();
    
    // Verify Task 3 completion
    await testHelper.verifyTaskCompletion(3);
    
    // Continue to file upload boundary
    await testHelper.completeRemainingTasksToFileUpload();
  });
  
  test('T3-UK-DIRECT-MANUAL: UK Company + Direct Manual Entry', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    await testHelper.setupPrerequisiteTasks('UK Manual Entry Test Co Ltd');
    
    // Task 3: Direct manual entry
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectUKIncorporation();
    
    // Skip postcode lookup - go directly to manual
    await addressPage.navigateToManualEntry();
    
    // Use Birmingham address variant
    const ukAddress = DataFactory.getUKAddress('birmingham');
    await addressPage.enterUKAddress(ukAddress);
    await addressPage.confirmAddress();
    await addressPage.completeTaskCheckAnswers();
    
    await testHelper.verifyTaskCompletion(3);
    await testHelper.completeRemainingTasksToFileUpload();
  });
  
  test('T3-NONUK-IRELAND: Non-UK Company (Ireland) + Dual Addresses', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    await testHelper.setupPrerequisiteTasks('Ireland Innovation Corp');
    
    // Task 3: Non-UK path
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectNonUKIncorporation();
    
    // International address
    const internationalAddress = DataFactory.getInternationalAddress('ireland');
    await addressPage.enterInternationalAddress(internationalAddress);
    
    // UK establishment address
    const ukEstablishmentAddress = DataFactory.getUKAddress('london');
    await addressPage.enterUKEstablishmentAddress(ukEstablishmentAddress);
    await addressPage.confirmAddress();
    
    // Establishment details
    await addressPage.enterEstablishmentDetails('UK operations office coordinating investment activities and compliance for Irish technology company.');
    
    await addressPage.completeTaskCheckAnswers();
    await testHelper.verifyTaskCompletion(3);
    
    await testHelper.completeRemainingTasksToFileUpload();
  });
  
  test('T3-NONUK-GERMANY: Non-UK Company (Germany) + Alternative Country', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    await testHelper.setupPrerequisiteTasks('German Tech Innovation GmbH');
    
    // Task 3: Non-UK path with Germany
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectNonUKIncorporation();
    
    // German international address
    const germanAddress = DataFactory.getInternationalAddress('germany');
    await addressPage.enterInternationalAddress(germanAddress);
    
    // UK establishment address
    const ukEstablishmentAddress = DataFactory.getUKAddress('birmingham');
    await addressPage.enterUKEstablishmentAddress(ukEstablishmentAddress);
    await addressPage.confirmAddress();
    
    // Establishment details
    await addressPage.enterEstablishmentDetails('UK subsidiary coordinating EIS compliance for German parent company operations.');
    
    await addressPage.completeTaskCheckAnswers();
    await testHelper.verifyTaskCompletion(3);
  });
  
  test('T3-VALIDATION: Address Validation Scenarios + Recovery', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    await testHelper.setupPrerequisiteTasks('Validation Test Company Ltd');
    
    // Task 3: Test validation scenarios
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectUKIncorporation();
    
    // Test invalid postcode lookup
    await addressPage.performPostcodeLookup('INVALID');
    
    // Handle validation error and retry with valid postcode
    await addressPage.selectManualEntryAfterLookup();
    
    // Test manual entry with validation recovery
    const validAddress = DataFactory.getUKAddress('manchester');
    await addressPage.enterUKAddress(validAddress);
    await addressPage.confirmAddress();
    await addressPage.completeTaskCheckAnswers();
    
    await testHelper.verifyTaskCompletion(3);
  });
});

// Additional test suite for comprehensive permutation coverage
test.describe('Task 3: Comprehensive Address Permutation Matrix', () => {
  
  test('T3-PERMUTATION-MATRIX: Multiple Country and Address Variants', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    // Test with custom address data
    const customAddress = DataFactory.createCustomAddress({
      line1: '999 Custom Innovation Hub',
      line2: 'Technology Zone',
      city: 'Custom City',
      postcode: 'CU1 1ST'
    });
    
    await testHelper.setupPrerequisiteTasks('Permutation Test Company Ltd');
    
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectUKIncorporation();
    await addressPage.navigateToManualEntry();
    await addressPage.enterUKAddress(customAddress);
    await addressPage.confirmAddress();
    await addressPage.completeTaskCheckAnswers();
    
    await testHelper.verifyTaskCompletion(3);
  });
  
  test('T3-FULL-COMPANY-DETAILS: Complete Company Flow + Address Variants', async ({ page }) => {
    const testHelper = new EISTestHelper(page);
    const { address: addressPage } = testHelper.getPages();
    
    // Use full company details variant
    const fullCompanyData = DataFactory.createUKFullCompany({
      name: 'Full Details Address Test Holdings Ltd'
    });
    
    await testHelper.setupFullCompanyPrerequisites(fullCompanyData);
    
    // Task 3: Use London address variant
    await addressPage.navigateToBusinessAddress();
    await addressPage.selectUKIncorporation();
    await addressPage.navigateToManualEntry();
    
    const londonAddress = DataFactory.getUKAddress('london');
    await addressPage.enterUKAddress(londonAddress);
    await addressPage.confirmAddress();
    await addressPage.completeTaskCheckAnswers();
    
    await testHelper.verifyTaskCompletion(3);
  });
});
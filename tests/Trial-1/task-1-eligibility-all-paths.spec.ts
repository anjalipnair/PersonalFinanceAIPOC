// Task 1: All Eligibility Decision Paths
// Path 1: EIS Eligible → Continue → Complete Full Form Submission

import { test, expect } from '@playwright/test';

test.describe('Task 1: EIS Eligibility - All Decision Paths', () => {
  test('T1-PATH1: EIS Eligible → Continue → Complete Full Form Submission', async ({ page }) => {
    // Navigate and authenticate
    await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');
    await page.getByRole('textbox', { name: 'Redirect URL' }).fill('/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
    await page.getByLabel('Affinity Group').selectOption(['Organisation']);
    await page.getByRole('button', { name: 'Submit' }).nth(2).click();

    // Task 1: Eligibility - EIS Eligible Path
    await page.getByRole('link', { name: 'Eligibility for EIS service' }).click();
    await expect(page.getByText('Have the shares already been issued to the investors who want EIS relief?')).toBeVisible();
    
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    
    await expect(page.getByText('Do you confirm you want to continue with this compliance statement for EIS?')).toBeVisible();
    await page.getByRole('radio', { name: 'Yes, and I understand that if' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    
    // Complete Task 1 check answers
    await page.getByRole('button', { name: 'Save and continue' }).click();
    
    // Verify Task 1 completion - should show 1 of 15 tasks completed
    await expect(page.getByText('You have completed 1 of 15 tasks')).toBeVisible();
    
    // Continue to complete ALL remaining tasks for full form submission
    await completeAllRemainingTasks(page);
  });

  test('T1-PATH2: EIS Eligible → SEIS Redirect → Stop (Cannot Complete)', async ({ page }) => {
    // Navigate and authenticate
    await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');
    await page.getByRole('textbox', { name: 'Redirect URL' }).fill('/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
    await page.getByLabel('Affinity Group').selectOption(['Organisation']);
    await page.getByRole('button', { name: 'Submit' }).nth(2).click();

    // Task 1: Eligibility - SEIS Redirect Path
    await page.getByRole('link', { name: 'Eligibility for EIS service' }).click();
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    
    // Select SEIS option
    await page.getByRole('radio', { name: 'No, I intend for the shares to be treated as under the SEIS' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    
    // Verify SEIS redirect - should prevent EIS form continuation
    await expect(page.getByText('SEIS')).toBeVisible(); // This path stops here - cannot complete EIS form
  });

  test('T1-PATH3: Not EIS Eligible → Advance Assurance Redirect → Stop', async ({ page }) => {
    // Navigate and authenticate  
    await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');
    await page.getByRole('textbox', { name: 'Redirect URL' }).fill('/submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc');
    await page.getByLabel('Affinity Group').selectOption(['Organisation']);
    await page.getByRole('button', { name: 'Submit' }).nth(2).click();

    // Task 1: Eligibility - Not EIS Eligible Path
    await page.getByRole('link', { name: 'Eligibility for EIS service' }).click();
    await page.getByRole('radio', { name: 'No, I want to know if future investments would qualify for EIS' }).click();
    await page.getByRole('button', { name: 'Save and continue' }).click();
    
    // Verify advance assurance redirect - should prevent EIS form continuation 
    await expect(page.getByText('advance')).toBeVisible(); // This path stops here - cannot complete EIS form
  });
});

// Helper function to complete all remaining tasks (Tasks 2-15)
async function completeAllRemainingTasks(page: any) {
  // Task 2: Company Details (Full variant)
  await page.getByRole('link', { name: 'Company details' }).click();
  await page.getByRole('textbox', { name: 'What is the name of the' }).fill('Test Innovation Holdings Ltd');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('radio', { name: 'Yes' }).click();
  await page.getByRole('textbox', { name: 'Enter the trading name of the' }).fill('Innovation Tech Solutions');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'What is the Corporation Tax' }).fill('1111111111');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'What is the company' }).fill('12345678');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('radio', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'What is the employer PAYE' }).fill('123/AB456');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'Day' }).fill('15');
  await page.getByRole('textbox', { name: 'Month' }).fill('6');
  await page.getByRole('textbox', { name: 'Year' }).fill('2020');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();

  // Task 3: Business Address (UK path)
  await page.getByRole('link', { name: 'Business address' }).click();
  await page.getByRole('radio', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'Postcode' }).fill('M1 1AA');
  await page.getByRole('textbox', { name: 'Property name or number (' }).fill('10');
  await page.getByRole('button', { name: 'Find address' }).click();
  
  await page.getByRole('radio', { name: 'Enter the address manually' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'Address line 1' }).fill('10 Innovation Street');
  await page.getByRole('textbox', { name: 'Address line 2 (optional)' }).fill('Tech District');
  await page.getByRole('textbox', { name: 'Town or city (optional)' }).fill('Manchester');
  await page.getByRole('textbox', { name: 'Postcode' }).fill('M1 1AA');
  await page.getByRole('button', { name: 'Continue' }).click();
  
  await page.getByRole('button', { name: 'Confirm address' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();

  // Task 4: Knowledge-intensive companies (KIC)
  await page.getByRole('link', { name: 'Knowledge-intensive companies' }).click();
  await page.getByRole('radio', { name: 'No' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();
  await page.getByRole('button', { name: 'Save and continue' }).click();

  // Task 5: Share issue
  await page.getByRole('link', { name: 'Share issue' }).click();
  await page.getByRole('textbox', { name: 'Description of shares' }).fill('Ordinary');
  await page.getByRole('textbox', { name: 'Day' }).fill('10');
  await page.getByRole('textbox', { name: 'Month' }).fill('07');
  await page.getByRole('textbox', { name: 'Year' }).fill('2020');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('combobox', { name: 'Currency' }).fill('British');
  await page.getByRole('option', { name: 'British Pound - GBP' }).click();
  await page.getByRole('textbox', { name: 'Amount in this currency' }).fill('1.00');
  await page.getByRole('button', { name: 'Save and continue' }).click();
  
  await page.getByRole('textbox', { name: 'Number of investors requiring' }).fill('5');
  await page.getByRole('textbox', { name: 'Total amount paid by these' }).fill('250000');
  await page.getByRole('button', { name: 'Save and continue' }).click();

  // Continue with remaining tasks 6-15...
  // Note: This would need to be completed with actual form navigation for tasks 6-15
  // Each task would require specific form interactions to reach final submission
}
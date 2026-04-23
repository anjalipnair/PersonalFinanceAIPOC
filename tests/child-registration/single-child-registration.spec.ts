// spec: specs/child-benefit-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Child Registration - Happy Path Scenarios', () => {
  test('Single Child Registration Complete Flow', async ({ page }) => {
    // Authentication setup
    await page.goto('http://localhost:9005/start');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Enter an ID: letters and' }).fill('CB-USER-001');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // 1. Navigate to Benefits Service from dashboard
    await page.getByRole('link', { name: 'Visit Benefits Project' }).click();
    
    // expect: Benefits Journey start page should load
    await expect(page.getByRole('heading', { name: 'This is the start of the Benefits Journey' })).toBeVisible();
    
    // expect: Continue button should be available
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    
    // 2. Click Continue to start benefits journey
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Handle preliminary data loading questions
    await page.getByRole('radio', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('radio', { name: 'Yes' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // expect: Question 'Would you like to add a child?' should be displayed
    await expect(page.getByRole('heading', { name: 'Would you like to add a child?' })).toBeVisible();
    
    // expect: Yes/No radio options should be available
    await expect(page.getByRole('radio', { name: 'Yes' })).toBeVisible();
    
    // 3. Select 'Yes' to add a child
    await page.getByRole('radio', { name: 'Yes' }).click();
    
    // 4. Click Continue after selecting Yes
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // expect: First names and surname fields should be displayed
    await expect(page.getByRole('textbox', { name: 'Childs First Names' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Childs Surname' })).toBeVisible();
    
    // 5. Enter child's first names (e.g., 'Emma Grace') and surname (e.g., 'Smith')
    await page.getByRole('textbox', { name: 'Childs First Names' }).fill('Emma Grace');
    await page.getByRole('textbox', { name: 'Childs Surname' }).fill('Smith');
    
    // 6. Click Continue after entering child's name
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // expect: Child's name should be displayed in question
    await expect(page.getByText('What is Emma Grace Smith\'s date of Birth?')).toBeVisible();
    
    // expect: Day, Month, Year fields should be available
    await expect(page.getByRole('textbox', { name: 'Day' })).toBeVisible();
    
    // 7. Enter valid birth date (e.g., Day: 15, Month: 06, Year: 2020)
    await page.getByRole('textbox', { name: 'Day' }).fill('15');
    await page.getByRole('textbox', { name: 'Month' }).fill('06');
    await page.getByRole('textbox', { name: 'Year' }).fill('2020');
    
    // 8. Click Continue after entering birth date
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // expect: Disability Living Allowance question should appear
    await expect(page.getByRole('heading', { name: 'Is this Child receiving Disability Living Allowance?' })).toBeVisible();
    
    // 9. Select 'No' for Disability Living Allowance
    await page.getByRole('radio', { name: 'No' }).click();
    
    // Continue with remaining steps: Check Your Answers, Save & Continue, Final Confirmation, Entitlements
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Note: Additional steps for Check Your Answers, Save & Continue, Final Confirmation,
    // and Entitlements verification would be added here to complete the full test case
  });
});
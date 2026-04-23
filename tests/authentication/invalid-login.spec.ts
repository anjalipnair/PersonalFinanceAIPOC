// spec: specs/child-benefit-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and Access Control', () => {
  test('Invalid Authentication Attempts', async ({ page }) => {
    // Navigate to login page to test invalid authentication
    await page.goto('http://localhost:9000/login');
    
    // 1. Attempt to submit empty ID field
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // expect: Error message should indicate required field  
    await expect(page.getByRole('heading', { name: 'There is a problem' })).toBeVisible();
    
    // expect: Form validation should prevent submission
    await expect(page.getByText('Please enter a valid value in this field.')).toBeVisible();
    
    // 2. Enter ID with invalid characters (special characters other than hyphens)
    await page.getByRole('textbox', { name: 'Enter an ID: letters and' }).fill('CB@USER#001!');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // expect: Error message should specify allowed characters
    await expect(page.getByText('contain letters and numbers only, with hyphens allowed between characters')).toBeVisible();
    
    // 3. Enter extremely long ID (over reasonable character limit)
    await page.getByRole('textbox', { name: 'Enter an ID: letters and' }).fill('CB-USER-001-THIS-IS-AN-EXTREMELY-LONG-ID-THAT-EXCEEDS-REASONABLE-LIMITS-AND-SHOULD-BE-REJECTED');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // expect: Validation message should appear for character limits
    await expect(page.getByText('User IDs must be between 1-32 characters in length')).toBeVisible();
  });
});
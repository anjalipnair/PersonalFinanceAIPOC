// spec: specs/child-benefit-test-plan.md  
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and Access Control', () => {
  test('Successful Authentication Flow', async ({ page }) => {
    // 1. Navigate to http://localhost:9005/start without authentication
    await page.goto('http://localhost:9005/start');
    
    // expect: User should be redirected to unauthorised page
    await expect(page.getByRole('heading', { name: 'Unauthorised' })).toBeVisible();
    
    // expect: Log In button should be visible
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    
    // 2. Click the 'Log In' button
    await page.getByRole('button', { name: 'Log In' }).click();
    
    // expect: ID input field should be displayed
    await expect(page.getByRole('textbox', { name: 'Enter an ID: letters and numbers only, with hyphens allowed between characters.' })).toBeVisible();
    
    // expect: Submit button should be available
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    
    // 3. Enter valid ID format (e.g., 'CB-USER-001') in the ID field
    await page.getByRole('textbox', { name: 'Enter an ID: letters and' }).fill('CB-USER-001');
    
    // 4. Click Submit button
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // expect: Welcome message should be displayed
    await expect(page.getByText('Welcome back!')).toBeVisible();
    
    // expect: Benefits Service section should be visible
    await expect(page.getByRole('heading', { name: 'Benefits Service' })).toBeVisible();
  });
});
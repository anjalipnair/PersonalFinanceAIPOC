// spec: specs/child-benefit-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and Access Control', () => {
  test('Session and Sign Out Management', async ({ page }) => {
    // 1. Successfully authenticate and navigate to dashboard
    await page.goto('http://localhost:9005/start');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Enter an ID: letters and' }).fill('CB-USER-001');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // expect: Sign out link should be visible in header navigation
    await expect(page.getByRole('link', { name: 'Sign out' })).toBeVisible();
    
    // expect: Dashboard content should load
    await expect(page.getByRole('heading', { name: 'Personal Finances Dashboard Overview Page' })).toBeVisible();
    
    // 2. Click 'Sign out' link
    await page.getByRole('link', { name: 'Sign out' }).click();
    
    // expect: User should be logged out
    await expect(page.getByRole('heading', { name: 'You have been signed out' })).toBeVisible();
    
    // 3. Attempt to access protected pages after sign out
    await page.goto('http://localhost:9005/start');
    
    // expect: User should be redirected to unauthorised page
    await expect(page.getByRole('heading', { name: 'Unauthorised' })).toBeVisible();
    
    // expect: Login should be required again
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });
});
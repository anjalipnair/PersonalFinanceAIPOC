# Child Benefit Application - Comprehensive Test Plan

## Application Overview

A comprehensive test plan for the UK Government Child Benefit application system. This digitized service allows citizens to register children for benefit entitlements, manage multiple children, and calculate benefit amounts. The application follows GOV.UK design patterns and includes authentication, form validation, data persistence, and benefit calculation functionality.

## Test Scenarios

### 1. Authentication and Access Control

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Authentication Flow

**File:** `tests/authentication/successful-login.spec.ts`

**Steps:**
  1. Navigate to http://localhost:9005/start without authentication
    - expect: User should be redirected to unauthorised page
    - expect: Page should display 'Unauthorised' message
    - expect: Log In button should be visible
  2. Click the 'Log In' button
    - expect: User should be redirected to Authority Wizard login page
    - expect: ID input field should be displayed
    - expect: Submit button should be available
  3. Enter valid ID format (e.g., 'CB-USER-001') in the ID field
    - expect: Text should be entered successfully
    - expect: Field should accept alphanumeric characters and hyphens
    - expect: No validation errors should appear
  4. Click Submit button
    - expect: User should be redirected to Personal Finances Dashboard
    - expect: Welcome message should be displayed
    - expect: Benefits Service section should be visible

#### 1.2. Invalid Authentication Attempts

**File:** `tests/authentication/invalid-login.spec.ts`

**Steps:**
  1. Attempt to submit empty ID field
    - expect: Form validation should prevent submission
    - expect: Error message should indicate required field
    - expect: User should remain on login page
  2. Enter ID with invalid characters (special characters other than hyphens)
    - expect: Field validation should reject invalid characters
    - expect: Error message should specify allowed characters
    - expect: Submit should be disabled or show validation error
  3. Enter extremely long ID (over reasonable character limit)
    - expect: Field should enforce character limits
    - expect: Validation message should appear
    - expect: Form should not submit with invalid data

#### 1.3. Session and Sign Out Management

**File:** `tests/authentication/session-management.spec.ts`

**Steps:**
  1. Successfully authenticate and navigate to dashboard
    - expect: Sign out link should be visible in header navigation
    - expect: User session should be established
    - expect: Dashboard content should load
  2. Click 'Sign out' link
    - expect: User should be logged out
    - expect: Session should be terminated
    - expect: Redirect to appropriate logout page should occur
  3. Attempt to access protected pages after sign out
    - expect: User should be redirected to unauthorised page
    - expect: No cached session data should remain
    - expect: Login should be required again

### 2. Child Registration - Happy Path Scenarios

**Seed:** `tests/seed.spec.ts`

#### 2.1. Single Child Registration Complete Flow

**File:** `tests/child-registration/single-child-registration.spec.ts`

**Steps:**
  1. Navigate to Benefits Service from dashboard
    - expect: Benefits Journey start page should load
    - expect: Continue button should be available
    - expect: Page title should indicate benefits journey
  2. Click Continue to start benefits journey
    - expect: Child addition page should load
    - expect: Question 'Would you like to add a child?' should be displayed
    - expect: Yes/No radio options should be available
  3. Select 'Yes' to add a child
    - expect: Yes option should be selected
    - expect: Continue button should remain enabled
    - expect: Form should prepare for submission
  4. Click Continue after selecting Yes
    - expect: Child name entry page should load
    - expect: First names and surname fields should be displayed
    - expect: Both fields should be empty initially
  5. Enter child's first names (e.g., 'Emma Grace') and surname (e.g., 'Smith')
    - expect: Text should be entered in both fields
    - expect: No validation errors should appear
    - expect: Continue button should be enabled
  6. Click Continue after entering child's name
    - expect: Birth date page should load
    - expect: Child's name should be displayed in question
    - expect: Day, Month, Year fields should be available
  7. Enter valid birth date (e.g., Day: 15, Month: 06, Year: 2020)
    - expect: Date fields should accept numeric input
    - expect: No validation errors should appear
    - expect: Continue button should remain enabled
  8. Click Continue after entering birth date
    - expect: Disability Living Allowance question should appear
    - expect: Yes/No radio options should be displayed
    - expect: Question should be clear and understandable
  9. Select 'No' for Disability Living Allowance
    - expect: No option should be selected
    - expect: Continue button should remain active
    - expect: Form should be ready for submission
  10. Click Continue after DLA selection
    - expect: Check Your Answers page should load
    - expect: All entered information should be displayed
    - expect: Change links should be available for each section
  11. Review all information and click 'Save and Continue'
    - expect: Information should be saved
    - expect: Return to add child page with child listed in table
    - expect: Option to add another child should be presented
  12. Select 'No' to not add more children and Continue
    - expect: Final confirmation page should load
    - expect: All children should be listed in read-only table
    - expect: Final confirmation question should appear
  13. Select 'Yes' to confirm details are correct and Continue
    - expect: Entitlements page should load
    - expect: Child benefit amount should be calculated and displayed
    - expect: Child's name and benefit amount should be shown

#### 2.2. Multiple Children Registration

**File:** `tests/child-registration/multiple-children-registration.spec.ts`

**Steps:**
  1. Complete registration for first child following standard flow
    - expect: First child should be added to children table
    - expect: Table should show child's details
    - expect: Edit and Delete options should be available
  2. Select 'Yes' to add another child
    - expect: Child registration flow should start again
    - expect: URL should indicate index=1 for second child
    - expect: Form should be fresh for new child entry
  3. Enter second child's details with different information
    - expect: Second child's information should be entered independently
    - expect: Process should be identical to first child
    - expect: Data should not interfere with first child's data
  4. Complete second child registration
    - expect: Both children should appear in children table
    - expect: Each child should have separate Edit/Delete options
    - expect: Table should display both children's information clearly
  5. Select 'No' to finish adding children and complete application
    - expect: Final entitlements should show both children
    - expect: Separate benefit calculations should be displayed for each child
    - expect: Total family benefit should be calculated

### 3. Data Validation and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 3.1. Child Name Validation

**File:** `tests/validation/child-name-validation.spec.ts`

**Steps:**
  1. Navigate to child name entry page
    - expect: Name entry form should be displayed
    - expect: Both first names and surname fields should be present
    - expect: Fields should be empty initially
  2. Attempt to continue without entering any names
    - expect: Validation errors should appear
    - expect: Error summary should be displayed at top of page
    - expect: Required field error messages should be shown
  3. Enter only first names and leave surname empty
    - expect: Surname field should show validation error
    - expect: Error message should indicate surname is required
    - expect: Form should not submit
  4. Enter only surname and leave first names empty
    - expect: First names field should show validation error
    - expect: Error message should indicate first names are required
    - expect: Form should not submit
  5. Enter excessively long names (over character limits)
    - expect: Character limit validation should trigger
    - expect: Error message should indicate maximum length
    - expect: Form should not accept invalid data
  6. Enter names with special characters or numbers
    - expect: System should handle appropriately
    - expect: Either accept valid characters or show validation errors
    - expect: Clear guidance on acceptable characters should be provided

#### 3.2. Birth Date Validation

**File:** `tests/validation/birth-date-validation.spec.ts`

**Steps:**
  1. Navigate to birth date entry page
    - expect: Date entry form should show example format
    - expect: All three date fields should be present
    - expect: Clear labeling for Day, Month, Year should be visible
  2. Attempt to continue with empty date fields
    - expect: Date validation errors should appear
    - expect: All three fields should show required field errors
    - expect: Form should not submit
  3. Enter invalid day (e.g., 32, 0, -5)
    - expect: Day field validation should trigger
    - expect: Error message should specify valid day range (1-31)
    - expect: Form should not accept invalid day
  4. Enter invalid month (e.g., 13, 0, -2)
    - expect: Month field validation should trigger
    - expect: Error message should specify valid month range (1-12)
    - expect: Form should not accept invalid month
  5. Enter invalid year (future date, too far in past)
    - expect: Year validation should trigger
    - expect: Error should indicate reasonable birth year range
    - expect: Future dates should be rejected
  6. Enter invalid date combination (e.g., 31st February)
    - expect: Date combination validation should trigger
    - expect: Error message should indicate invalid date
    - expect: System should check date logic
  7. Enter non-numeric characters in date fields
    - expect: Fields should reject non-numeric input
    - expect: Validation error should appear
    - expect: Clear guidance on numeric input should be shown

#### 3.3. Form Persistence and Recovery

**File:** `tests/validation/form-persistence.spec.ts`

**Steps:**
  1. Enter child information and navigate using Back button
    - expect: Previously entered data should be preserved
    - expect: Form should remember user input
    - expect: No data loss should occur during navigation
  2. Complete child registration and use Edit functionality
    - expect: Edit form should be pre-populated with existing data
    - expect: Changes should be saved properly
    - expect: Original data should remain if edit is cancelled
  3. Navigate away from application and return
    - expect: Session data should be maintained appropriately
    - expect: User should be able to resume where they left off
    - expect: Data integrity should be preserved

### 4. Child Management Operations

**Seed:** `tests/seed.spec.ts`

#### 4.1. Edit Child Information

**File:** `tests/child-management/edit-child-information.spec.ts`

**Steps:**
  1. Add a child and return to children list
    - expect: Child should appear in children table
    - expect: Edit link should be available
    - expect: Child information should be displayed correctly
  2. Click Edit link for a child
    - expect: Check Your Answers page should load for that child
    - expect: All child information should be pre-populated
    - expect: Individual Change links should be available
  3. Click 'Change Childs Name' link
    - expect: Name edit form should load
    - expect: Current names should be pre-filled
    - expect: Form should allow modifications
  4. Modify child's name and save changes
    - expect: Updated name should be saved
    - expect: Return to Check Your Answers page
    - expect: Updated information should be reflected
  5. Click 'Change Childs Birth Date' link
    - expect: Birth date edit form should load
    - expect: Current date should be pre-filled in all three fields
    - expect: Date modification should be possible
  6. Modify birth date and save changes
    - expect: Updated birth date should be saved
    - expect: New date should appear in summary
    - expect: Benefit calculation should update if affected
  7. Navigate back to children list after editing
    - expect: Children table should show updated information
    - expect: Changes should persist in the main list
    - expect: Edit timestamp or indicator should be appropriate

#### 4.2. Delete Child Operation

**File:** `tests/child-management/delete-child.spec.ts`

**Steps:**
  1. Add multiple children to have test data
    - expect: Multiple children should be listed in table
    - expect: Each child should have a Delete link
    - expect: Table should clearly identify each child
  2. Click Delete link for one child
    - expect: Delete confirmation should appear
    - expect: Specific child being deleted should be identified
    - expect: Cancel option should be available
  3. Confirm deletion of the child
    - expect: Child should be removed from the list
    - expect: Remaining children should stay intact
    - expect: Table should update to reflect removal
  4. Verify remaining children data integrity
    - expect: Other children's information should be unchanged
    - expect: Edit/Delete links should work for remaining children
    - expect: No data corruption should occur
  5. Attempt to delete the last remaining child
    - expect: System should handle single child deletion appropriately
    - expect: Application should guide user on next steps
    - expect: Empty state should be handled gracefully

### 5. Navigation and User Experience

**Seed:** `tests/seed.spec.ts`

#### 5.1. Navigation Flow and Back Button Functionality

**File:** `tests/navigation/back-button-navigation.spec.ts`

**Steps:**
  1. Navigate through child registration process
    - expect: Back links should be present on each page
    - expect: Back navigation should work correctly
    - expect: Data should be preserved during back navigation
  2. Use Back link on child name entry page
    - expect: Should return to 'add a child' selection page
    - expect: Previous selection should be remembered
    - expect: Forward navigation should resume properly
  3. Use browser back button during registration
    - expect: Application should handle browser navigation gracefully
    - expect: Form data should be preserved where possible
    - expect: User should not lose significant progress
  4. Navigate to different sections using Return to Dashboard
    - expect: Dashboard link should work from all pages
    - expect: User should be able to return to main navigation
    - expect: Application state should be maintained appropriately

#### 5.2. Language and Accessibility Features

**File:** `tests/navigation/language-accessibility.spec.ts`

**Steps:**
  1. Verify language switcher functionality
    - expect: Welsh language option should be available
    - expect: Language toggle should work on all pages
    - expect: Content should translate appropriately
  2. Test keyboard navigation through forms
    - expect: All interactive elements should be keyboard accessible
    - expect: Tab order should be logical
    - expect: Focus indicators should be visible
  3. Verify screen reader compatibility
    - expect: Form labels should be properly associated
    - expect: Error messages should be announced
    - expect: Page structure should be semantically correct
  4. Test skip to main content functionality
    - expect: Skip link should be available
    - expect: Skip link should work correctly
    - expect: Navigation should be efficient for screen reader users

#### 5.3. Application State Management

**File:** `tests/navigation/state-management.spec.ts`

**Steps:**
  1. Complete partial application and use 'Start again' functionality
    - expect: Start again should clear all entered data
    - expect: User should return to beginning of process
    - expect: Fresh session should be established
  2. Use 'delete entitlements' functionality from results page
    - expect: All entitlement calculations should be cleared
    - expect: User should be guided to restart process
    - expect: Data should be properly purged
  3. Test session timeout and recovery
    - expect: Session expiry should be handled gracefully
    - expect: User should be notified of timeout
    - expect: Re-authentication should be straightforward

### 6. Benefit Calculation and Results

**Seed:** `tests/seed.spec.ts`

#### 6.1. Basic Benefit Calculation Scenarios

**File:** `tests/calculations/basic-benefit-calculations.spec.ts`

**Steps:**
  1. Register single child without DLA
    - expect: Standard child benefit rate should be calculated
    - expect: Amount should display correctly (e.g., £26.05)
    - expect: Child's name should be associated with benefit
  2. Register child with Disability Living Allowance
    - expect: Enhanced benefit rate should be calculated
    - expect: DLA impact should be reflected in amount
    - expect: Calculation should be higher than standard rate
  3. Register multiple children with mixed DLA status
    - expect: Individual calculations should be made for each child
    - expect: Different rates should be shown based on DLA status
    - expect: Total family entitlement should be displayed
  4. Verify calculation accuracy with different child ages
    - expect: Age-based benefit rates should be applied correctly
    - expect: First child vs subsequent children rates should differ
    - expect: Birth date should influence calculation

#### 6.2. Results Display and Management

**File:** `tests/calculations/results-display.spec.ts`

**Steps:**
  1. Complete application and review entitlements page
    - expect: Results should be clearly formatted
    - expect: Child benefit amounts should be displayed with £ symbol
    - expect: Each child should be listed with their specific entitlement
  2. Verify results table structure and completeness
    - expect: Table should have proper headers
    - expect: All registered children should appear
    - expect: Benefit amounts should be accurate per child
  3. Test results page action buttons
    - expect: Start again button should reset entire application
    - expect: Delete entitlements should clear calculations
    - expect: Return to Dashboard should work correctly

### 7. Edge Cases and Error Scenarios

**Seed:** `tests/seed.spec.ts`

#### 7.1. Boundary Testing and Limits

**File:** `tests/edge-cases/boundary-testing.spec.ts`

**Steps:**
  1. Register maximum number of children allowed by system
    - expect: System should handle multiple children gracefully
    - expect: Performance should remain acceptable
    - expect: All children should be processed correctly
  2. Test with children having identical names
    - expect: System should differentiate between children
    - expect: Unique identifiers should prevent confusion
    - expect: Edit/Delete operations should target correct child
  3. Register children with ages at benefit eligibility boundaries
    - expect: Age limit validation should work correctly
    - expect: Children too old for benefits should be handled appropriately
    - expect: Clear messaging about eligibility should appear

#### 7.2. Network and System Error Handling

**File:** `tests/edge-cases/error-handling.spec.ts`

**Steps:**
  1. Simulate network interruption during form submission
    - expect: User should receive appropriate error message
    - expect: Data should be preserved where possible
    - expect: Recovery options should be provided
  2. Test application behavior with slow network conditions
    - expect: Loading states should be indicated to user
    - expect: Timeouts should be handled gracefully
    - expect: User should not experience data loss
  3. Attempt operations with invalid session states
    - expect: Invalid sessions should be detected
    - expect: User should be prompted to re-authenticate
    - expect: Security should be maintained

#### 7.3. Data Consistency and Integrity

**File:** `tests/edge-cases/data-integrity.spec.ts`

**Steps:**
  1. Rapidly perform multiple add/edit/delete operations
    - expect: Data consistency should be maintained
    - expect: Race conditions should be handled properly
    - expect: Final state should be accurate
  2. Test with unusual but valid name formats (hyphenated, apostrophes)
    - expect: Valid name variations should be accepted
    - expect: Special characters should be handled correctly
    - expect: Display should maintain proper formatting
  3. Verify data persistence across user sessions
    - expect: Data should be properly saved
    - expect: Session management should maintain data integrity
    - expect: User should be able to resume applications appropriately

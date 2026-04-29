# EIS Form Comprehensive UI & Validation Test Plan - Complete Permutation Coverage

## Application Overview

Enterprise Investment Scheme (EIS) compliance statement form - Complete UI and validation test plan covering ALL possible variants, permutation combinations, and conditional logic paths across all 15 tasks. Every test scenario ensures complete form submission with comprehensive coverage of field validation, database validation, conditional branching, file uploads, and cross-browser compatibility.

## Test Scenarios

### 1. Task 1: Eligibility - All Decision Paths with Complete Form Submissions

**Seed:** `tests/auth-setup.spec.ts`

#### 1.1. T1-PATH1: EIS Eligible → Continue → Complete Full Form Submission

**File:** `tests/eligibility/path1-eis-eligible-continue-full-submission.spec.ts`

**Steps:**
  1. Navigate to https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in, set Organisation affinity, redirect to /submissions/new-form/submit-enterprise-investment-scheme-compliance-statement-eis1-to-hmrc
    - expect: Government Gateway authentication successful
    - expect: EIS task list displayed with 0 of 15 tasks completed
  2. Select 'Yes' - shares already issued
    - expect: Eligibility question displays: 'Have the shares already been issued to the investors who want EIS relief?'
  3. Select 'Yes, and I understand that if I submit this form the shares are treated as being issued under the EIS'
    - expect: EIS confirmation question displays: 'Do you confirm you want to continue with this compliance statement for EIS?'
  4. Complete Task 1 check answers
    - expect: Task 1 completed
    - expect: Check answers page shows both responses
    - expect: Task 2 unlocks
  5. Complete entire form with one valid permutation path (UK company, no trading name, no PAYE, valid UTR 1111111111, etc.) and submit successfully
    - expect: Continue through ALL 15 tasks with valid data
    - expect: Complete form submission achieved

#### 1.2. T1-PATH2: EIS Eligible → SEIS Redirect → Stop (Cannot Complete)

**File:** `tests/eligibility/path2-eis-eligible-seis-redirect.spec.ts`

**Steps:**
  1. Access EIS form via specified URLs
    - expect: Authentication and navigation successful
  2. Select 'Yes' - shares already issued
    - expect: Shares issued question displayed
  3. Select 'No, I intend for the shares to be treated as under the SEIS'
    - expect: SEIS redirect page displayed
    - expect: Cannot continue with EIS form
  4. Verify redirect and document termination point
    - expect: User redirected to SEIS information page
    - expect: EIS form submission not possible in this path

#### 1.3. T1-PATH3: Not EIS Eligible → Advance Assurance Redirect → Stop

**File:** `tests/eligibility/path3-advance-assurance-redirect.spec.ts`

**Steps:**
  1. Access EIS form
    - expect: Authentication successful
  2. Select 'No, I want to know if future investments would qualify for EIS'
    - expect: Advance assurance information displayed
    - expect: Cannot continue with current EIS form
  3. Verify redirect to advance assurance process
    - expect: User redirected to advance assurance application
    - expect: EIS form submission not possible

### 2. Task 2: Company Details - All Field Variants with Form Completion

**Seed:** `tests/auth-setup.spec.ts`

#### 2.1. T2-FULL: All Optional Fields + Complete Form Submission

**File:** `tests/company-details/full-fields-complete-submission.spec.ts`

**Steps:**
  1. Complete Task 1 successfully
    - expect: Task 1 completed with EIS eligible path
  2. Enter company name: 'Test Innovation Holdings Ltd'
    - expect: Company name field accepts valid input
  3. Select 'Yes' for different trading name, enter 'Innovation Tech Solutions'
    - expect: Trading name conditional field appears
    - expect: Trading name text field displayed
  4. Enter valid UTR: '1111111111' (passes database validation)
    - expect: UTR validates against database
    - expect: Valid UTR accepted
  5. Enter registration number: '12345678'
    - expect: Company registration number field accepts 8-character format
  6. Select 'Yes' for PAYE reference, enter '123/AB456'
    - expect: PAYE conditional field appears
    - expect: PAYE reference field displayed
  7. Enter incorporation date: 15/06/2020
    - expect: Incorporation date fields accept valid date
  8. Complete Task 2 and continue through ALL remaining tasks (3-15) to achieve complete form submission
    - expect: Task 2 check answers shows all 6 fields
    - expect: ALL REMAINING TASKS COMPLETED
    - expect: Full form submission successful

#### 2.2. T2-MINIMAL: Required Fields Only + Complete Submission

**File:** `tests/company-details/minimal-fields-complete-submission.spec.ts`

**Steps:**
  1. Complete Task 1 EIS eligible path
    - expect: Task 1 path completed
  2. Enter company name (required field)
    - expect: Company name entered
  3. Select 'No' for trading name (conditional field hidden)
    - expect: No trading name field shown
  4. Enter valid UTR: '1111111111'
    - expect: UTR validation passes
  5. Enter registration number: '12345678'
    - expect: Registration number entered
  6. Select 'No' for PAYE reference (conditional field hidden)
    - expect: No PAYE field shown
  7. Enter incorporation date
    - expect: Date validation passes
  8. Complete Task 2 with minimal configuration and continue through full form to submission
    - expect: Task 2 shows 4 required fields only
    - expect: COMPLETE ALL REMAINING TASKS
    - expect: Successful form submission

#### 2.3. T2-VALIDATION: All Validation Scenarios + Recovery + Full Submission

**File:** `tests/company-details/validation-errors-recovery-submission.spec.ts`

**Steps:**
  1. Test invalid UTR: '0123456789' (valid format, non-existent)
    - expect: UTR validation error: 'The Unique Taxpayer Reference entered does not exist'
  2. Test invalid formats: 9 digits ('012345678'), 11 digits ('01234567890'), letters ('012345678A')
    - expect: UTR format validation errors
  3. Test invalid registration numbers: too short, too long, invalid characters
    - expect: Company registration format validation
  4. Test invalid PAYE formats (wrong pattern, missing slash, etc.)
    - expect: PAYE reference format validation
  5. Test invalid dates: future dates, invalid formats, impossible dates
    - expect: Date validation errors for incorporation date
  6. Recover from all validation errors with correct data and complete entire form
    - expect: All validation errors corrected
    - expect: Task 2 completed successfully
    - expect: FULL FORM SUBMISSION ACHIEVED

#### 2.4. T2-PERMUTATIONS: All Conditional Field Combinations + Full Submissions

**File:** `tests/company-details/trading-paye-permutations-submission.spec.ts`

**Steps:**
  1. Test combination 1: Trading name present + PAYE reference present
    - expect: Trading=Yes, PAYE=Yes: Both conditional fields displayed
  2. Test combination 2: Trading name present + No PAYE reference
    - expect: Trading=Yes, PAYE=No: Trading field shown, PAYE hidden
  3. Test combination 3: No trading name + PAYE reference present
    - expect: Trading=No, PAYE=Yes: Trading hidden, PAYE field shown
  4. Test combination 4: No trading name + No PAYE reference
    - expect: Trading=No, PAYE=No: Both conditional fields hidden
  5. For each combination, complete entire EIS form (Tasks 1-15) and achieve successful submission
    - expect: ALL 4 COMBINATIONS COMPLETE FULL FORM SUBMISSIONS

### 3. Task 3: Business Address - UK vs Non-UK Complete Submission Flows

**Seed:** `tests/auth-setup.spec.ts`

#### 3.1. T3-UK-LOOKUP: UK Company + Postcode Lookup + Full Submission

**File:** `tests/business-address/uk-company-postcode-lookup-submission.spec.ts`

**Steps:**
  1. Complete prerequisite tasks
    - expect: Tasks 1-2 completed with valid data
  2. Select 'Yes' for UK incorporation
    - expect: UK incorporation path selected
  3. Enter UK postcode 'M1 1AA' and optional property number '10'
    - expect: Postcode lookup form displayed
  4. Handle 'No addresses found' error, select manual entry
    - expect: Address lookup failure recovery
  5. Complete 4-field UK address (line1, line2, city, postcode)
    - expect: UK manual address form completed
  6. Confirm formatted UK address
    - expect: Address confirmation successful
  7. Complete Task 3 and continue through ALL remaining tasks (4-15) for complete submission
    - expect: Task 3 completed
    - expect: ALL REMAINING TASKS COMPLETED
    - expect: Full form submission achieved

#### 3.2. T3-NONUK-FULL: Non-UK Company + Dual Addresses + Files + Full Submission

**File:** `tests/business-address/non-uk-company-dual-address-files-submission.spec.ts`

**Steps:**
  1. Complete prerequisite tasks
    - expect: Tasks 1-2 completed
  2. Select 'No' for UK incorporation
    - expect: Non-UK address form (6 fields) displayed
  3. Complete non-UK address: line1='456 International Blvd', city='Dublin', country='Ireland' from 253 country options
    - expect: International address completed
  4. Complete UK permanent establishment address (4 fields)
    - expect: UK establishment address required
  5. Enter permanent establishment details text
    - expect: Establishment explanation provided
  6. Upload 1-3 evidence files (PDF/JPEG/XLSX/etc., max 10MB each)
    - expect: Evidence files uploaded (mandatory)
  7. Complete complex non-UK flow and continue through complete form submission
    - expect: Task 3 completed with dual addresses + files
    - expect: ALL REMAINING TASKS COMPLETED
    - expect: Full form submission achieved

#### 3.3. T3-COUNTRIES: Multiple Country Selections + Complete Submissions

**File:** `tests/business-address/country-variants-submission-matrix.spec.ts`

**Steps:**
  1. Select non-UK incorporation
    - expect: Non-UK company path initiated
  2. Test multiple countries from 253 options: Ireland, France, Germany, USA, Australia, Canada, India, etc.
    - expect: Major country selections tested
  3. For each country, complete dual address requirements
    - expect: Each country allows form completion
  4. Test different file upload combinations (1-3 files)
    - expect: FILE UPLOAD PERMUTATIONS: 1 file, 2 files, 3 files
  5. Test all 8 supported file formats
    - expect: FILE FORMAT VARIANTS: PDF, JPEG, XLSX, DOCX, etc.
  6. Complete entire EIS form for each major country variant
    - expect: EVERY COUNTRY + FILE COMBINATION ACHIEVES FULL SUBMISSION

### 4. Tasks 4-15: Systematic Complete Form Submission Test Matrix

**Seed:** `tests/auth-setup.spec.ts`

#### 4.1. T4-KIC: Knowledge-Intensive Companies + Complete Submission

**File:** `tests/remaining-tasks/task4-kic-classification-full-submission.spec.ts`

**Steps:**
  1. Complete prerequisite tasks with valid data
    - expect: Tasks 1-3 completed successfully
  2. Explore all KIC classification variants and conditional paths
    - expect: KIC classification options displayed
  3. Test each KIC classification option and its impact on subsequent tasks
    - expect: All KIC permutations tested
  4. For each KIC classification, complete ALL remaining tasks (5-15) and achieve successful submission
    - expect: COMPLETE FORM SUBMISSION for each KIC variant

#### 4.2. T5-SHARES: Share Issue Details + Complete Submission Matrix

**File:** `tests/remaining-tasks/task5-share-issue-variants-submission.spec.ts`

**Steps:**
  1. Complete all prerequisite tasks
    - expect: Tasks 1-4 completed
  2. Map all share issue field variants, calculations, and validation rules
    - expect: Share issue form variants explored
  3. Test different share amounts, dates, and investor configurations
    - expect: Share amount calculations tested
  4. Complete full form for each share issue configuration
    - expect: EVERY SHARE VARIANT ACHIEVES COMPLETE SUBMISSION

#### 4.3. T6-T11: Previous Investments + Business Conditions + Complete Submissions

**File:** `tests/remaining-tasks/tasks6-11-conditional-dependencies-submission.spec.ts`

**Steps:**
  1. Complete all prerequisite tasks
    - expect: Tasks 1-5 completed
  2. Explore previous investment variants and dependencies on Task 5
    - expect: Task 6: Previous investments conditional logic mapped
  3. Map qualifying business activity classifications and risk assessments
    - expect: Tasks 7-8: Business activity + Risk to capital variants
  4. Document maximum permitted age, control structures, and asset/employee limits
    - expect: Tasks 9-11: Age + Control + Assets conditional unlocking
  5. For each combination of Tasks 6-11 variants, complete full form submission
    - expect: ALL CONDITIONAL PATHS RESULT IN COMPLETE SUBMISSIONS

#### 4.4. T12-T15: Documents + Declaration + Final Submission Matrix

**File:** `tests/remaining-tasks/tasks12-15-final-submission-matrix.spec.ts`

**Steps:**
  1. Complete all business condition tasks
    - expect: Tasks 1-11 completed with all variants
  2. Test different document upload scenarios and file requirements
    - expect: Task 12: Supporting documents upload variants
  3. Map all personal information field variants and validation rules
    - expect: Task 13: About you personal details variants
  4. Document declaration options and legal confirmations
    - expect: Task 14: Declaration variants and conditions
  5. Map final check and submit process
    - expect: Task 15: Final submission confirmation
  6. Ensure every possible combination across ALL 15 tasks results in successful form submission
    - expect: COMPLETE PERMUTATION MATRIX ACHIEVED

#### 4.5. COMPREHENSIVE: Complete Permutation Matrix - All Possible Combinations

**File:** `tests/comprehensive/full-permutation-matrix-submissions.spec.ts`

**Steps:**
  1. Use only the successful Task 1 path that allows form continuation
    - expect: Task 1: 1 successful path (EIS eligible)
  2. Test all 4 conditional field combinations
    - expect: Task 2: 4 field combinations (trading yes/no × PAYE yes/no)
  3. Test representative sample of address variants including major countries and file combinations
    - expect: Task 3: UK simple (12 variants) vs Non-UK complex (100,000+ variants)
  4. Apply systematic exploration results to map complete variant space
    - expect: Tasks 4-15: All discovered variants per task
  5. Execute strategic sampling of complete permutation space to ensure every major variant combination achieves successful form submission
    - expect: MATHEMATICAL PERMUTATION TOTAL: Test representative sample ensuring complete coverage
  6. Verify that every single test case completes with successful form submission confirmation
    - expect: FINAL VALIDATION: Every test scenario must result in successful EIS form submission

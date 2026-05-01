# EIS Form Testing Framework - Page Object Model

This refactored framework implements page object model patterns with reusable utilities and environment configuration for maintainable EIS form testing.

## 🏗️ Framework Structure

```
tests/
├── config.ts                              # Environment configuration & test data
├── pages/                                  # Page Object Model classes
│   ├── base.page.ts                       # Base page with common operations
│   ├── authentication.page.ts             # Authentication flow
│   ├── eligibility.page.ts               # Task 1: Eligibility
│   ├── company-details.page.ts           # Task 2: Company Details
│   └── business-address.page.ts          # Task 3: Business Address
├── utils/                                 # Utility functions
│   ├── selectors.ts                      # Centralized element selectors
│   ├── test-helpers.ts                   # Common test operations
│   └── data-factory.ts                   # Test data generation
└── Trial-1/
    ├── task-3-business-address-variants.spec.ts      # Original test file
    └── task-3-business-address-refactored.spec.ts    # Refactored with POM
```

## 🚀 Quick Start

### 1. Environment Setup
Configure your environment in `.env`:
```bash
# URLs and endpoints
BASE_URL=https://test-www.tax.service.gov.uk
AUTH_URL=https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in

# Test data
DEFAULT_UTR=1111111111
DEFAULT_COMPANY_REG=12345678

# Browser configuration
HEADLESS=true
BROWSER_TYPE=chromium
```

### 2. Run Refactored Tests
```bash
# Run specific refactored test file
npx playwright test tests/Trial-1/task-3-business-address-refactored.spec.ts

# Run with UI mode for debugging
npx playwright test tests/Trial-1/task-3-business-address-refactored.spec.ts --ui

# Run in headed mode
npx playwright test tests/Trial-1/task-3-business-address-refactored.spec.ts --headed
```

## 📚 Framework Components

### Configuration (`config.ts`)
- Environment variables management
- Test data sets for companies and addresses
- Timeout and browser configurations

### Page Objects (`pages/`)
- **BasePage**: Common operations (click, fill, verify, navigate)
- **AuthenticationPage**: Login flows for different user types
- **EligibilityPage**: Task 1 completion with all paths
- **CompanyDetailsPage**: Task 2 with minimal/full variants
- **BusinessAddressPage**: Task 3 with UK/Non-UK flows

### Utilities (`utils/`)
- **Selectors**: Centralized element selectors repository
- **TestHelpers**: EISTestHelper class for common test workflows
- **DataFactory**: Test data generation and variants

## 🔧 Usage Examples

### Basic Test Setup
```typescript
import { EISTestHelper } from '../utils/test-helpers';
import { DataFactory } from '../utils/data-factory';

test('Example Test', async ({ page }) => {
  const testHelper = new EISTestHelper(page);
  const { address: addressPage } = testHelper.getPages();
  
  // Setup prerequisites (Tasks 1-2)
  await testHelper.setupPrerequisiteTasks('Test Company Ltd');
  
  // Use page objects for Task 3
  await addressPage.navigateToBusinessAddress();
  await addressPage.selectUKIncorporation();
  
  // Use test data factory
  const ukAddress = DataFactory.getUKAddress('manchester');
  await addressPage.enterUKAddress(ukAddress);
});
```

### Custom Test Data
```typescript
// Use predefined data
const address = DataFactory.getUKAddress('birmingham');

// Create custom data
const customAddress = DataFactory.createCustomAddress({
  line1: '123 Custom Street',
  city: 'Custom City',
  postcode: 'CU1 1ST'
});

// Generate random data
const randomUTR = DataFactory.generateRandomUTR();
```

### Environment Configuration
```typescript
import { CONFIG, TEST_DATA } from '../config';

// Use environment URLs
await page.goto(CONFIG.BASE_URL);

// Use test data sets
const company = TEST_DATA.COMPANIES.UK_MINIMAL;
```

## 🎯 Benefits

### ✅ **Reusability**
- Page objects work across multiple test files
- Common operations centralized in base classes
- Test data factory provides consistent data generation

### ✅ **Maintainability**  
- UI changes only require updates in page objects
- Centralized selectors in one location
- Environment configuration separate from test logic

### ✅ **Scalability**
- Easy to add new page objects for additional tasks
- Framework supports different test environments
- Extensible data factory for new test scenarios

### ✅ **Debugging**
- Built-in error handling and validation
- Screenshot capture for failures
- Comprehensive logging and verification

## 🔄 Migration Guide

### From Original to Refactored Tests

**Before (Original):**
```typescript
// Direct Playwright API calls scattered throughout
await page.goto('https://test-www.tax.service.gov.uk/auth-login-stub/gg-sign-in');
await page.getByRole('textbox', { name: 'Redirect URL' }).fill('/submissions/new-form/...');
await page.getByLabel('Affinity Group').selectOption(['Organisation']);
```

**After (Refactored):**
```typescript
// Clean, reusable page object methods  
const testHelper = new EISTestHelper(page);
await testHelper.setupPrerequisiteTasks('Company Name');
```

### Key Improvements:
1. **Abstraction**: Complex flows wrapped in simple methods
2. **Data Management**: Test data organized and reusable
3. **Configuration**: Environment-specific settings externalized
4. **Error Handling**: Built-in validation and recovery
5. **Documentation**: Self-documenting page object methods

## 🔍 Advanced Features

### Custom Company Setup
```typescript
const fullCompany = DataFactory.createUKFullCompany({
  name: 'Custom Company Name',
  tradingName: 'Custom Trading Name'
});

await testHelper.setupFullCompanyPrerequisites(fullCompany);
```

### Multiple Address Variants
```typescript
// Different UK addresses
const manchester = DataFactory.getUKAddress('manchester');
const birmingham = DataFactory.getUKAddress('birmingham');
const london = DataFactory.getUKAddress('london');

// International addresses
const ireland = DataFactory.getInternationalAddress('ireland');
const germany = DataFactory.getInternationalAddress('germany');
```

### Validation Testing
```typescript
await addressPage.performPostcodeLookup('INVALID'); // Test error handling
await addressPage.selectManualEntryAfterLookup();   // Recovery flow
```

This framework provides a solid foundation for scaling your Playwright test suite with maintainable, reusable, and well-documented code!
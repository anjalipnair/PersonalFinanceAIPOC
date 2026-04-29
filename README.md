# EIS Form Testing Suite - A Comprehensive Playwright Automation Framework

## Overview

This project is a comprehensive Playwright-based end-to-end testing suite designed specifically for testing Enterprise Investment Scheme (EIS) compliance statement forms on the UK government's tax service platform. The suite provides thorough coverage of all form submission workflows, validation scenarios, and user journey permutations.

## Features

- **Complete Form Coverage**: Tests all 15 tasks/steps in the EIS form submission process
- **Comprehensive Test Scenarios**: Multiple test trials covering different path combinations
- **Variant Testing**: Tests various form field combinations and validation scenarios
- **Cross-Browser Testing**: Configured for multiple browser engines (Chromium, Firefox, WebKit)
- **Detailed Reporting**: HTML reports with screenshots and trace files for test analysis
- **Parallel Execution**: Optimized for fast test execution with parallel test runs

## Project Structure

```
├── tests/
│   ├── Trial-1/           # First set of comprehensive test scenarios
│   │   ├── comprehensive-eis-form-test-suite.spec.ts
│   │   ├── task-1-eligibility-all-paths.spec.ts
│   │   ├── task-2-company-details-variants.spec.ts
│   │   ├── task-3-business-address-variants.spec.ts
│   │   └── tasks-4-15-complete-submission-matrix.spec.ts
│   └── Trial-2/           # Additional test scenarios
├── test-results/          # Test execution results and artifacts
├── playwright-report/     # Generated HTML test reports
├── specs/                 # Test specifications and documentation
├── playwright.config.ts   # Playwright configuration
└── package.json          # Project dependencies and scripts
```

## Test Coverage

### Task Categories Covered

1. **Eligibility Testing** - EIS eligibility validation paths
2. **Company Details** - Various company information scenarios
3. **Business Addresses** - Different address validation combinations
4. **Complete Submission Matrix** - End-to-end form submission workflows

### Test Scenarios

- **Integration Tests**: Complete form submission workflows
- **Variant Testing**: Different field combinations and validation scenarios  
- **Path Coverage**: All possible user journey permutations
- **Error Handling**: Validation and error condition testing

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Internet connection for accessing the test environment

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd GformPOC
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Usage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (browser visible)
npm run test:headed

# Run specific test file
npx playwright test tests/Trial-1/task-1-eligibility-all-paths.spec.ts

# Run tests with specific browser
npx playwright test --project=chromium
```

### Test Server Setup

For local testing scenarios:

```bash
# Setup local test server
npm run setup:test-server

# Start test server
npm run start:test-server
```

### Viewing Reports

After test execution, view the HTML report:

```bash
npx playwright show-report
```

## Configuration

The test suite is configured via `playwright.config.ts` with:

- **Multiple Browser Support**: Chromium, Firefox, WebKit
- **Parallel Execution**: Optimized for performance
- **Screenshot and Video Capture**: For debugging failed tests
- **Retry Logic**: Automatic retries on CI environments
- **Custom Timeouts**: Appropriate timeouts for form interactions

## Test Environment

The tests are designed to work with the UK government's tax service test environment:
- **Base URL**: `https://test-www.tax.service.gov.uk`
- **Authentication**: Government Gateway (GG) test stub
- **Form Type**: EIS compliance statement submissions

## Contributing

1. Follow the existing test structure and naming conventions
2. Add comprehensive assertions for new test scenarios
4. Include appropriate wait strategies for dynamic content
5. Document new test cases in the specs directory

## Test Data Management

- Test data is embedded within test files for maintainability
- Use realistic but obviously test data (e.g., "Integration Test Holdings Ltd")
- Avoid using real company information or sensitive data

## Debugging

For test debugging:

1. Use `--headed` mode to see browser interactions
2. Enable `--debug` for step-by-step execution
3. Check `test-results/` for screenshots and traces
4. Use `page.pause()` for interactive debugging

## Reports and Artifacts

- **HTML Reports**: Generated in `playwright-report/`
- **Test Results**: Detailed results in `test-results/`
- **Screenshots**: Captured on test failures
- **Video Recordings**: Available for failed tests
- **Trace Files**: For detailed debugging

## License

ISC License

## Support

For issues or questions regarding this test suite, please check the existing documentation in the `specs/` directory or create an issue in the project repository.

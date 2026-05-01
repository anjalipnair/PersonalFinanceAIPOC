// Centralized Element Selectors Repository
export const SELECTORS = {
  AUTH: {
    redirectInput: 'textbox[name="Redirect URL"]',
    affinityDropdown: 'label:has-text("Affinity Group")',
    submitButton: 'button:nth-child(2)',
    organisationOption: 'option[value="Organisation"]'
  },
  
  NAVIGATION: {
    eligibilityLink: 'link[name="Eligibility for EIS service"]',
    companyDetailsLink: 'link[name="Company details"]',
    businessAddressLink: 'link[name="Business address"]',
    kicLink: 'link[name="Knowledge-intensive companies"]',
    shareIssueLink: 'link[name="Share issue"]',
    
    saveAndContinueBtn: 'button[name="Save and continue"]',
    continueBtn: 'button[name="Continue"]',
    confirmBtn: 'button[name="Confirm address"]'
  },
  
  FORMS: {
    yesRadio: 'radio[name="Yes"]',
    noRadio: 'radio[name="No"]',
    dayInput: 'textbox[name="Day"]',
    monthInput: 'textbox[name="Month"]', 
    yearInput: 'textbox[name="Year"]',
    
    // Dynamic selectors
    textInput: (label: string) => `textbox[name*="${label}"]`,
    dropdown: (label: string) => `combobox[name*="${label}"]`,
    radioByText: (text: string) => `radio[name="${text}"]`
  },
  
  ADDRESS: {
    postcodeInput: 'textbox[name="Postcode"]',
    propertyInput: 'textbox[name*="Property name or number"]',
    addressLine1: 'textbox[name="Address line 1"]',
    addressLine2: 'textbox[name="Address line 2"]',
    cityInput: 'textbox[name*="Town or city"]',
    regionInput: 'textbox[name*="County, state, province"]',
    postalCodeInput: 'textbox[name*="Postal code or zip code"]',
    countryDropdown: 'combobox[name="Country"]',
    
    findAddressBtn: 'button[name="Find address"]',
    manualEntryRadio: 'radio[name="Enter the address manually"]',
    manualEntryLink: 'link[name="Enter the address manually"]'
  },
  
  HEADINGS: {
    taskCompletion: (taskNum: number) => `text="You have completed ${taskNum} of 15 tasks"`,
    checkAnswers: (section: string) => `heading[name*="Check your answers for ${section}"]`,
    reviewConfirm: 'heading[name="Review and confirm"]'
  },
  
  MESSAGES: {
    noAddressFound: 'text="We cannot find any addresses for this postcode"',
    ukIncorporation: 'text="Was the company incorporated in the UK?"',
    registeredAddress: 'text="What is the registered business address?"'
  }
};
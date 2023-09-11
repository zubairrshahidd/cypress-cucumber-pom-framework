import { Given, Then, Before } from "cypress-cucumber-preprocessor/steps";
import PracticePage from './homePageMethods'
import { e2e } from '../../../../cypress.json';
import { propertySearchAPIs } from '../../apiCalls';

const url = e2e.baseURL

Before(() => {

  cy.log('Before hook')
  cy.viewport('macbook-15', {
    disableScrolling: true
  });
  // Disable scroll behavior
  cy.window().then((win) => {
    win.scrollTo = () => { };
  });

});
beforeEach(() => {
  cy.window().then((win) => {
    win.addEventListener('scroll', (e) => {
      e.preventDefault(); 
      e.stopPropagation();
    });
  });
});


Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Given('I open PropertyFinder page', { scrollBehavior: false }, () => {
  cy.visit(url, {
    failOnStatusCode: false,
  })
});

Then('I see title of the page as "Proper Finder BH"', { scrollBehavior: false }, () => {
  PracticePage.getTitle("Property Finder BH")
});

And('I select Villa under property type', { scrollBehavior: false }, () => {
  PracticePage.verifyProperyTypeDrodpwnIsVisible()
  PracticePage.clickOnPropertyTypeDropdown()
});

Then('I see "Villa" in the list', { scrollBehavior: false }, () => {
  PracticePage.verifySpecificOptionInPropertyTypeDropdown('Villa')
});

And('I select Villa option', { scrollBehavior: false }, () => {
  PracticePage.clickSpecificOptionWithInPropertyTypeDropdown('Villa')
});

Given('I click Price dropdown', { scrollBehavior: false }, () => {
  PracticePage.clickOnPriceDropdown()
});

Then('Min price and Max price field should be visible', { scrollBehavior: false }, () => {
  PracticePage.verifyMinPriceDropdown()
  PracticePage.verifyMaxPriceDropdown()
});

Given('I enter price "300000" in Max price field', { scrollBehavior: false }, () => {
  PracticePage.addMaxPropertyPrice('300000')
});

And('I click on the Search icon', { scrollBehavior: false }, () => {
  PracticePage.clickOnSearchIcon()
});

Then('I should see the total number of results on UI and compare it with the API result', { scrollBehavior: false }, () => {
  PracticePage.getSearchedResultCount()
})

Then('I verify the default state for the Commercial Property Checkbox', { scrollBehavior: false }, office => {
  PracticePage.verifyCommercialPropertiesCheckboxDefaultState()
})

Given('I click on the Commercial Property Checkbox', { scrollBehavior: false }, () => {
  PracticePage.clickOnCheckBox()
})

Then('I verify Commercial Property Checkbox is checked', { scrollBehavior: false }, () => {
  PracticePage.verifyCommercialPropertiesCheckboxCheckedState()
})

Then('I verify the Office link is visible', { scrollBehavior: false }, () => {
  PracticePage.verifyOfficesLinkisVisible()
})
When('I click on the Offices link', { scrollBehavior: false }, () => {
  PracticePage.clickOnOfficesLink()
})

Then('I verify the count of the Search results on UI and compare it with the API call', { scrollBehavior: false }, () => {
  PracticePage.getSearchedResultCount('office')
})

And('I verify the count of the Search results on UI with the API calls', { scrollBehavior: false }, () => {
  PracticePage.verifyFirstParameterOfAPICall(propertySearchAPIs.officeListSearchAPI)
})

Then('I verify the results by location', { scrollBehavior: false }, () => {
  PracticePage.typeInSearchField('The Bahrain Bay') 
  PracticePage.checkSearchWithNoSuggestion()
})

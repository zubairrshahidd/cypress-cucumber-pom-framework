import { e2e } from '../../../../cypress.json';
import { propertySearchAPIs } from '../../apiCalls';
import homePage_objects from "../../../pages/homePage/homePage_objects";

class PracticePage {

    static getTitle(pageTitle) {
        cy.title().should("include", pageTitle);
    }

    static clickOnPriceDropdown() {

        cy.get(homePage_objects.priceDropdown)
            // cy.get('.price-selector')
            .then((el) => {
                cy.wrap(el).find(homePage_objects.priceChevronIcon).first()
                    .click({ force: true });
            });
    }

    static verifyProperyTypeDrodpwnIsVisible() {
        cy.get(homePage_objects.propertyTypeDropdown).contains('Property type')
            .should('be.visible')
        cy.scrollTo('top');
    }

    static clickOnPropertyTypeDropdown() {
        cy.get(homePage_objects.propertyTypeDropdown).then((el) => {
            cy.scrollTo('top')
            cy.wrap(el).find(homePage_objects.propertyTypeField).then((el) => {
                cy.scrollTo('top');
                cy.wrap(el).find(homePage_objects.propertyTypeFieldText).first({ scrollBehavior: false }).click({ force: true })
            })
        })
    }

    static verifySpecificOptionInPropertyTypeDropdown(value) {
        cy.get(homePage_objects.propertyTypeDropdownModal) // Select the dropdown element
            .should('exist') // Ensure it exists
            .find(homePage_objects.propertyTypeDropdownAllElements) // Find all the elements within the dropdown
            .should('include.text', value);
    }

    static clickSpecificOptionWithInPropertyTypeDropdown(valueToSelect) {
        cy.get(homePage_objects.propertyTypeDropdownModal)
            .should('exist')
            .find(homePage_objects.propertyTypeDropdownAllElements)
            .each(($li) => {
                const text = $li.text();

                if (text.includes(valueToSelect)) {
                    cy.wrap($li).click();
                    return false; // Exit the .each() loop since we found the desired value
                }
            });
    }

    static verifyMinPriceDropdown() {
        cy.contains('Min. Price (BHD)').should('be.visible')
    }

    static verifyMaxPriceDropdown() {
        cy.contains('Max. Price (BHD)').should('be.visible')
    }

    static addMaxPropertyPrice(maxPrice) {
        cy.get(homePage_objects.priceModal).scrollIntoView().then((element) => {
            cy.wrap(element).find(homePage_objects.priceField)
                .then((el) => {
                    cy.wait(e2e.pageLoadWait)
                    cy.wrap(el).last({ scrollBehavior: false }).should('be.visible').click().type(maxPrice)
                    cy.scrollTo('top');
                })
        })
    }

    static getSearchedResultCount(searchKey) {
        cy.get(homePage_objects.autoSuggestedFilters)
            .find(homePage_objects.autoSuggestedFiltersTable)
            .then((list) => {
                cy.scrollTo('top');
                cy.wrap(list).find(homePage_objects.suggestedListItems)
                    .contains('Offices').should('not.exist')
            })

        cy.get(homePage_objects.propertyCard3DotMenu).first().should('be.visible')
        let searchCount
        cy.get(homePage_objects.searchedResult)
            .find('span')
            .invoke('text')
            .then((text) => {
                // Store the text value in a variable
                searchCount = Number(text.replace(/[^0-9]/g, ''));;
                cy.log(`The label text is: ${searchCount}`);
                if (searchKey == 'office') {
                    this.compareSearchResultwithOfficeAPIResults(propertySearchAPIs.officeListSearchAPI, searchCount)
                } else {
                    this.compareSearchResultswithPropertySearchAPIResults(propertySearchAPIs.propertySearchAPI, searchCount)
                }
            })
    }

    static getAPIResponseForCommercialProperty() {
        // This method is not used anywhere in steps, because This API Intercept call is not showing in Cypress terminal(details mentioned in word docuement)
        // For this reason, leaving this method in rough condition
        cy.intercept('GET', 'https://www.propertyfinder.bh/_next/data/28cLQ2qzHoVye0kbkifJi/en/search.json?c=3&t=4&fu=0&ob=mr').as('propertyFinderData');
        cy.wait('@propertyFinderData').then((interception) => {
            // Assert the status code of the intercepted response
            expect(interception.response.statusCode).to.equal(200);
            // Assert that the response body has the "total_count" property with a value of 23
            const responseBody = interception.response.body;
            expect(responseBody.pageProps.searchResult.meta.total_count).to.have.property('total_count', 23);
        });
    }

    static clickOnSearchIcon() {
        cy.get(homePage_objects.propertySearchIcon).last()
            .click()
    }

    static verifyCommercialPropertiesCheckboxDefaultState() {
        cy.get(homePage_objects.commercialPropertiesCheckField).should('not.be.checked');
    }

    static clickOnCheckBox() {
        cy.get(homePage_objects.commercialPropertiesCheckbox).click()
    }

    static verifyCommercialPropertiesCheckboxCheckedState() {
        cy.get(homePage_objects.commercialPropertiesCheckField).should('be.checked');
    }

    static verifyOfficesLinkisVisible() {

        cy.get(homePage_objects.autoSuggestedFilters)
            .find(homePage_objects.autoSuggestedFiltersTable)
            .then((list) => {
                cy.scrollTo('top');
                cy.wrap(list).find(homePage_objects.suggestedListItems)
                    .contains('Offices', { scrollBehavior: false }).should('be.visible')
                cy.scrollTo('top');
            });

    }
    static clickOnOfficesLink() {
        cy.get(homePage_objects.autoSuggestedFilters)
            .find(homePage_objects.autoSuggestedFiltersTable)
            .then((list) => {
                cy.scrollTo('top');
                cy.wrap(list).find(homePage_objects.suggestedListItems)
                    .contains('Offices', { scrollBehavior: false }).then((element) => {
                        cy.window().then((win) => {
                            win.addEventListener('scroll', (e) => {
                                e.preventDefault(); // Prevent default scroll behavior
                                e.stopPropagation(); // Stop event propagation
                            });
                        });
                        cy.scrollTo('top');
                        cy.wrap(element).click({ force: true })
                    })

            })
    }

    static verifyFirstParameterOfAPICall(apiCall) {
        cy.request(`${apiCall}`).then((interception) => {
            const response = interception; // Store the response in a variable
            expect(response.status).to.equal(200); // Assert the status code of the response
            expect(response.body.pageProps).to.have.property('searchResult'); // Check if the response has the expected structure
            if (response.body.pageProps.searchResult && response.body.pageProps.searchResult.properties) { // Access the array of properties within searchResult if it exists
                const firstProperty = response.body.pageProps.searchResult.properties[0]; // Get the first property in the array
                cy.log('Response body of the first result', firstProperty)
                cy.wait(e2e.pageLoadWait)
                cy.then(() => { // Print the values of the first property
                    cy.log('First Property:');
                    cy.log(`- description: ${firstProperty.description}`);
                    cy.log(`- Price: ${firstProperty.price.value}`);
                    cy.log(`- location: ${firstProperty.location.full_name}`);
                    cy.log(`- size: ${firstProperty.size.value + ' ' + firstProperty.size.unit}`);
                    cy.log(`- title: ${firstProperty.title}`);
                    cy.log(`- bathrooms: ${firstProperty.bathrooms}`);
                });
                cy.then(() => { // Make assertions on the first property
                    // Use Cypress assertions to check the data
                    expect(firstProperty?.description || '').to.be.a('string');
                    expect(firstProperty.price.value).to.be.a('number');
                    expect(firstProperty.location.full_name).to.be.a('string');
                    expect(firstProperty.size.value).to.be.a('number');
                    expect(firstProperty.title).to.be.a('string');
                    expect(parseInt(firstProperty.bathrooms)).to.be.a('number');
                });
            } else {
                cy.log('searchResult or properties is not defined in the response.');
            }
        });
    }

    static typeInSearchField(searchText) {
        cy.get(homePage_objects.propertySearchField).first()
            .should('be.visible').click()
            .type(searchText)
    }

    static checkSearchWithNoSuggestion() {
        cy.get(homePage_objects.searchFieldAutoSuggestionDropdown)
            .find(homePage_objects.searchFieldAutoSuggestionlist) // Check if there are <button> elements within sub divs
            .then((buttons) => {

                cy.wrap(buttons).then((checkMessage) => {
                    if (checkMessage.find(homePage_objects.searchFieldWithNoSuggestion).length > 0) {
                        cy.log('No search result found against "The Bahrain Bay"') // The class 'multi-selection-autocomplete__no-suggestions' exists
                    } else {
                        cy.wrap(buttons).find(homePage_objects.searchFieldWithSuggestion).each((button) => {
                            const buttonText = button.text(); // Get the text within the .multi-selection-autocomplete__suggestion-text
                            cy.log('Search option is ' + buttonText);
                            if (buttonText === 'Exact Match Text') { // Check if the buttonText exactly matches the text you are looking for
                                // Found an exact match, do something with it
                                cy.log('Exact match found: ' + buttonText);
                            }
                        })
                    }
                });
            });
    }

    static compareSearchResultwithOfficeAPIResults(apiCall, searchCount) {
        cy.request(`${apiCall}`).then((response) => {
            // Assert the status code of the response
            expect(response.status).to.equal(200);
            // Assert the response body contains the expected content
            expect(response.body.pageProps.searchResult.meta).to.have.property('total_count', searchCount);
        });
    }

    static compareSearchResultswithPropertySearchAPIResults(apiCall, searchCount) {
        cy.request(`${apiCall}`).then((response) => {
            // Assert the status code of the response
            expect(response.status).to.equal(200);

            // Assert the response body contains the expected content
            expect(response.body).to.include(`itemProp="numberOfItems" content="${searchCount}"`);
        });
    }
}

export default PracticePage;
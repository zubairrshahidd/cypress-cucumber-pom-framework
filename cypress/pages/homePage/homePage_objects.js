class HomePage {
    constructor() {
        // Homepage Objects
        this.priceDropdown = ".price-selector"
        this.priceChevronIcon = '.dd__icon-svg'
        this.propertyTypeDropdown = '.dd__head'
        this.propertyTypeField = '.dd__label'
        this.propertyTypeFieldText = '.dd__text'
        this.propertyTypeDropdownModal = '.dropdown-list'
        this.propertyTypeDropdownAllElements = 'ul.dropdown-list__items li'
        this.priceModal= '.dropdown-wrapper'
        this.priceField='.range-selector__wrapper'
        this.autoSuggestedFilters= '.styles_desktop_aggregation-links__bV5c5'
        this.autoSuggestedFiltersTable = '.styles_desktop_aggregation-links__list__Hx2dE'
        this.suggestedListItems = '.styles_desktop_aggregation-links__item__Akl3F'
        this.propertyCard3DotMenu = '[data-testid="property-card-other-action-menu"]'
        this.searchedResult= '.view_desktop_content__yaiYA .styles_container__KcjEg'
        this.propertySearchIcon= '.filter-form-search-button'
        this.commercialPropertiesCheckField = 'input[type="checkbox"]'
        this.commercialPropertiesCheckbox = '.checkbox-component .checkbox-component__box'
        this.propertySearchField='.multi-selection-autocomplete__root .multi-selection-autocomplete__input'
        this.searchFieldAutoSuggestionDropdown = '.multi-selection-autocomplete__dropdown'
        this.searchFieldAutoSuggestionlist= '.multi-selection-autocomplete__suggestions-container'
        this.searchFieldWithNoSuggestion = '.multi-selection-autocomplete__no-suggestions'
        this.searchFieldWithSuggestion = '.multi-selection-autocomplete__suggestion'    }
}
module.exports = new HomePage();
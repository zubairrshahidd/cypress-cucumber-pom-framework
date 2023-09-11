Feature: The PropertyFinder Search page

  Scenario: Check the total displayed number of results for category Villas with price range more than or equal to 300,000 AED / yearly
    Given I open PropertyFinder page
    Then I see title of the page as "Proper Finder BH" 
  

 Scenario: As a user, i should be able to see the Villa in the Property type.
    When I open PropertyFinder page
    And I select Villa under property type
    Then I see "Villa" in the list
    And I select Villa option
  

Scenario: As a user, i should be able to search for property with 300000 value
    When I click Price dropdown
    Then Min price and Max price field should be visible  
  
    When I enter price "300000" in Max price field
    And I click on the Search icon
    Then I should see the total number of results on UI and compare it with the API result

 
  Scenario: Click on commercial properties only checkbox and select "offices"
    Given I open PropertyFinder page
    Then I verify the default state for the Commercial Property Checkbox

    Given I click on the Commercial Property Checkbox
    Then I verify Commercial Property Checkbox is checked

    Given I click on the Search icon
    Then I verify the Office link is visible

    When I click on the Offices link
    Then I verify the count of the Search results on UI and compare it with the API call
    And I verify the count of the Search results on UI with the API calls


  Scenario: Search for property by location
    Given I open PropertyFinder page
    Then I verify the results by location


Feature: Search roles

  Scenario: Valid ubid should give results
    Given an ubid "20178888888891"
    When I open the url "/"
    When I enter the ubid into the search field
    When I click the search button
    #When I perform a search for ubid "20178888888891"
    Then the results should contain a role with the name "MOEN OG HALDEN REVISJON AS"

  Scenario: Invalid ubid should give no results
    Given an ubid "99999999999999"
    When I open the url "/"
    When I enter the ubid into the search field
    When I click the search button
    #When I perform a search for ubid "99999999999999"
    Then the page should display no results

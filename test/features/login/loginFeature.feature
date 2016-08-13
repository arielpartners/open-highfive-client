Feature: Login
  As a user of HighFive
  I should be able to log in

  Scenario: The logged in user should see the form to create a new ticket by default
    Given I have opened HighFive
    When I login
    Then the editor title should be "Create New Ticket"

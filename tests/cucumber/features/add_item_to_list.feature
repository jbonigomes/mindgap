Feature: Add new item to the list

As a user I click the button "New"
and I expect to be redirected to the config
page.

@focus
  Scenario: I am a new user
  When I navigate to "/"
  Then I should see the title "Mind'Gap"
  Then I click the button "new-button"
  And I should see a new section with the title "Mind'Gap"

@focus
  Scenario: I am attempting to add item to the list
  When I add the item "Appointment"
  And I click ".fa-hourglass-half" 
  And I set the slider to every "3 hours"
  And I click the button "save-button"

  




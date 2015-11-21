// You can include npm dependencies for support files in tests/cucumber/package.json
var _ = require('underscore');


module.exports = function () {

  // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
  var url = require('url');

  this.Given(/^I am a new user$/, function () {
    server.call('reset'); // server is a connection to the mirror
  });

  this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
    // process.env.ROOT_URL always points to the mirror
    browser.url(url.resolve(process.env.ROOT_URL, relativePath));
  });

  this.Then(/^I should see the title "([^"]*)"$/, function () {
    // no callbacks, no promises, just simple synchronous code!
    browser.waitForExist('title');
    expect(browser.getTitle()).toEqual('Mind\'Gap'); // using Jasmine's assertion library
  });

  this.When(/^I click the button "([^"]*)"$/, function (arg1) {
    browser.waitForExist('body *');
    browser.waitForVisible('body *');
    browser.waitForExist('.new-button');
    browser.click('.new-button');
  });

  this.Then(/^I should see a new section with the title "([^"]*)"$/, function (arg1) {
    browser.waitForExist('title');
    expect(browser.getTitle()).toEqual('Mind\'Gap'); // using Jasmine's assertion library
  });

  this.When(/^I add the item "([^"]*)"$/, function (arg1) {
    browser.waitForExist('body *');
    browser.waitForVisible('body *');
    browser.waitForExist('.input-item');
    browser.setValue('.input-item', 'Appointment');
  });

  this.When(/^I click "([^"]*)"$/, function (arg1) {
    browser.waitForExist('.fa-hourglass-half');
    browser.click('.fa-hourglass-half');
    
  });

  this.When(/^I set the slider to every "([^"]*)"$/, function (arg1) {
  // Write the automation code here
  pending();
  });

};

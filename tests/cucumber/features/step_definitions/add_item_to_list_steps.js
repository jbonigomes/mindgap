
  var _ = require('underscore');

  module.exports = function () {

    var url = require('url');

    this.Given(/^I am a new user$/, function () {
      server.call('reset'); // server is a connection to the mirror
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath) {
      browser.url(url.resolve(process.env.ROOT_URL, relativePath));
    });

    this.Then(/^I should see the title "([^"]*)"$/, function () {
      browser.waitForExist('title');
      expect(browser.getTitle()).toEqual('Mind\'Gap');
    });

    this.When(/^I click the button "([^"]*)"$/, function (arg1) {
      browser.waitForExist('body *');
      browser.waitForVisible('body *');
      browser.waitForExist('.new-button');
      browser.click('.new-button');
    });

    this.Then(/^I should see a new section with the title "([^"]*)"$/, function (arg1) {
      browser.waitForExist('title');
      expect(browser.getTitle()).toEqual('Mind\'Gap');
    });

    this.When(/^I add the item "([^"]*)"$/, function (arg1) {
      browser.waitForExist('.input-item');
      browser.setValue('.input-item', 'Appointment');
    });

    this.When(/^I click "([^"]*)"$/, function (arg1) {
      pending();
    });

    this.When(/^I set the slider to every "([^"]*)"$/, function (arg1) {
      pending();
    });

  };

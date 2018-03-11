/*eslint no-undef: "error"*/
/*eslint-env browser*/

import {defineSupportCode} from 'cucumber';
import {expect, toBe} from 'jest';

defineSupportCode(function({Given, Then, When}) {

  let ubid = null;

  Given(/^an ubid "([^"]*)"$/, (id) => {
    ubid = id;
  });

  When(/^I open the url "([^"]*)"$/, (url) => {
    browser.url(url).pause(20000);
    console.log(browser.getSource());
  });

  When(/^I enter the ubid into the search field$/, () => {
    browser.clearElement('.searchInput');
    browser.setValue('.searchInput', ubid);
  });

  When(/^I click the search button$/, () => {
    browser.click('.searchButton');
  });

  // When(/^When I perform a search for ubid "([^"]*)"$/, (ubid) => {
  //   browser.url('/');
  //   browser.clearElement('.searchInput');
  //   browser.setValue('.searchInput', ubid);
  //   browser.click('.searchButton');
  // });

  Then(/^the results should contain a role with the name "([^"]*)"$/, (name) => {
    expect(browser.getText(name)).toBe(true);
  });

  Then(/^the page should display no results$/, () => {
    expect(browser.isVisible('#resultsTable')).toBe(false);
  });
});

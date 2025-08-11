/// <reference types="Cypress" />

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

const validUsername = 'standard_user';
const validPass = 'secret_sauce';

describe("Footer", () => {

  it("TC0007", () => {
       
    LoginPage.login(validUsername, validPass);
    InventoryPage.checkSocialLink('twitter', 'https://twitter.com/saucelabs');
    InventoryPage.checkSocialLink('facebook', 'https://www.facebook.com/saucelabs');
    InventoryPage.checkSocialLink('linkedin', 'https://www.linkedin.com/company/sauce-labs/');
    
  });

});
/// <reference types="Cypress" />

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

const validUsername = 'standard_user';
const validPass = 'secret_sauce';

describe("Products", () => {

  it("TC0006", () => {
       
    LoginPage.login(validUsername, validPass);
    InventoryPage.verifySort('az');
    InventoryPage.verifySort('za');
    InventoryPage.verifySort('lohi');
    InventoryPage.verifySort('hilo');
   
  });

});
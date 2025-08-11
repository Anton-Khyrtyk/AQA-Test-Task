/// <reference types="Cypress" />

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';

const validUsername = 'standard_user';
const validPass = 'secret_sauce';

describe("Cart", () => {

  it("TC0005", () => {
       
    LoginPage.login(validUsername, validPass);
    InventoryPage.addBackpackToCart();
    InventoryPage.elements.cartBadge().should('have.text', '1');
    InventoryPage.openCart();
    CartPage.elements.productName().should('have.text', 'Sauce Labs Backpack');

    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    LoginPage.login(validUsername, validPass);
    InventoryPage.openCart();
    CartPage.elements.productName().should('have.text', 'Sauce Labs Backpack');
  });

});
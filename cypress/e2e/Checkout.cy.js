/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

const validUsername = 'standard_user';
const validPass = 'secret_sauce';

describe("Footer", () => {

  it("TC0008", () => {
       
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();

    LoginPage.login(validUsername, validPass);

    cy.get('.inventory_item_price').eq(0).invoke('text').then(text1 => {
      const price1 = parseFloat(text1.replace(/[^0-9.]/g, ''));
      cy.wrap(price1).as('price1');
    });

    InventoryPage.addBackpackToCart();
    InventoryPage.elements.cartBadge().should('have.text', '1');
    InventoryPage.openCart();
    CartPage.elements.productName().should('have.text', 'Sauce Labs Backpack');
    CartPage.startCheckout();

    CheckoutPage.fillUserInfo(firstName, lastName, postalCode);
    CheckoutPage.continueCheckout();

    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Backpack');
    CheckoutPage.elements.subtotalLabel().invoke('text').then(text2 => {
      const price2 = parseFloat(text2.replace(/[^0-9.]/g, ''));
      cy.wrap(price2).as('price2');
    });

    cy.then(function () {
      if (this.price1 === this.price2) {
        cy.log(`Prices match: ${this.price1}`);
      } else {
        throw new Error(`Prices do not match: ${this.price1} != ${this.price2}`);
      }
    });

    CheckoutPage.finishCheckout();
    CheckoutPage.elements.completeHeader().should('contain', 'Thank you for your order!');

  });

  it("TC0009", () => {
       
    LoginPage.login(validUsername, validPass);
    InventoryPage.openCart();
    CartPage.elements.inventoryItem().should('not.exist');
    CartPage.startCheckout();
    cy.url().should('include', '/cart.html');
    CartPage.elements.emptyCartMessage().should('be.visible');
    
  });

});
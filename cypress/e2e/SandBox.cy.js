/// <reference types="Cypress" />

const validUsername = 'standard_user';
const validPass = 'secret_sauce';
const invalidUsername = 'standarD_user';
const invalidPass = 'invalid';


describe("Test", () => {

  afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  indexedDB.deleteDatabase('localforage'); // если используется IndexedDB (например, в localforage)
});

  it("TC0001", () => {
       
    cy.login(validUsername, validPass);
    cy.loginVerif();

  });

  it("TC0002", () => {
        
      cy.login(validUsername, invalidPass);
      cy.IncorrectLoginVerif();

    });

  it("TC0003", () => {
       
    cy.login(invalidUsername, validPass);
    cy.IncorrectLoginVerif();
    
  });

  it("TC0004", () => {

    cy.login(validUsername, validPass);
    cy.loginVerif();
    cy.logout();
  });

  it("TC0005", () => {
       
    cy.login(validUsername, validPass);
    cy.loginVerif();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text', 'Sauce Labs Backpack');

    cy.logout();
    cy.login(validUsername, validPass);
    cy.loginVerif();

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text', 'Sauce Labs Backpack');
  });

  it("TC0006", () => {
       
    cy.login(validUsername, validPass);
    cy.loginVerif();

    cy.verifySort('az');
    cy.verifySort('za');
    cy.verifySort('lohi');
    cy.verifySort('hilo');
   
  });

  it("TC0007", () => {
       
    cy.login(validUsername, validPass);
    cy.loginVerif();

    cy.checkSocialLink('twitter', 'https://twitter.com/saucelabs')
    cy.checkSocialLink('facebook', 'https://www.facebook.com/saucelabs')
    cy.checkSocialLink('linkedin', 'https://www.linkedin.com/company/sauce-labs/')
    
    });

});


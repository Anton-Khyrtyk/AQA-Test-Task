/// <reference types="Cypress" />

const validUsername = 'standard_user';
const validPass = 'secret_sauce';
const invalidUsername = 'standarD_user';
const invalidPass = 'invalid';


describe("Test", () => {

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

  it("TC0008", () => {
       
    cy.login(validUsername, validPass);
    cy.loginVerif();
    
    cy.get('.inventory_item_price').eq(0).invoke('text').then((text1) => {
      const price1 = parseFloat(text1.replace(/[^0-9.]/g, ''));
      cy.wrap(price1).as('price1');
    });

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="checkout"]').click()
    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').type('John').should('have.value', 'John');
    cy.get('[data-test="lastName"]').type('Dou').should('have.value', 'Dou');
    cy.get('[data-test="postalCode"]').type('12345').should('have.value', '12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="title"]').should('be.visible').and('have.text', 'Checkout: Overview');
    cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text', 'Sauce Labs Backpack');
    
    cy.get('[data-test="subtotal-label"]').invoke('text').then((text2) => {
      const price2 = parseFloat(text2.replace(/[^0-9.]/g, ''));
      cy.wrap(price2).as('price2');
    });
    
    cy.then(function () {
        if (this.price1 == this.price2) {
            cy.log(`Prices are equal: ${this.price1} == ${this.price2}`);
        } else {
            throw new Error(`Prices are not equal: ${this.price1} != ${this.price2}`);
        }
    });

    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="complete-header"]').should('be.visible').and('have.text', 'Thank you for your order!');
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');

  });

  it("TC0009", () => {
       
    cy.login(validUsername, validPass);
    cy.loginVerif();
      
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item"]').should('not.exist');
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/cart.html");
    cy.contains(/cart is empty/i).should('be.visible');
    
  });

});
/// <reference types="Cypress" />

import LoginPage from '../pages/LoginPage';

const validUsername = 'standard_user';
const validPass = 'secret_sauce';
const invalidUsername = 'standarD_user';
const invalidPass = 'invalid';


describe("Login", () => {

  it("TC0001", () => {
       
    LoginPage.login(validUsername, validPass);
    cy.url().should('include', '/inventory.html');

  });

  it("TC0002", () => {
        
      LoginPage.login(validUsername, invalidPass);
      LoginPage.elements.errorMessage().should('be.visible');

    });

  it("TC0003", () => {
       
    LoginPage.login(invalidUsername, validPass);
    LoginPage.elements.errorMessage().should('be.visible');
    
  });

  it("TC0004", () => {

    LoginPage.login(validUsername, validPass);
    cy.url().should('include', '/inventory.html');
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('include', '/');
  });
  
});
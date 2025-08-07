// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').type(username).should('have.value', username);
  cy.get('[data-test="password"]').type(password).should('have.attr', 'type', 'password');
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('loginVerif', () => {
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('[data-test="shopping-cart-link"]').should('be.visible');
});

Cypress.Commands.add('IncorrectLoginVerif', () => {
    cy.get('[class="form_group"]').find('[data-icon="times-circle"]')
    cy.get('[class="form_group"]').eq(1).find('[data-icon="times-circle"]')
    cy.get('[class="form_group"]').find('[class="input_error form_input error"]')
    cy.get('[class="form_group"]').eq(1).find('[class="input_error form_input error"]')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
});


Cypress.Commands.add('logout', () => {
    cy.get('[id=react-burger-menu-btn]').click();
    cy.get('.bm-item.menu-item').should('have.length', 4);
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('[data-test="username"]').should('have.value', '');
    cy.get('[data-test="password"]').should('have.value', '');
});


Cypress.Commands.add('verifySort', (sortType) => {
  cy.get('[data-test="product-sort-container"]').select(sortType);

  if (sortType === 'az' || sortType === 'za') {
    cy.get('.inventory_item_name').then(($items) => {
      const names = [...$items].map(el => el.innerText);
      const sorted = [...names].sort();

      if (sortType === 'za') sorted.reverse();

      expect(names).to.deep.equal(sorted);
    });
  } else if (sortType === 'lohi' || sortType === 'hilo') {
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sorted = [...prices].sort((a, b) => a - b);

      if (sortType === 'hilo') sorted.reverse();

      expect(prices).to.deep.equal(sorted);
    });
  }
});


Cypress.Commands.add('checkSocialLink', (social, link) => {

    const selector = `[data-test="social-${social}"]`;

    cy.get(selector).should('have.attr', 'href', link);
    cy.get(selector).should('have.attr', 'target', '_blank');
    cy.get(selector).click();
});



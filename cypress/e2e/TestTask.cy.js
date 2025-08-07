/// <reference types="Cypress" />

describe("Test", () => {
  it("TC0001", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user").should('have.value', 'standard_user');
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="password"]').should('have.attr', 'type', 'password');
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('[data-test="shopping-cart-link"]').should('be.visible');

  });

  it("TC0002", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user").should('have.value', 'standard_user');
    cy.get('[data-test="password"]').type("invalid");
    cy.get('[data-test="password"]').should('have.attr', 'type', 'password');
    cy.get('[data-test="login-button"]').click();
    cy.get('[class="form_group"]').find('[data-icon="times-circle"]')
    cy.get('[class="form_group"]').eq(1).find('[data-icon="times-circle"]')
    cy.get('[class="form_group"]').find('[class="input_error form_input error"]')
    cy.get('[class="form_group"]').eq(1).find('[class="input_error form_input error"]')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });

  it("TC0003", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standarD_user").should('have.value', 'standarD_user');
    cy.get('[data-test="password"]').type("invalid");
    cy.get('[data-test="password"]').should('have.attr', 'type', 'password');
    cy.get('[data-test="login-button"]').click();
    cy.get('[class="form_group"]').find('[data-icon="times-circle"]')
    cy.get('[class="form_group"]').eq(1).find('[data-icon="times-circle"]')
    cy.get('[class="form_group"]').find('[class="input_error form_input error"]')
    cy.get('[class="form_group"]').eq(1).find('[class="input_error form_input error"]')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });

  it("TC0004", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    cy.get('[id=react-burger-menu-btn]').click();
    cy.get('.bm-item.menu-item').should('have.length', 4);
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('[data-test="username"]').should('have.value', '');
    cy.get('[data-test="password"]').should('have.value', '');
  });

  it("TC0005", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");


    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text', 'Sauce Labs Backpack');

    cy.get('[id=react-burger-menu-btn]').click();
    cy.get('.bm-item.menu-item').should('have.length', 4);
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('[data-test="username"]').should('have.value', '');
    cy.get('[data-test="password"]').should('have.value', '');


    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    
    cy.get('[data-test="shopping-cart-link"]').should('be.visible');

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item-name"]').should('be.visible').and('have.text', 'Sauce Labs Backpack');
  });

  it("TC0006", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    // Name (A to Z)
    cy.get('[data-test="product-sort-container"]').select('az');
    cy.get('.inventory_item_name').then(($items) => {
      const names = [...$items].map(el => el.innerText);
      const sorted = [...names].sort();
      expect(names).to.deep.equal(sorted);
    });

    //Name (Z to A)
    cy.get('[data-test="product-sort-container"]').select('za');
    cy.get('.inventory_item_name').then(($items) => {
      const names = [...$items].map(el => el.innerText);
      const sorted = [...names].sort().reverse();
      expect(names).to.deep.equal(sorted);
    });

    //Price (low to high)
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });

    // Price (high to low)
    cy.get('[data-test="product-sort-container"]').select('hilo');
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });

  });
  
  it("TC0007", () => {
       
    cy.visit("https://www.saucedemo.com");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    cy.get('[data-test="social-twitter"]').should('have.attr', 'href', 'https://twitter.com/saucelabs');
    cy.get('[data-test="social-twitter"]').should('have.attr', 'target', '_blank');
    cy.get('[data-test="social-twitter"]').click();

    cy.get('[data-test="social-facebook"]').should('have.attr', 'href', 'https://www.facebook.com/saucelabs');
    cy.get('[data-test="social-facebook"]').should('have.attr', 'target', '_blank');
    cy.get('[data-test="social-facebook"]').click();

    cy.get('[data-test="social-linkedin"]').should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
    cy.get('[data-test="social-linkedin"]').should('have.attr', 'target', '_blank');
    cy.get('[data-test="social-linkedin"]').click();
    
    });


});


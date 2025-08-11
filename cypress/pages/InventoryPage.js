class InventoryPage {
    elements = {
        addBackpackBtn: () => cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),
        cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
        cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
        productName: () => cy.get('[data-test="inventory-item-name"]'),
        sortDropdown: () => cy.get('[data-test="product-sort-container"]'),
        socialLink: (name) => cy.get(`a[href*="${name}"]`)
    }

    addBackpackToCart() {
        this.elements.addBackpackBtn().click();
    }

    openCart() {
        this.elements.cartLink().click();
    }

    verifySort(order) {
        cy.url().should('include', '/inventory.html');
        this.elements.sortDropdown().select(order);
    }

    checkSocialLink(network, url) {
        this.elements.socialLink(network).should('have.attr', 'href', url).click();
    }
}
export default new InventoryPage();
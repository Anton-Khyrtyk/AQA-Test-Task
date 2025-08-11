class CartPage {
    elements = {
        inventoryItem: () => cy.get('[data-test="inventory-item"]'),
        productName: () => cy.get('[data-test="inventory-item-name"]'),
        checkoutBtn: () => cy.get('[data-test="checkout"]'),
        emptyCartMessage: () => cy.contains(/cart is empty/i)
    }

    startCheckout() {
        this.elements.checkoutBtn().click();
    }
}
export default new CartPage();
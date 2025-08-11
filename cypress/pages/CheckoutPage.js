class CheckoutPage {
    elements = {
        firstName: () => cy.get('[data-test="firstName"]'),
        lastName: () => cy.get('[data-test="lastName"]'),
        postalCode: () => cy.get('[data-test="postalCode"]'),
        continueBtn: () => cy.get('[data-test="continue"]'),
        finishBtn: () => cy.get('[data-test="finish"]'),
        completeHeader: () => cy.get('[data-test="complete-header"]'),
        subtotalLabel: () => cy.get('[data-test="subtotal-label"]')
    }

    fillUserInfo(firstName, lastName, postalCode) {
        this.elements.firstName().type(firstName);
        this.elements.lastName().type(lastName);
        this.elements.postalCode().type(postalCode);
    }

    continueCheckout() {
        this.elements.continueBtn().click();
    }

    finishCheckout() {
        this.elements.finishBtn().click();
    }
}
export default new CheckoutPage();
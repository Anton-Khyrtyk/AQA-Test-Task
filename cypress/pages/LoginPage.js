class LoginPage {
    elements = {
        username: () => cy.get('#user-name'),
        password: () => cy.get('#password'),
        loginBtn: () => cy.get('#login-button'),
        errorMessage: () => cy.get('[data-test="error"]')
    }

    login(username, password) {
        cy.visit('https://www.saucedemo.com/');
        this.elements.username().clear().type(username);
        this.elements.password().clear().type(password);
        this.elements.loginBtn().click();
    }
}
export default new LoginPage();
/* eslint-disable no-undef */
describe("A user that visits the application", () => {
  before(() => {
    cy.intercept("GET", "http://localhost:3000/api/products", { fixture: "products.json", statusCode: 200 }).as(
      "Products.index"
    );
    cy.visit("/");
  });

  it('is expected to make a network call with status 200', () => { 
    cy.wait("@Products.index").its('response.statusCode').should('eq', 200);
  })

  it("is expected to see a collection of 3 products", () => {
    cy.get("[data-cy=product-list]").children().should("have.length", 3);
  });
});

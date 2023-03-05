describe("Demo Link Test", () => {
  it("should navigate to the Demo URL when clicked", () => {
    // visit the webpage containing the hyperlink
    cy.visit(Cypress.config().baseUrl);

    // get the hyperlink element and assert that it exists
    cy.get(`a[href="${Cypress.env("demoLink")}"]`).should("exist");
  });
});

describe("API Request Test", () => {
  const keyword = "next";
  it("should make an API request when the input value changes", () => {
    // intercept the API request and test a response
    cy.intercept({
      method: "GET",
      url: `${Cypress.env("apiUrl")}?q=${keyword}&page=1&per_page=20`, // Because use query params will does not work.
    }).as("getData");

    // visit the webpage input search page
    cy.visit(Cypress.config().baseUrl);

    // type a value into the input and wait for the API request to complete
    cy.get("[data-cypress=searchInput]").focus().clear().type(keyword);

    cy.wait("@getData");

    // assert that the API request was made with the correct query parameter
    cy.get("@getData").should((interception) => {
      console.log(interception.request.url, "=interception.request.url");
      expect(interception.request.url).to.include("?q=next");
    });

    // assert that the API response is displayed on the page
    cy.get("[data-cypress=searchResult]").should("contain", keyword);
  });
});

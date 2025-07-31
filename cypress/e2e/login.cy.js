



describe("Login with Cookie", () => {
  beforeEach(() => {
    // Set auth token cookie before visiting the site
    cy.setCookie(
      'authToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInNjaGVtYW5hbWUiOiJvcmdfMTMiLCJvcmdhbml6YXRpb25faWQiOjEzLCJpYXQiOjE3NDU5MDgzMDcsImV4cCI6MTc0NTk5NDcwN30.JpUnSDYK00G33FKaM55FGYzdysqGPNUZtiMk5_COspQ'
    );

    // Visit the page after setting cookie
    cy.visit("https://org.ceyinfo.com/");
  });

  it("should load dashboard if cookie is valid", () => {
    // Optional wait for page load/render
    cy.wait(1000);


    // Check welcome heading
    cy.get("h1.text-4xl.font-bold.text-primary")
      .should('be.visible')
      .and('contain', 'Welcome to');
  });



  






});












describe("entry", () => {

beforeEach(() => {
  cy.visit("https://d.ceyinfo.com/login");

  cy.get('input[placeholder="Enter your email"]').type("slakmaligunasingha@gmail.com");
  cy.get('input[name="password"]').type("123456");
  cy.get('button[type="submit"]').click();

  cy.log("Login complete");
  cy.get('.flex-col > :nth-child(2) > .bg-red-500').click({ force: true });


  // Wait for the redirect to https://org.ceyinfo.com/
  cy.origin('https://dorg.ceyinfo.com', () => {
    // Wait for dashboard heading
    cy.contains('h1', 'Welcome to').should('be.visible');
  });
});



  it("logs in and opens dela property dashboard", () => {
    // Switch to org.ceyinfo.com context
    // cy.origin('https://dorg.ceyinfo.com', () => {
    //   // Stub window.open to force same-tab navigation
    //   cy.window().then((win) => {
    //     cy.stub(win, 'open').callsFake((url) => {
    //       win.location.href = url;
    //     });
    // });

      // Click "Open" for Rose Wint

      
      cy.origin('https://dorg.ceyinfo.com', () => {
    
        cy.contains('td', 'DELA')
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Open').click({ force: true });

          //cy.contains('Welcome to Property: DELA').should('be.visible');
        });


    });

      
    //});

    // After clicking Open, the app navigates to property-entry.ceyinfo.com
    // cy.origin('https://dproperty-entry.ceyinfo.com', () => {
    //   // Validate property dashboard
    //   cy.contains('DELA').should('be.visible');
    
    // });
    

  });



  it.skip('should make a booking from date selection to guest form submission', () => {
    cy.visit('https://dfdesk.ceyinfo.com/'); // Replace with actual URL if hosted

    // Select Check-in Date (simulate date picker open and selection if needed)
    cy.contains('Check in').parent().find('button').click();
    // Add interaction with calendar here if it's a JS date picker

    // Select Check-out Date
    cy.contains('Check out').parent().find('button').click();
    // Add interaction with calendar here too

    // Click Search
    cy.contains('Search').click();

    // Wait for available rooms to be listed
    cy.contains('Suite Standard', { timeout: 10000 }).should('exist');

    // Select a room basis (Room Only, B&B, etc.)
    cy.contains('Room Only').parent().find('input[type="radio"]').check({ force: true });

    // Click Book Now
    cy.contains('BOOK NOW').click();

    // Fill in Guest Information form
    cy.contains('Guest Infomation').should('exist');
    cy.get('input[name="first_name"]').type('John');
    cy.get('input[name="last_name"]').type('Doe');
    cy.get('input[name="address"]').type('123 Beach Road');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="mobile"]').type('0712345678');

    // Optionally fill more fields if required
    cy.get('textarea[name="notes"]').type('Please provide a sea view if possible');

    // Submit form
    cy.contains('Save Information').click();

    // Check for confirmation or success message
    cy.contains('Booking Confirmed').should('exist'); // Adjust text to match actual confirmation
  });


  






});


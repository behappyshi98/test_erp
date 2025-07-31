describe("Front Desk Booking Workflow", () => {
  beforeEach(() => {
    cy.visit("https://d.ceyinfo.com/login");
    cy.get('input[placeholder="Enter your email"]').type("slakmaligunasingha@gmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.log("Login complete");
    
    // Handle organization selection
    cy.get('.flex-col > :nth-child(2) > .bg-red-500').click({ force: true });
    
    // Verify successful login to organization dashboard
    cy.origin('https://dorg.ceyinfo.com', { args: {} }, () => {
      cy.contains('h1', 'Welcome to').should('be.visible');
    });
  });



  it("should complete front desk booking workflow", () => {
    // Open DELA property
    cy.origin('https://dorg.ceyinfo.com', { args: {} }, () => {
      cy.contains('td', 'DELA')
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Open').click({ force: true });
        });
    });

    // Handle Front Desk module click
    cy.origin('https://dproperty-entry.ceyinfo.com', { args: {} }, () => {
      // Wait for property dashboard to load
      cy.contains('Welcome to Property: DELA', { timeout: 15000 }).should('be.visible');
      
      // Click Front Desk module using the specific structure from your HTML
      cy.get('div.rounded-xl.border.shadow').contains('Front Desk').parents('div.rounded-xl').click();
      
      // Alternative more specific selector:
      // cy.get('div.rounded-xl.border.shadow').within(() => {
      //   cy.contains('div.font-semibold', 'Front Desk').parents('div.rounded-xl').click();
      // });
    });

    cy.log('pass');

    // Intercept the correct booking API endpoint to ensure only one call is made
    cy.intercept('POST', 'https://dapi.ceyinfo.com/api/v1/bookings/add-quick').as('saveBooking');
    // Handle navigation to front desk and create new booking
    cy.origin('https://dfdesk.ceyinfo.com', { args: {} }, () => {
      // Verify we're on the front desk page
      cy.url().should('include', 'dfdesk.ceyinfo.com');



      cy.get('a[href="/bookings"].flex.items-center.gap-3')
      .should('contain', 'Booking')
      .and('be.visible')
      .click();
      cy.wait(2000);
      
      // Click the "Add New Booking" button
      cy.get('a[href="/bookings/add"] button').contains('+ Add New Booking').click();
      cy.wait(2000);
      // Wait for booking form to load
      cy.contains('Quick Booking', { timeout: 10000 }).should('be.visible');

        //picker
    cy.contains('label', 'Check-in Date').next('button').as('checkInBtn');
    cy.get('@checkInBtn').click();
    cy.get('[role="dialog"]').should('be.visible');
    
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button[name="day"]', '20').click();
    });

    // Close check-in calendar (using most reliable method for your app)
    cy.get('body').click(10, 10); // Click outside the calendar
    // Alternative methods if above doesn't work:
    // cy.get('@checkInBtn').click();
    // cy.get('body').type('{esc}');
    
    cy.get('[role="dialog"]').should('not.exist');

    // Select check-out date (July 21, 2025)
    cy.contains('label', 'Check-out Date').next('button').as('checkOutBtn');
    cy.get('@checkOutBtn').click();
    cy.get('[role="dialog"]').should('be.visible');
    
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button[name="day"]', '21').click();
    });

    // Close check-out calendar (using same method as above)
    cy.get('body').click(10, 10);
    
    
    cy.get('[role="dialog"]').should('not.exist');

    
// Verify standard rates are selected
// cy.get('button[role="radio"][aria-checked="true"]').should('have.id', 'standardDates');

// Set check-in/out times
// cy.contains('View Check-In/Out Time').click();
// cy.get('input[name="checkInTime"]').clear().type('14:00');
// cy.get('input[name="checkOutTime"]').clear().type('11:00');


cy.wait(2000);


// Select room details with more reliable selectors
cy.get('button[id=":r1r:-form-item"]').click(); // Open room class dropdown
cy.get('div[role="option"]').contains('Family Executive').click();

cy.get('button[id=":r1t:-form-item"]').click(); // Open room view dropdown
cy.get('div[role="option"]').contains('City View').click();

cy.get('button[id=":r1v:-form-item"]').click(); // Open room number dropdown
cy.get('div[role="option"]').contains('Room 154').click();

cy.get('button[id=":r21:-form-item"]').click(); // Open meal plan dropdown
cy.get('div[role="option"]').contains('Half Board').click();

// Verify and update pricing
cy.get('input[name="rooms.0.price"]')
  // .should('have.value', '34500.00')
  // .clear()
  .type('34000');
  
cy.get('input[name="rooms.0.totalamount"]')
  // .should('have.value', '34500.00')
  // .clear()
  .type('31200');

// Set guest counts with validation
cy.get('input[name="rooms.0.adultCount"]')
  .should('have.value', '1')
  // .clear()
  // .type('2')
  // .should('have.value', '2');

cy.get('input[name="rooms.0.childCount"]')
  .should('have.value', '0')
  // .clear()
  // .type('1')
  // .should('have.value', '1');




    cy.wait(2000);

     cy.contains('button[role="combobox"]', 'Select a channel')
      .should('be.visible')
      .click();

    // 2. Select a specific channel option
    cy.get('[role="option"]')  // Directly target dropdown options
      .contains('expedia')     // Text of the option to select
      .should('be.visible')
      .click();

    // 3. Verify the selection
    cy.contains('button[role="combobox"]', 'expedia')
      .should('be.visible');



      // Add guest information
      cy.contains('Add Guest Info').click();
      cy.wait(2000);
      cy.get('input[name="first_name"]').type('dammika');
      cy.get('input[name="last_name"]').type('Doe');
      cy.get('input[name="email"]').type('dammika@example.com');
      cy.get('input[name="mobile"]').type('0784566334');
      cy.get('input[name="address"]').type('123 Main Street');
      
      // Select country
      // cy.get('button[id=":r3s:-form-item"]').click();
      // cy.contains('Sri Lanka').click();
      
      // Add identification details
      // cy.get('input[name="nic"]').type('123456789V');
      // cy.get('input[name="passport"]').type('AB1234567');

      // Save guest and complete booking
      cy.contains('Save Guest').click();
      cy.contains('Save Booking').click();
      cy.wait('@saveBooking');
      // Optionally verify booking was created successfully
      // cy.contains('Booking created successfully', { timeout: 10000 }).should('be.visible');
    });
  });
});
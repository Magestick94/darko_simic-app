describe('CarsPage E2E Tests', () => {
  beforeEach(() => {
    // Visit the CarsPage
    cy.visit('http://localhost:3000/cars');
  });

  it('Should display the list of cars and apply filters correctly', () => {
    // Check that cars are displayed
    cy.get('.testClass').should('have.length.greaterThan', 0);

    // Apply a make filter
    cy.get('#filterMake').click();
    cy.get('li[data-value="Audi"]').click(); // Example make

    // Apply a body type filter
    cy.get('#filterBody').click();
    cy.get('li[data-value="SUV"]').click(); // Example body type

    // Apply a fuel type filter
    cy.get('#filterFuel').click();
    cy.get('li[data-value="Dizel"]').click(); // Example fuel type

    // Apply a gear type filter
    cy.get('#filterGear').click();
    cy.get('li[data-value="Manual"]').click(); // Example gear type

    // Adjust the slider for price range (optional if you want to apply a price filter)
    cy.get('.MuiSlider-root').click('center'); // Adjust the slider

    // Assert that the filtered cars match the criteria
    cy.get('.testClass').each(($carCard) => {
      cy.wrap($carCard).find('div.MuiTypography-root').first().should('contain', 'Audi'); // Assuming make + model is the first Typography
      //cy.wrap($carCard).find('.carCardPrice').should('match', /^\d{1,3}(,\d{3})*\$$/); // Modify according to test data
      cy.get('.carCardPrice').invoke('text').should('match', /^\d{1,3}(,\d{3})*\$$/);
      cy.wrap($carCard).find('.MuiTypography-root').eq(3).should('contain', 'Dizel'); // Assuming fuel type is second Typography
    });
  });

  it('Should clear all filters when the clear button is clicked', () => {
    // Apply some filters first
    cy.get('#filterMake').click();
    cy.get('li[data-value="Toyota"]').click();

    cy.get('#filterBody').click();
    cy.get('li[data-value="SUV"]').click();

    // Click on the clear filters button
    cy.get('button[aria-label="Clear all filters"]').click();

    // Assert that filters are cleared
    cy.get('#filterMake').should('have.value', '');
    cy.get('#filterBody').should('have.value', '');
    cy.get('.testClass').should('have.length.greaterThan', 0); // Assuming cars are still displayed after clearing
  });

  it('Should display car details in a modal when a car is selected', () => {
    // Click on the first car card
    cy.get('.testClass').first().click();

    // Assert that the modal is open and displays correct information
    cy.get('#carModal').should('be.visible');
    cy.get('#carModal h2').should('not.be.empty'); // Checking for car make and model
    cy.get('#carModal img').should('be.visible'); // Checking for car image
  });
});
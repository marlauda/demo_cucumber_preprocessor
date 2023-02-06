import { DataTable, When } from '@badeball/cypress-cucumber-preprocessor';

When('I sometimes trigger an error on purpose', async (dataTable: DataTable) => {
  if (Cypress.currentRetry < (Cypress.getTestRetries() ?? 0)) {
    const errorMessage = dataTable.hashes()[0].error;

    throw new Error(errorMessage);
  }

  cy.task('displayLog', 'Success!!');
});

When('everything is fine', async () => {
  expect(0).to.be.equal(0);
  cy.task('displayLog', 'Success!!');
});

import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I trigger different errors depending on the case', async () => {
  if (Cypress.currentRetry < (Cypress.getTestRetries() ?? 0)) {
    throw new Error('Test failed.');
  }
  throw new Error('Test should fail but will not.');
});

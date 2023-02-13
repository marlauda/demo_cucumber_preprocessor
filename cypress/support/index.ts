Cypress.on('fail', (err: Cypress.CypressError) => {
  if (err.message.includes('Test should fail but will not')) {
    return;
  }
  throw err;
});

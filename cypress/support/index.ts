const pendingErrors: Cypress.CypressError[] = [];
let lastTestExecuted: string = '';

const formatErrors = (): string => {
  return (
    pendingErrors
      // error.stack contains the error title, message and stack trace correctly formatted, so used by default
      .map((error, index) => `\n\nAttempt ${index + 1}:\n\t${error.stack ?? `${error.name} ${error.message}`}\n`)
      .join(
        '\n############################################################################################################################################################################\n',
      )
  );
};

Cypress.on('fail', (err: Cypress.CypressError, mocha: Mocha.Runnable) => {
  const maximumNumberOfRetries = mocha.retries() ?? 0;

  // if no retry usage, keep Cypress native behavior
  if (maximumNumberOfRetries === 0) {
    throw err;
  }

  pendingErrors.push(err);

  // as long as there are remaining retry, just return the current error so Cypress will fail and trigger the retry
  if (pendingErrors.length <= maximumNumberOfRetries) {
    throw err;
  }

  throw new Error(formatErrors());
});

Cypress.on('test:after:run', (_, mocha: Mocha.Runnable) => {
  // if the test is a success because of the retry mechanism, the error is displayed anyway as a warning so it's possible to keep an eye on it
  if (mocha.isPassed() && pendingErrors.length > 0) {
    // fail the test with "Expected to find an error message"
    cy.task('displayLog', `[WARNING] Some errors occurred triggering retry. Please check test stability.\n\nErrors:\n${formatErrors()}`);
  }
});

Cypress.on('test:before:run', (_, mocha) => {
  const testFullTitle = mocha.fullTitle();
  
  if (lastTestExecuted === testFullTitle) {
    return;
  }

  lastTestExecuted = testFullTitle;
  pendingErrors.length = 0;
});

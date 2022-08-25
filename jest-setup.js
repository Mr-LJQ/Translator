import "@testing-library/jest-dom";

/**
 * The dev-expression transform does not run when NODE_ENV is test.As such,
 *  if you use __DEV__, you will need to define it as a global constant in your test environment.
 *  'https://github.com/4Catalyzer/babel-plugin-dev-expression'
 */
globalThis.__DEV__ = true
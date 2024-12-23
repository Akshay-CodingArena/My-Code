import "@testing-library/jest-dom";
import "jest-canvas-mock";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers"; // Import your request handlers

// Setup a request mocking server with the given request handlers
const server = setupServer(...handlers);

// Establish a connection to the server before running any tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest: (req) => {
      console.error(
        `Found an unhandled ${req.method} request to ${req.url.href}`,
      );
    },
  });
});

// Reset any runtime request handlers back to the initial state.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished, remove the mock server and restore the environment.
afterAll(() => server.close());

// Make the server and request handlers available to all tests.

export { server };
global.matchMedia =
  global.matchMedia ||
  function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function (listener) {
        // deprecated
      },
      removeListener: function (listener) {
        // deprecated
      },
      addEventListener: function (type, listener) {
        // no-op
      },
      removeEventListener: function (type, listener) {
        // no-op
      },
      dispatchEvent: function (event) {
        return false;
      },
    };
  };

global.IntersectionObserver = class {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }], this);
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};

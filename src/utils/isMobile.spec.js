// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(),
  writable: true,
});

import isMobile from './isMobile';

describe('isMobile', () => {
  describe('with a matching media', () => {
    beforeEach(() => {
      window.matchMedia.mockImplementation(() => ({ matches: true }));
    });

    afterEach(() => {
      window.matchMedia.mockRestore();
    });

    it('should return true', () => {
      expect(isMobile()).toBe(true);
    });
  });

  describe('with a non-matching media', () => {
    beforeEach(() => {
      window.matchMedia.mockImplementation(() => ({ matches: false }));
    });

    afterEach(() => {
      window.matchMedia.mockRestore();
    });

    it('should return true', () => {
      expect(isMobile()).toBe(false);
    });
  });
});

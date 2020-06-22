import getSelector from './getSelector';

describe('getSelector', () => {
  let selector;

  describe('default', () => {
    beforeEach(() => {
      selector = getSelector();
    });

    it('should return a function', () => {
      expect(selector).toBeInstanceOf(Function);
    });

    it('should return an identity function', () => {
      expect(selector('value')).toBe('value');
    });
  });

  describe('with a function value', () => {
    let value;

    beforeEach(() => {
      value = () => {};
      selector = getSelector(value);
    });

    it('should return the specified function', () => {
      expect(selector).toBe(value);
    });
  });

  describe('with a number value', () => {
    beforeEach(() => {
      selector = getSelector(3);
    });

    it('should return a key selector', () => {
      expect(selector(['One', 'Two', 'Three', 'Four', 'Five'])).toBe('Four');
    });
  });

  describe('with a string value', () => {
    beforeEach(() => {
      selector = getSelector('myKey');
    });

    it('should return a key selector', () => {
      expect(
        selector({
          myFirstKey: 'first',
          myKey: 'second',
          myLastKey: 'last',
        }),
      ).toBe('second');
    });
  });

  describe('with another type of value', () => {
    beforeEach(() => {
      selector = getSelector(new Date());
    });

    it('should return an identity function', () => {
      expect(selector('value')).toBe('value');
    });
  });
});

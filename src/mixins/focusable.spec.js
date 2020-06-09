import focusable from './focusable';

describe('focusable', () => {
  let vm;

  it('should define data and methods', () => {
    expect(Object.keys(focusable)).toEqual(['data', 'methods']);
  });

  it('should define a data function', () => {
    expect(typeof focusable.data).toBe('function');
  });

  it('should define two methods, blur and focus', () => {
    expect(Object.keys(focusable.methods)).toEqual(['blur', 'focus']);
    expect(typeof focusable.methods.blur).toBe('function');
    expect(typeof focusable.methods.focus).toBe('function');
  });

  describe('when calling the data function', () => {
    let data;

    beforeEach(() => {
      data = focusable.data();
    });

    it('should return an isFocused data set to false', () => {
      expect(data).toEqual({
        isFocused: false,
      });
    });
  });

  describe('when calling blur', () => {
    beforeEach(() => {
      vm = {
        $emit: jest.fn(),
      };

      focusable.methods.blur.bind(vm)();
    });

    it('should call $emit', () => {
      expect(vm.$emit).toHaveBeenCalledWith('blur', undefined);
    });

    it('should set isFocused to false', () => {
      expect(vm.isFocused).toBe(false);
    });
  });

  describe('when calling focus', () => {
    beforeEach(() => {
      vm = {
        $emit: jest.fn(),
      };

      focusable.methods.focus.bind(vm)();
    });

    it('should call $emit', () => {
      expect(vm.$emit).toHaveBeenCalledWith('focus', undefined);
    });

    it('should set isFocused to true', () => {
      expect(vm.isFocused).toBe(true);
    });
  });
});

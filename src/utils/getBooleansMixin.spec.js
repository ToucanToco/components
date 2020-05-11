import getBooleansMixin from './getBooleansMixin';

describe('getBooleansMixin', () => {
  let computedValue;
  let mixin;

  describe('default', () => {
    beforeEach(() => {
      mixin = getBooleansMixin();
    });

    it('should define props and computed', () => {
      expect(Object.keys(mixin)).toEqual(['props', 'computed']);
    });

    it('should not define any props', () => {
      expect(mixin.props).toEqual({});
    });

    it('should define a single undefined computed', () => {
      expect(Object.keys(mixin.computed)).toEqual(['undefined']);
    });

    describe('when calling the computed', () => {
      beforeEach(() => {
        computedValue = mixin.computed.undefined();
      });

      it('should return undefined', () => {
        expect(computedValue).toBe(undefined);
      });
    });
  });

  describe('with a key', () => {
    beforeEach(() => {
      mixin = getBooleansMixin('myKey');
    });

    it('should define a single myKey computed', () => {
      expect(Object.keys(mixin.computed)).toEqual(['myKey']);
    });
  });

  describe('with a key and valuesConst', () => {
    beforeEach(() => {
      mixin = getBooleansMixin('myKey', {
        DEFAULT: 'first',
        SECOND: 'second',
        THIRD: 'third',
      });
    });

    it('should define props for non-default valuesConst keys', () => {
      expect(Object.keys(mixin.props)).toEqual(['second', 'third']);
    });

    it('should define props as booleans defaulting to false', () => {
      expect(Object.keys(mixin.props.second)).toEqual(['default', 'type']);
      expect(mixin.props.second.default).toBe(false);
      expect(mixin.props.second.type).toEqual(Boolean);
      expect(Object.keys(mixin.props.third)).toEqual(['default', 'type']);
      expect(mixin.props.third.default).toBe(false);
      expect(mixin.props.third.type).toEqual(Boolean);
    });

    describe('when calling the computed', () => {
      beforeEach(() => {
        computedValue = mixin.computed.myKey();
      });

      it('should return the default value', () => {
        expect(computedValue).toBe('first');
      });
    });

    describe('when calling the computed with a prop set to true', () => {
      beforeEach(() => {
        computedValue = mixin.computed.myKey.bind({
          second: true,
        })();
      });

      it('should return the true prop key', () => {
        expect(computedValue).toBe('second');
      });
    });
  });

  describe('with a key, valuesConst and inherit', () => {
    beforeEach(() => {
      mixin = getBooleansMixin(
        'myKey',
        {
          DEFAULT: 'first',
          SECOND: 'second',
          THIRD: 'third',
        },
        true,
      );
    });

    describe('when calling the computed', () => {
      beforeEach(() => {
        computedValue = mixin.computed.myKey();
      });

      it('should return the default value', () => {
        expect(computedValue).toBe('first');
      });
    });

    describe('when calling the computed with a parent', () => {
      beforeEach(() => {
        computedValue = mixin.computed.myKey.bind({
          $parent: {},
        })();
      });

      it('should return the default value', () => {
        expect(computedValue).toBe('first');
      });
    });

    describe('when calling the computed with a parent computed', () => {
      beforeEach(() => {
        computedValue = mixin.computed.myKey.bind({
          $parent: {
            myKey: 'second',
          },
        })();
      });

      it("should return the parent's computed value", () => {
        expect(computedValue).toBe('second');
      });
    });

    describe('when calling the computed with a prop set to true and a parent computed', () => {
      beforeEach(() => {
        computedValue = mixin.computed.myKey.bind({
          $parent: {
            myKey: 'second',
          },
          third: true,
        })();
      });

      it('should return the true prop key', () => {
        expect(computedValue).toBe('third');
      });
    });
  });
});

import { createLocalVue, shallowMount } from '@vue/test-utils';

import TcComponents, { DEFAULT_COLORS } from './';

describe('TcComponents plugin', () => {
  const createWrapper = ({ component = {}, options = {} } = { component: {}, options: {} }) =>
    shallowMount(
      {
        template: '<div />',
        ...component,
      },
      {
        localVue,
        ...options,
      },
    );
  let localVue;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
  });

  describe('default', () => {
    beforeEach(() => {
      localVue.use(TcComponents);
      wrapper = createWrapper();
    });

    it('should add $tcComponents to Vue instances', () => {
      expect(wrapper.vm.$tcComponents).not.toBe(undefined);
    });

    it('should pass the default colors to $tcComponents', () => {
      expect(wrapper.vm.$tcComponents.colors).toEqual(DEFAULT_COLORS);
    });

    describe('on updateColors call', () => {
      beforeEach(() => {
        wrapper.vm.$tcComponents.updateColors({ brand: 'purple' });
      });

      it('should update colors on updateColors call', () => {
        expect(wrapper.vm.$tcComponents.colors).toEqual({
          ...DEFAULT_COLORS,
          brand: 'purple',
        });
      });
    });
  });

  describe('with empty options', () => {
    beforeEach(() => {
      localVue.use(TcComponents, {});
      wrapper = createWrapper();
    });

    it('should pass the default colors to $tcComponents', () => {
      expect(wrapper.vm.$tcComponents.colors).toEqual(DEFAULT_COLORS);
    });
  });

  describe('with colors options', () => {
    beforeEach(() => {
      localVue.use(TcComponents, {
        colors: {
          brand: 'purple',
          custom: 'cyan',
        },
      });
      wrapper = createWrapper();
    });

    it('should pass the extended colors to $tcComponents', () => {
      expect(wrapper.vm.$tcComponents.colors).toEqual({
        ...DEFAULT_COLORS,
        brand: 'purple',
        custom: 'cyan',
      });
    });
  });

  describe('with multiple components', () => {
    let subWrappers;

    beforeEach(() => {
      localVue.use(TcComponents);
      wrapper = createWrapper({
        component: {
          components: {
            SubComponent: {
              name: 'SubComponent',
              template: '<div />',
            },
          },
          template: '<div><SubComponent /><SubComponent /></div>',
        },
      });
      subWrappers = wrapper.findAll({ name: 'SubComponent' }).wrappers;
      subWrappers[0].vm.$tcComponents.updateColors({ brand: 'purple' });
    });

    it('should update other components colors', () => {
      expect(subWrappers[1].vm.$tcComponents.colors.brand).toBe('purple');
    });
  });

  describe('with multiple vue instances', () => {
    let wrapper2;

    beforeEach(() => {
      localVue.use(TcComponents);
      wrapper = createWrapper();
      wrapper2 = createWrapper();
    });

    it('should not leak colors into other instances', () => {
      wrapper.vm.$tcComponents.updateColors({ brand: 'purple' });

      expect(wrapper2.vm.$tcComponents.colors.brand).toBe(DEFAULT_COLORS.brand);
    });
  });
});

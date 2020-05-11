import { shallowMount } from '@vue/test-utils';

import TcButton from './TcButton.vue';

describe('TcButton', () => {
  const createWrapper = (options = {}) =>
    shallowMount(TcButton, {
      beforeCreate() {
        this.$tcComponents = {
          colors: {
            emphasis: 'green',
          },
        };
      },
      ...options,
    });
  let wrapper;

  describe('default', () => {
    beforeEach(() => {
      wrapper = createWrapper();
    });

    it('should use TcClickable as root', () => {
      expect(wrapper.element.tagName).toBe('TCCLICKABLE-STUB');
    });

    it('should set the default classes', () => {
      expect(wrapper.classes()).toEqual([
        'tc-button',
        'tc-button--color-default',
        'tc-button--size-medium',
        'tc-button--theme-light',
        'tc-button--type-plain',
      ]);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });

    it('should not have an icon', () => {
      expect(wrapper.findComponent({ name: 'TcIcon' }).exists()).toBe(false);
    });

    it('should use TcText with the right props', () => {
      const tcTextWrapper = wrapper.findComponent({ name: 'TcText' });

      expect(tcTextWrapper.exists()).toBe(true);
      expect(
        Object.entries(tcTextWrapper.props())
          .filter(([_, value]) => value)
          .map(([key]) => key),
      ).toEqual(['center', 'small', 'uppercase', 'bold']);
    });

    it('should not have any text', () => {
      expect(wrapper.findComponent({ name: 'TcText' }).element.innerHTML).toBe('');
    });

    describe('on click', () => {
      beforeEach(() => {
        wrapper.findComponent({ name: 'TcClickable' }).vm.$emit('click');
      });

      it('should emit a click event', () => {
        expect(wrapper.emitted('click')).toHaveLength(1);
      });
    });
  });

  describe('with a primary color', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          primary: true,
        },
      });
    });

    it('should set the primary color class', () => {
      expect(wrapper.classes('tc-button--color-primary')).toBe(true);
    });

    it('should set the right styles', () => {
      expect(wrapper.attributes('style')).toBe('background-color: green;');
    });
  });

  describe('with a secondary color', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          secondary: true,
        },
      });
    });

    it('should set the secondary color class', () => {
      expect(wrapper.classes('tc-button--color-secondary')).toBe(true);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });
  });

  describe('with a studio color', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          studio: true,
        },
      });
    });

    it('should set the studio color class', () => {
      expect(wrapper.classes('tc-button--color-studio')).toBe(true);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });
  });

  describe('with a small size', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          small: true,
        },
      });
    });

    it('should set the small size class', () => {
      expect(wrapper.classes('tc-button--size-small')).toBe(true);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });

    it('should use a small TcText', () => {
      expect(wrapper.findComponent({ name: 'TcText' }).props('small')).toBe(true);
    });
  });

  describe('with a large size', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          large: true,
        },
      });
    });

    it('should set the large size class', () => {
      expect(wrapper.classes('tc-button--size-large')).toBe(true);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });

    it('should use a medium TcText', () => {
      expect(wrapper.findComponent({ name: 'TcText' }).props('small')).toBe(false);
    });
  });

  describe('with an outlined type', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          outlined: true,
        },
      });
    });

    it('should set the outlined type class', () => {
      expect(wrapper.classes('tc-button--type-outlined')).toBe(true);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });
  });

  describe('with a primary color and an outlined type', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          primary: true,
          outlined: true,
        },
      });
    });

    it('should set the right styles', () => {
      expect(wrapper.attributes('style')).toBe('color: green;');
    });
  });

  describe('with a dark theme', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          dark: true,
        },
      });
    });

    it('should set the dark theme class', () => {
      expect(wrapper.classes('tc-button--theme-dark')).toBe(true);
    });

    it('should only set the class attribute', () => {
      expect(Object.keys(wrapper.attributes())).toEqual(['class']);
    });
  });

  describe('with href', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          href: 'https://toucantoco.com',
        },
      });
    });

    it('should use an <a> tag as root', () => {
      expect(wrapper.element.tagName).toBe('A');
    });

    it('should set the href attribute', () => {
      expect(wrapper.attributes('href')).toBe('https://toucantoco.com');
    });

    it('should set the rel attribute', () => {
      expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
    });

    it('should set the target attribute', () => {
      expect(wrapper.attributes('target')).toBe('_blank');
    });
  });

  describe('with an icon', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          icon: 'myIcon',
        },
      });
    });

    it('should use TcIcon with the right props', () => {
      const tcIconWrapper = wrapper.findComponent({ name: 'TcIcon' });

      expect(tcIconWrapper.exists()).toBe(true);
      expect(tcIconWrapper.props('label')).toBe('myIcon');
      expect(tcIconWrapper.props('small')).toBe(true);
    });
  });

  describe('as a RouterLink', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          to: 'https://toucantoco.com',
        },
        stubs: {
          RouterLink: true,
        },
      });
    });

    it('should use a RouterLink as root', () => {
      expect(wrapper.element.tagName).toBe('ROUTERLINK-STUB');
    });

    it('should pass the to prop to the RouterLink', () => {
      expect(wrapper.attributes('to')).toBe('https://toucantoco.com');
    });
  });

  describe('with a large size and an icon', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          icon: 'myIcon',
          large: true,
        },
      });
    });

    it('should use a large medium icon', () => {
      expect(wrapper.findComponent({ name: 'TcIcon' }).props('small')).toBe(false);
    });
  });

  describe('with slot content', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        slots: {
          default: 'Slot content',
        },
      });
    });

    it('should fill TcText with the default slot content', () => {
      expect(wrapper.findComponent({ name: 'TcText' }).element.innerHTML).toBe('Slot content');
    });
  });
});

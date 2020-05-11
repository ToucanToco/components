import { shallowMount } from '@vue/test-utils';

import TcAppBar from './TcAppBar.vue';

describe('TcAppBar', () => {
  const createWrapper = (options = {}) => shallowMount(TcAppBar, options);
  let wrapper;

  describe('default', () => {
    beforeEach(() => {
      wrapper = createWrapper();
    });

    it('should set the default classes', () => {
      expect(wrapper.classes()).toEqual([
        'tc-app-bar',
        'tc-app-bar--theme-light',
        'tc-app-bar--type-raised',
      ]);
    });

    it('should be empty', () => {
      expect(wrapper.element.innerHTML).toBe('');
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
      expect(wrapper.classes()).toEqual([
        'tc-app-bar',
        'tc-app-bar--theme-dark',
        'tc-app-bar--type-raised',
      ]);
    });
  });

  describe('with a flat type', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        propsData: {
          flat: true,
        },
      });
    });

    it('should set the flat type class', () => {
      expect(wrapper.classes()).toEqual([
        'tc-app-bar',
        'tc-app-bar--theme-light',
        'tc-app-bar--type-flat',
      ]);
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

    it('should fill itself with the default slot content', () => {
      expect(wrapper.element.innerHTML).toBe('Slot content');
    });
  });
});

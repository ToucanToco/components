import kebabCase from 'lodash/kebabCase';
import Vue from 'vue';
import Vuex from 'vuex';

import { DEFAULT_COLORS } from 'tc-components/variables';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    cleanup({ commit }) {
      commit('removeStyleElement');
    },
    init({ commit }) {
      commit('updateColors');
      commit('addStyleElement');
    },
  },
  mutations: {
    addStyleElement(state) {
      state.styleElement.setAttribute('type', 'text/css');
      document.head.appendChild(state.styleElement);
    },
    removeStyleElement(state) {
      state.styleElement.remove();
    },
    updateColors(state, colors) {
      if (colors !== undefined) {
        state.colors = {
          ...state.colors,
          ...colors,
        };
      }

      state.styleElement.textContent = `*{${Object.entries(state.colors)
        .map(([key, value]) => `--tc-color--${kebabCase(key)}:${value}`)
        .join(';')}}`;
    },
  },
  state: {
    colors: DEFAULT_COLORS,
    styleElement: document.createElement('style'),
  },
});

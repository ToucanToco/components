import getBooleansMixin from 'tc-components/utils/getBooleansMixin';

export const TC_COMPONENT_MODES = {
  DEFAULT: 'default',

  COMPACT: 'compact',
};

export const TC_COMPONENT_THEMES = {
  DEFAULT: 'light',

  DARK: 'dark',
};

const _modable = getBooleansMixin('mode', TC_COMPONENT_MODES, true);
const _themable = getBooleansMixin('theme', TC_COMPONENT_THEMES, true);

export default {
  props: {
    overrides: {
      default: undefined,
      type: Object,
    },
    ..._modable.props,
    ..._themable.props,
  },

  computed: {
    ..._modable.computed,
    ..._themable.computed,
  },
};

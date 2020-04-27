export const DEFAULT_COLORS = {
  brand: '#88b2a8',
  brandLight: '#b9d1cb',
  emphasis: '#f3c600',
  neutral: '#c4c4c4',
  positive: '#a7bd3e',
  warning: '#ed8b49',
};

export default {
  install(Vue, options) {
    const optionsColors =
      options === undefined || options.colors === undefined ? {} : options.colors;

    Vue.prototype._tcComponents = function (vm) {
      const $tcComponents = {
        colors: {
          ...DEFAULT_COLORS,
          ...optionsColors,
        },
        updateColors(colors) {
          $tcComponents.colors = {
            ...$tcComponents.colors,
            ...colors,
          };
        },
      };

      Vue.util.defineReactive(vm, '$tcComponents', $tcComponents);
    };
    Vue.mixin({
      beforeCreate() {
        if (this.$parent !== undefined && this.$parent.$tcComponents !== undefined) {
          this.$tcComponents = this.$parent.$tcComponents;
        } else {
          this._tcComponents(this);
        }
      },
    });
  },
};

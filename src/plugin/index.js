export default {
  install(Vue, options) {
    const optionsColors =
      options === undefined || options.colors === undefined
        ? {}
        : options.colors;

    Vue.prototype._tcComponents = {
      colors: {
        brand: '#88b2a8',
        brandLight: '#b9d1cb',
        emphasis: '#f3c600',
        neutral: '#c4c4c4',
        positive: '#a7bd3e',
        warning: '#ed8b49',
        ...optionsColors,
      },
      updateColors(colors) {
        Vue.set(Vue.prototype._tcComponents, 'colors', {
          ...Vue.prototype._tcComponents.colors,
          ...colors,
        });
      },
    };

    Vue.mixin({
      beforeCreate() {
        Vue.util.defineReactive(
          this,
          '$tcComponents',
          Vue.prototype._tcComponents,
        );
      },
    });
  },
};

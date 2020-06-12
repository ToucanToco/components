export default function (key, valuesConst = {}, inherit = false) {
  const propsKeys = Object.values(valuesConst).slice(1);

  return {
    props: Object.fromEntries(
      propsKeys.map((propKey) => [
        propKey,
        {
          default: false,
          type: Boolean,
        },
      ]),
    ),

    computed: {
      [key]() {
        if (this.overrides !== undefined && this.overrides[key] !== undefined) {
          return this.overrides[key];
        }

        let value = undefined;

        for (let i = 0, ii = propsKeys.length; i < ii; i++) {
          const propKey = propsKeys[i];

          if (this[propKey]) {
            value = propKey;
            break;
          }
        }
        if (value !== undefined) {
          return value;
        }
        if (inherit && this.$parent !== undefined && this.$parent[key] !== undefined) {
          return this.$parent[key];
        }

        return valuesConst.DEFAULT;
      },
    },
  };
}

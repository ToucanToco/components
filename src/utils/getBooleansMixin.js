export default function(key, valuesConst) {
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
        let value = undefined;

        for (let i = 0, ii = propsKeys.length; i < ii; i++) {
          const propKey = propsKeys[i];

          if (this[propKey]) {
            value = propKey;
            break;
          }
        }

        return value === undefined ? valuesConst.DEFAULT : value;
      },
    },
  };
}

import ICONS from '../../components/TcIcon/icons';

const _iconsLabels = Object.keys(ICONS);
const _propPairToOptionPair = function([key, options], componentName) {
  if ((componentName === 'TcIcon' && key === 'label') || key === 'icon') {
    return [
      key,
      {
        editor: 'select',
        types: ['String'],
        value: options.default,
        values: _iconsLabels,
      },
    ];
  }

  const typesArray = Array.isArray(options.type)
    ? options.type.map(({ name }) => name)
    : [options.type.name];

  return [
    key,
    {
      editor: typesArray[0].toLowerCase(),
      types: typesArray,
      value: typeof options.default === 'function' ? options.default() : options.default,
    },
  ];
};

export default function(component) {
  let optionsPairs = [];

  if (component.mixins !== undefined) {
    optionsPairs = [
      ...optionsPairs,
      ...component.mixins.flatMap((mixin) => {
        if (mixin.props === undefined) {
          return [];
        }

        const mixinPropsList = Object.entries(mixin.props);
        const mixinComputedKeys = mixin.computed === undefined ? [] : Object.keys(mixin.computed);

        if (
          mixinPropsList.every(([_, { type }]) => type === Boolean) &&
          mixinComputedKeys.length === 1
        ) {
          return [
            [
              mixinComputedKeys[0],
              {
                editor: 'select',
                types: ['Booleans'],
                value: undefined,
                values: Object.keys(mixin.props),
              },
            ],
          ];
        }

        return mixinPropsList.map(_propPairToOptionPair);
      }),
    ];
  }
  if (component.props !== undefined) {
    optionsPairs = [
      ...optionsPairs,
      ...Object.entries(component.props).map((propPair) =>
        _propPairToOptionPair(propPair, component.name),
      ),
    ];
  }

  return Object.fromEntries(
    optionsPairs.sort((a, b) => (a[0] === b[0] ? 0 : a[0] > b[0] ? 1 : -1)),
  );
}

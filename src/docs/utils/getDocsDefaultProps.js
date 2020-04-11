export default function (options) {
  return Object.fromEntries(
    Object.entries(options).flatMap(([optionKey, optionOptions]) =>
      optionOptions.types[0] === 'Booleans'
        ? optionOptions.values.map((value) => [value, false])
        : [[optionKey, optionOptions.value]],
    ),
  );
}

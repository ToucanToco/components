export default function (value) {
  switch (typeof value) {
    case 'function':
      return value;
    case 'number':
    case 'string':
      return (item) => item[value];
    default:
      return (item) => item;
  }
}

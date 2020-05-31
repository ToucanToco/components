const _hyphenateRegExp = /\B([A-Z])/g;

export default function (str) {
  return str.replace(_hyphenateRegExp, '-$1').toLowerCase();
}

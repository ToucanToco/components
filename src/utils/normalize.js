import deburr from 'lodash/deburr';

export default function (str) {
  return deburr(str)
    .toLowerCase()
    .replace(/[^0-9a-z]/g, '');
}

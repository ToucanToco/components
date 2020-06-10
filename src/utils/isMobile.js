export default function () {
  return matchMedia(
    'screen and (orientation: portrait) and (max-width: 767px), screen and (orientation: landscape) and (max-height: 767px)',
  ).matches;
}

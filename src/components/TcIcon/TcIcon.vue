<template>
  <div class="tc-icon" :class="elementClass">
    <svg class="tc-icon__svg" :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
      <path :d="path" />
    </svg>
  </div>
</template>

<script>
import sizable from '../../mixins/sizable';
import ICONS from './icons';

export default {
  name: 'TcIcon',

  mixins: [sizable],

  props: {
    label: {
      default: undefined,
      type: String,
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-icon--size-${this.size}`]: true,
      };
    },
    icon() {
      return this.label === undefined || ICONS[this.label] === undefined
        ? { height: 0, path: '', width: 0 }
        : ICONS[this.label];
    },
    path() {
      return this.icon.path;
    },
    svgViewBox() {
      return `0 0 ${this.icon.size || this.icon.width} ${this.icon.size || this.icon.height}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../variables';

.tc-icon {
  align-items: center;
  display: flex;
  fill: currentColor;
  justify-content: center;
}

@each $label, $font-size in $tc-font-sizes {
  .tc-icon--size-#{$label} {
    height: $font-size;
    width: $font-size;
  }
}

.tc-icon__svg {
  height: 100%;
  width: 100%;
}
</style>

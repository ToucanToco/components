<template>
  <div class="tc-icon" :class="elementClass">
    <svg class="tc-icon__svg" :viewBox="svgViewBox" xmlns="http://www.w3.org/2000/svg">
      <path :d="path" />
    </svg>
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import { FONT_SIZES } from 'tc-components/variables';
import ICONS from './icons';

export default {
  name: 'TcIcon',

  mixins: [tcComponent, getBooleansMixin('size', FONT_SIZES)],

  props: {
    label: {
      default: undefined,
      type: String,
    },
  },

  computed: {
    elementClass() {
      return [`tc-icon--label-${this.label}`, `tc-icon--size-${this.size}`];
    },
    icon() {
      return this.label === undefined || ICONS[this.label] === undefined
        ? { path: '', size: 0 }
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
@import 'tc-components/variables';

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

<template>
  <div class="tc-text" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import { FONT_SIZES } from 'tc-components/variables';

export const TC_TEXT_ALIGNMENTS = {
  DEFAULT: 'start',

  CENTER: 'center',
  END: 'end',
};

export const TC_TEXT_DISPLAYS = {
  DEFAULT: 'block',

  INLINE: 'inline',
};

export const TC_TEXT_FAMILIES = {
  DEFAULT: 'default',

  MONOSPACE: 'monospace',
  SERIF: 'serif',
};

export const TC_TEXT_TRANSFORMS = {
  DEFAULT: 'none',

  UPPERCASE: 'uppercase',
};

export const TC_TEXT_WEIGHTS = {
  DEFAULT: 'regular',

  THIN: 'thin',
  MEDIUM: 'medium',
  BOLD: 'bold',
};

export default {
  name: 'TcText',

  mixins: [
    tcComponent,
    getBooleansMixin('align', TC_TEXT_ALIGNMENTS),
    getBooleansMixin('display', TC_TEXT_DISPLAYS),
    getBooleansMixin('family', TC_TEXT_FAMILIES),
    getBooleansMixin('size', FONT_SIZES),
    getBooleansMixin('transform', TC_TEXT_TRANSFORMS),
    getBooleansMixin('weight', TC_TEXT_WEIGHTS),
  ],

  computed: {
    elementClass() {
      return [
        `tc-text--align-${this.align}`,
        `tc-text--display-${this.display}`,
        `tc-text--family-${this.family}`,
        `tc-text--size-${this.size}`,
        `tc-text--transform-${this.transform}`,
        `tc-text--weight-${this.weight}`,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-text {
  line-height: $tc-line-height--default;
}

@each $label, $text-align in $tc-text-aligns {
  .tc-text--align-#{$label} {
    text-align: $text-align;
  }
}

.tc-text--display-inline {
  display: inline-block;
}

@each $label, $font-family in $tc-font-families {
  .tc-text--family-#{$label} {
    font-family: $font-family;
  }
}

@each $label, $font-size in $tc-font-sizes {
  .tc-text--size-#{$label} {
    font-size: $font-size;
    margin-bottom: -$font-size * ($tc-line-height--default - 1) * 0.5;
    margin-top: -$font-size * ($tc-line-height--default - 1) * 0.5;
  }

  .tc-text--size-#{$label}.tc-text--transform-uppercase {
    letter-spacing: map-get($tc-letter-spacings, $label);
  }
}

.tc-text--transform-uppercase {
  text-transform: uppercase;
}

@each $label, $font-weight in $tc-font-weights {
  .tc-text--weight-#{$label} {
    font-weight: $font-weight;
  }
}

.tc-text > * {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  text-align: inherit;
  text-transform: inherit;
}
</style>

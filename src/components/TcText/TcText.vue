<template>
  <div class="tc-text" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import alignable from 'tc-components/mixins/alignable';
import displayable from 'tc-components/mixins/displayable';
import familiable from 'tc-components/mixins/familiable';
import sizable from 'tc-components/mixins/sizable';
import transformable from 'tc-components/mixins/transformable';
import weightable from 'tc-components/mixins/weightable';

export default {
  name: 'TcText',

  mixins: [alignable, displayable, familiable, sizable, transformable, weightable],

  computed: {
    elementClass() {
      return {
        [`tc-text--align-${this.align}`]: true,
        [`tc-text--display-${this.display}`]: true,
        [`tc-text--family-${this.family}`]: true,
        [`tc-text--size-${this.size}`]: true,
        [`tc-text--transform-${this.transform}`]: true,
        [`tc-text--weight-${this.weight}`]: true,
      };
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

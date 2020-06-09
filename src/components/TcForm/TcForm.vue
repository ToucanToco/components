<template>
  <div class="tc-form" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';

export const TC_FORM_DIRECTIONS = {
  DEFAULT: 'vertical',

  HORIZONTAL: 'horizontal',
};

export default {
  name: 'TcForm',

  mixins: [tcComponent, getBooleansMixin('direction', TC_FORM_DIRECTIONS)],

  computed: {
    elementClass() {
      return `tc-form--direction-${this.direction}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-form {
  display: flex;
  margin: -$tc-spacing--form * 0.5;
}

.tc-form /deep/ > * {
  margin: $tc-spacing--form * 0.5;
}

.tc-form--direction-horizontal {
  align-items: center;
  flex-wrap: wrap;
}

.tc-form--direction-vertical {
  flex-direction: column;
}
</style>

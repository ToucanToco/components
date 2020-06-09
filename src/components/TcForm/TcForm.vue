<template>
  <div class="tc-form" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import directionable from 'tc-components/mixins/directionable';
import themable from 'tc-components/mixins/themable';

export default {
  name: 'TcForm',

  mixins: [directionable, themable],

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

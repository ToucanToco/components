<template>
  <div class="tc-form" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import directionable from '../../mixins/directionable';

export default {
  name: 'TcForm',

  mixins: [directionable],

  computed: {
    elementClass() {
      return {
        [`tc-form--direction-${this.direction}`]: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../variables";

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

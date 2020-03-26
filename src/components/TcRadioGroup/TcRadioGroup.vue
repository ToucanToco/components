<template>
  <div class="tc-radio-group">
    <slot />
  </div>
</template>

<script>
import themable from '../../mixins/themable';

export default {
  name: 'TcRadioGroup',

  provide() {
    return {
      radioGroup: this,
    };
  },

  mixins: [themable],

  props: {
    value: {
      default: undefined,
      type: String,
    },
  },

  computed: {
    id() {
      return `tc-radio-group--${this._uid}`;
    },
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../variables';

.tc-radio-group {
  display: flex;
  flex-direction: column;
}

.tc-radio-group /deep/ > * {
  margin-top: $tc-spacing--input;
}

.tc-radio-group /deep/ > :first-child {
  margin-top: 0;
}
</style>

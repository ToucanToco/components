<template>
  <div class="tc-radio-group">
    <slot />
  </div>
</template>

<script>
import themable from 'tc-components/mixins/themable';

export default {
  name: 'TcRadioGroup',

  provide() {
    return {
      radioGroup: this,
    };
  },

  mixins: [themable],

  props: {
    id: {
      default() {
        return `tc-radio-group--${this._uid}`;
      },
      type: String,
    },
    value: {
      default: undefined,
      type: [Array, Date, Function, Number, Object, String],
    },
  },

  computed: {
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
@import 'tc-components/variables';

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

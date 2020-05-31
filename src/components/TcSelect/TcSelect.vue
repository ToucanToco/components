<template>
  <div class="tc-select" :class="elementClass" @click="triggerFocus()">
    <TcText class="tc-select__value" :class="valueClass">{{ label }}</TcText>
    <TcIcon class="tc-select__icon" :label="icon" small />
    <select
      :id="id"
      ref="input"
      v-model="valueModel"
      class="tc-select__input"
      @blur="blur()"
      @focus="focus()"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">{{
        option.label
      }}</option>
    </select>
  </div>
</template>

<script>
import focusable from 'tc-components/mixins/focusable';
import themable from 'tc-components/mixins/themable';
import widthable from 'tc-components/mixins/widthable';
import TcIcon from 'tc-components/components/TcIcon';
import TcText from 'tc-components/components/TcText';

export default {
  name: 'TcSelect',

  components: {
    TcIcon,
    TcText,
  },

  mixins: [focusable, themable, widthable],

  props: {
    error: {
      default: false,
      type: Boolean,
    },
    id: {
      default() {
        return `tc-select--${this._uid}`;
      },
      type: String,
    },
    icon: {
      default: 'expand',
      type: String,
    },
    items: {
      default: undefined,
      type: Array,
    },
    placeholder: {
      default: undefined,
      type: String,
    },
    value: {
      default: undefined,
      type: [Array, Date, Function, Number, Object, String],
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-select--theme-${this.theme}`]: true,
        [`tc-select--width-${this.width}`]: true,
        'is-error': this.error,
        'is-focused': this.isFocused,
      };
    },
    label() {
      return this.selectedOption === undefined ? this.placeholder : this.selectedOption.label;
    },
    options() {
      if (this.items === undefined) {
        return [];
      }

      return this.items.map((item) =>
        typeof item === 'string' ? { label: item, value: item } : item,
      );
    },
    selectedOption() {
      return this.options.find(({ value }) => value === this.value);
    },
    valueClass() {
      return {
        [`tc-select__value--type-${
          this.selectedOption === undefined ? 'placeholder' : 'label'
        }`]: true,
      };
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

  methods: {
    triggerFocus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-select {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  cursor: pointer;
  display: flex;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  position: relative;

  &.is-error {
    border-color: $tc-color--warning;
  }

  &.is-focused {
    border-color: $tc-color--studio;
  }
}

.tc-select--theme-dark {
  border-color: $tc-color--grey;

  .tc-select__icon,
  .tc-select__value--type-label {
    color: $tc-color--white;
  }
}

.tc-select--theme-light {
  border-color: $tc-color--grey-light-2;

  .tc-select__icon,
  .tc-select__value--type-label {
    color: $tc-color--black;
  }
}

.tc-select--width-narrow {
  padding-left: $tc-spacing--input-narrow - $tc-border-width--input;
  padding-right: $tc-spacing--input-narrow - $tc-border-width--input;

  .tc-select__icon {
    margin-left: $tc-spacing--input-narrow;
  }
}

.tc-select--width-wide {
  padding-left: $tc-spacing--input - $tc-border-width--input;
  padding-right: $tc-spacing--input - $tc-border-width--input;

  .tc-select__icon {
    margin-left: $tc-spacing--input;
  }
}

.tc-select__icon {
  flex-shrink: 0;
  margin-bottom: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
  margin-top: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
}

.tc-select__input {
  border: none;
  cursor: pointer;
  height: $tc-height--input;
  left: -$tc-border-width--input;
  opacity: 0;
  position: absolute;
  top: -$tc-border-width--input;
  width: calc(100% + #{$tc-border-width--input * 2});
}

.tc-select__input-container {
  display: flex;
  flex-grow: 1;
}

.tc-select__value {
  flex-grow: 1;
}

.tc-select__value--type-placeholder {
  color: $tc-color--grey;
}
</style>

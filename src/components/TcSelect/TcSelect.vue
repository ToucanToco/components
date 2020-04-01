<template>
  <div class="tc-select" :class="elementClass" :style="elementStyle" @click="triggerFocus()">
    <TcText class="tc-select__input-container">
      <select
        :id="id"
        ref="input"
        v-model="valueModel"
        class="tc-select__input"
        :placeholder="placeholder"
        @blur="blur()"
        @focus="focus()"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">{{
          option.label
        }}</option>
      </select>
    </TcText>
    <TcIcon v-if="hasIcon" class="tc-select__icon" :label="icon" small />
  </div>
</template>

<script>
import focusable from '../../mixins/focusable';
import themable from '../../mixins/themable';
import widthable from '../../mixins/widthable';
import TcIcon from '../TcIcon';
import TcText from '../TcText';

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
      default: undefined,
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
      type: String,
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
    elementStyle() {
      return {
        borderColor: this.error && !this.isFocused ? this.$tcComponents.colors.warning : undefined,
      };
    },
    hasIcon() {
      return this.icon !== undefined;
    },
    options() {
      if (this.items === undefined) {
        return [];
      }

      return this.items.map((item) =>
        typeof item === 'string' ? { label: item, value: item } : item,
      );
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
@import '../../variables';

.tc-select {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  cursor: pointer;
  display: flex;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;

  &.is-focused {
    border-color: $tc-color--studio;
  }
}

.tc-select--theme-dark {
  border-color: $tc-color--grey;

  .tc-select__icon,
  .tc-select__input {
    color: $tc-color--white;
  }
}

.tc-select--theme-light {
  border-color: $tc-color--grey-light-2;

  .tc-select__icon,
  .tc-select__input {
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
  background-color: transparent;
  border: none;
  cursor: pointer;
  flex-grow: 1;
  padding: 0;

  &::placeholder {
    color: $tc-color--grey;
  }
}

.tc-select__input-container {
  display: flex;
  flex-grow: 1;
}
</style>

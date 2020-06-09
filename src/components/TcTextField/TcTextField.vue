<template>
  <div class="tc-text-field" :class="elementClass" @click="triggerFocus()">
    <TcText class="tc-text-field__input-container">
      <input
        :id="id"
        ref="input"
        v-model="valueModel"
        class="tc-text-field__input"
        :placeholder="placeholder"
        @blur="blur($event)"
        @focus="focus($event)"
        @keydown="keydown($event)"
        @keypress="keypress($event)"
        @keyup="keyup($event)"
      />
    </TcText>
    <TcIcon v-if="hasIcon" class="tc-text-field__icon" :label="icon" small />
  </div>
</template>

<script>
import TcIcon from 'tc-components/components/TcIcon';
import TcText from 'tc-components/components/TcText';
import focusable from 'tc-components/mixins/focusable';
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import { FIELD_WIDTHS } from 'tc-components/variables';

export default {
  name: 'TcTextField',

  components: {
    TcIcon,
    TcText,
  },

  mixins: [tcComponent, focusable, getBooleansMixin('width', FIELD_WIDTHS)],

  props: {
    error: {
      default: false,
      type: Boolean,
    },
    id: {
      default() {
        return `tc-text-field--${this._uid}`;
      },
      type: String,
    },
    icon: {
      default: undefined,
      type: String,
    },
    placeholder: {
      default: undefined,
      type: String,
    },
    value: {
      default: undefined,
      type: [Array, String],
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-text-field--theme-${this.theme}`]: true,
        [`tc-text-field--width-${this.width}`]: true,
        'is-error': this.error,
        'is-focused': this.isFocused,
      };
    },
    hasIcon() {
      return this.icon !== undefined;
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
    keydown(e) {
      this.$emit('keydown', e);
    },
    keypress(e) {
      this.$emit('keypress', e);
    },
    keyup(e) {
      this.$emit('keyup', e);
    },
    triggerFocus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-text-field {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  cursor: text;
  display: flex;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;

  &.is-error {
    border-color: $tc-color--warning;
  }

  &.is-focused {
    border-color: $tc-color--studio;
  }
}

.tc-text-field--theme-dark {
  border-color: $tc-color--grey;

  .tc-text-field__icon,
  .tc-text-field__input {
    color: $tc-color--white;
  }
}

.tc-text-field--theme-light {
  border-color: $tc-color--grey-light-2;

  .tc-text-field__icon,
  .tc-text-field__input {
    color: $tc-color--black;
  }
}

.tc-text-field--width-narrow {
  padding-left: $tc-spacing--input-narrow - $tc-border-width--input;
  padding-right: $tc-spacing--input-narrow - $tc-border-width--input;

  .tc-text-field__icon {
    margin-left: $tc-spacing--input-narrow;
  }
}

.tc-text-field--width-wide {
  padding-left: $tc-spacing--input - $tc-border-width--input;
  padding-right: $tc-spacing--input - $tc-border-width--input;

  .tc-text-field__icon {
    margin-left: $tc-spacing--input;
  }
}

.tc-text-field__icon {
  flex-shrink: 0;
  margin-bottom: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
  margin-top: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
}

.tc-text-field__input {
  background-color: transparent;
  border: none;
  flex-grow: 1;
  max-width: 100%;
  outline: none;
  padding: 0;

  &::placeholder {
    color: $tc-color--grey;
  }
}

.tc-text-field__input-container {
  display: flex;
  flex-grow: 1;
  max-width: 100%;
}
</style>

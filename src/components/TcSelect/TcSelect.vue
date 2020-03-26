<template>
  <div class="tc-select" :class="elementClass">
    <div v-if="hasHeader" class="tc-select__header">
      <label v-if="hasLabel" class="tc-select__label" :for="id">
        <TcText uppercase x-small>{{ label }}</TcText>
      </label>
      <div v-if="hasHint" class="tc-select__hint" @click="triggerFocus()">
        <TcText xx-small>{{ hint }}</TcText>
      </div>
    </div>
    <div class="tc-select__body" :style="bodyStyle" @click="triggerFocus()">
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
    <div v-if="hasMessages" class="tc-select__messages">
      <div
        v-for="(message, messageIndex) in computedMessages"
        :key="messageIndex"
        class="tc-select__message"
        :class="message.elementClass"
        :style="message.elementStyle"
      >
        <TcText x-small>{{ message.text }}</TcText>
      </div>
    </div>
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
    errorMessages: {
      default: undefined,
      type: [Array, String],
    },
    hint: {
      default: undefined,
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
    label: {
      default: undefined,
      type: String,
    },
    messages: {
      default: undefined,
      type: [Array, String],
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
    bodyStyle() {
      return {
        borderColor:
          this.hasError && !this.isFocused ? this.$tcComponents.colors.warning : undefined,
      };
    },
    computedMessages() {
      let computedMessages = [];

      if (this.errorMessages !== undefined) {
        computedMessages = Array.isArray(this.errorMessages)
          ? this.errorMessages.map((message) => ({
              elementClass: 'tc-select__message--type-error',
              elementStyle: this.errorMessageStyle,
              text: message,
            }))
          : [
              {
                elementClass: 'tc-select__message--type-error',
                elementStyle: this.errorMessageStyle,
                text: this.errorMessages,
              },
            ];
      }
      if (this.messages !== undefined) {
        computedMessages = [
          ...computedMessages,
          ...(Array.isArray(this.messages)
            ? this.messages.map((message) => ({
                elementClass: 'tc-select__message--type-info',
                text: message,
              }))
            : [
                {
                  elementClass: 'tc-select__message--type-info',
                  text: this.messages,
                },
              ]),
        ];
      }

      return computedMessages;
    },
    elementClass() {
      return {
        [`tc-select--theme-${this.theme}`]: true,
        [`tc-select--width-${this.width}`]: true,
        'is-error': this.hasError,
        'is-focused': this.isFocused,
      };
    },
    errorMessageStyle() {
      return {
        color: this.$tcComponents.colors.warning,
      };
    },
    hasError() {
      return this.error || this.errorMessages !== undefined;
    },
    hasHeader() {
      return this.hasLabel || this.hasHint;
    },
    hasHint() {
      return this.hint !== undefined;
    },
    hasIcon() {
      return this.icon !== undefined;
    },
    hasLabel() {
      return this.label !== undefined;
    },
    hasMessages() {
      return this.computedMessages.length > 0;
    },
    id() {
      return `tc-select--${this._uid}`;
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
  display: flex;
  flex-direction: column;

  &.is-focused {
    .tc-select__body {
      border-color: $tc-color--studio;
    }

    .tc-select__label {
      color: $tc-color--studio;
    }
  }
}

.tc-select--theme-dark {
  .tc-select__body {
    border-color: $tc-color--grey;
  }

  .tc-select__icon,
  .tc-select__input,
  .tc-select__label,
  .tc-select__message--type-info {
    color: $tc-color--white;
  }
}

.tc-select--theme-light {
  .tc-select__body {
    border-color: $tc-color--grey-light-2;
  }

  .tc-select__icon,
  .tc-select__input,
  .tc-select__label,
  .tc-select__message--type-info {
    color: $tc-color--black;
  }
}

.tc-select--width-narrow {
  .tc-select__body {
    padding-left: $tc-spacing--input-narrow - $tc-border-width--input;
    padding-right: $tc-spacing--input-narrow - $tc-border-width--input;
  }

  .tc-select__icon {
    margin-left: $tc-spacing--input-narrow;
  }
}

.tc-select--width-wide {
  .tc-select__body {
    padding-left: $tc-spacing--input - $tc-border-width--input;
    padding-right: $tc-spacing--input - $tc-border-width--input;
  }

  .tc-select__icon {
    margin-left: $tc-spacing--input;
  }
}

.tc-select__body {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  cursor: pointer;
  display: flex;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
}

.tc-select__header {
  align-items: baseline;
  display: flex;
  margin-bottom: $tc-spacing--label;
}

.tc-select__hint {
  color: $tc-color--grey;
  cursor: pointer;
  display: flex;
  margin-left: $tc-spacing--label;
}

.tc-select__hint:first-child {
  margin-left: 0;
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

.tc-select__label {
  cursor: pointer;
  display: flex;
}

.tc-select__message {
  display: flex;
  margin-top: $tc-spacing--message;
}

.tc-select__messages {
  display: flex;
  flex-direction: column;
}
</style>

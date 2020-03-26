<template>
  <div class="tc-text-field" :class="elementClass">
    <div v-if="hasHeader" class="tc-text-field__header">
      <label v-if="hasLabel" class="tc-text-field__label" :for="id">
        <TcText uppercase x-small>{{ label }}</TcText>
      </label>
      <div v-if="hasHint" class="tc-text-field__hint" @click="triggerFocus()">
        <TcText xx-small>{{ hint }}</TcText>
      </div>
    </div>
    <div class="tc-text-field__body" :style="bodyStyle" @click="triggerFocus()">
      <TcText class="tc-text-field__input-container">
        <input
          :id="id"
          ref="input"
          v-model="valueModel"
          class="tc-text-field__input"
          :placeholder="placeholder"
          @blur="blur()"
          @focus="focus()"
        />
      </TcText>
      <TcIcon v-if="hasIcon" class="tc-text-field__icon" :label="icon" small />
    </div>
    <div v-if="hasMessages" class="tc-text-field__messages">
      <div
        v-for="(message, messageIndex) in computedMessages"
        :key="messageIndex"
        class="tc-text-field__message"
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
  name: 'TcTextField',

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
      type: [Array, String],
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
              elementClass: 'tc-text-field__message--type-error',
              elementStyle: this.errorMessageStyle,
              text: message,
            }))
          : [
              {
                elementClass: 'tc-text-field__message--type-error',
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
                elementClass: 'tc-text-field__message--type-info',
                text: message,
              }))
            : [
                {
                  elementClass: 'tc-text-field__message--type-info',
                  text: this.messages,
                },
              ]),
        ];
      }

      return computedMessages;
    },
    elementClass() {
      return {
        [`tc-text-field--theme-${this.theme}`]: true,
        [`tc-text-field--width-${this.width}`]: true,
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
      return `tc-text-field--${this._uid}`;
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

.tc-text-field {
  display: flex;
  flex-direction: column;

  &.is-focused {
    .tc-text-field__body {
      border-color: $tc-color--studio;
    }

    .tc-text-field__label {
      color: $tc-color--studio;
    }
  }
}

.tc-text-field--theme-dark {
  .tc-text-field__body {
    border-color: $tc-color--grey;
  }

  .tc-text-field__icon,
  .tc-text-field__input,
  .tc-text-field__label,
  .tc-text-field__message--type-info {
    color: $tc-color--white;
  }
}

.tc-text-field--theme-light {
  .tc-text-field__body {
    border-color: $tc-color--grey-light-2;
  }

  .tc-text-field__icon,
  .tc-text-field__input,
  .tc-text-field__label,
  .tc-text-field__message--type-info {
    color: $tc-color--black;
  }
}

.tc-text-field--width-narrow {
  .tc-text-field__body {
    padding-left: $tc-spacing--input-narrow - $tc-border-width--input;
    padding-right: $tc-spacing--input-narrow - $tc-border-width--input;
  }

  .tc-text-field__icon {
    margin-left: $tc-spacing--input-narrow;
  }
}

.tc-text-field--width-wide {
  .tc-text-field__body {
    padding-left: $tc-spacing--input - $tc-border-width--input;
    padding-right: $tc-spacing--input - $tc-border-width--input;
  }

  .tc-text-field__icon {
    margin-left: $tc-spacing--input;
  }
}

.tc-text-field__body {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  cursor: text;
  display: flex;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
}

.tc-text-field__header {
  align-items: baseline;
  display: flex;
  margin-bottom: $tc-spacing--label;
}

.tc-text-field__hint {
  color: $tc-color--grey;
  cursor: pointer;
  display: flex;
  margin-left: $tc-spacing--label;
}

.tc-text-field__hint:first-child {
  margin-left: 0;
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
  padding: 0;

  &::placeholder {
    color: $tc-color--grey;
  }
}

.tc-text-field__input-container {
  display: flex;
  flex-grow: 1;
}

.tc-text-field__label {
  cursor: pointer;
  display: flex;
}

.tc-text-field__message {
  display: flex;
  margin-top: $tc-spacing--message;
}

.tc-text-field__messages {
  display: flex;
  flex-direction: column;
}
</style>

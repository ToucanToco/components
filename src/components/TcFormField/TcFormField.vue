<template>
  <div class="tc-form-field" :class="elementClass">
    <div v-if="hasHeader" class="tc-form-field__header">
      <label v-if="hasLabel" class="tc-form-field__label" :for="id">
        <TcText uppercase x-small>{{ label }}</TcText>
      </label>
      <div v-if="hasHint" class="tc-form-field__hint" @click="triggerFocus()">
        <TcText xx-small>{{ hint }}</TcText>
      </div>
    </div>
    <Component
      :is="inputIs"
      :id="id"
      ref="input"
      v-model="valueModel"
      v-bind="mixinsProps"
      class="tc-form-field__input"
      :error="hasError"
      :items="items"
      :label="inlineLabel"
      :off-label="offLabel"
      :placeholder="placeholder"
      @blur="blur()"
      @focus="focus()"
    >
      <slot />
    </Component>
    <div v-if="hasMessages" class="tc-form-field__messages">
      <div
        v-for="(message, messageIndex) in computedMessages"
        :key="messageIndex"
        class="tc-form-field__message"
        :class="message.elementClass"
      >
        <TcText x-small>{{ message.text }}</TcText>
      </div>
    </div>
  </div>
</template>

<script>
import focusable from 'tc-components/mixins/focusable';
import themable from 'tc-components/mixins/themable';
import widthable from 'tc-components/mixins/widthable';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import { FORM_FIELD_TYPES, THEMES, WIDTHS } from 'tc-components/variables';
import TcCheckbox from 'tc-components/components/TcCheckbox';
import TcRadioGroup from 'tc-components/components/TcRadioGroup';
import TcSelect from 'tc-components/components/TcSelect';
import TcSwitch from 'tc-components/components/TcSwitch';
import TcText from 'tc-components/components/TcText';
import TcTextField from 'tc-components/components/TcTextField';

export default {
  name: 'TcFormField',

  components: {
    TcText,
  },

  mixins: [getBooleansMixin('type', FORM_FIELD_TYPES), focusable, themable, widthable],

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
    id: {
      default() {
        return `tc-form-field--${this._uid}`;
      },
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
    offLabel: {
      default: undefined,
      type: String,
    },
    placeholder: {
      default: undefined,
      type: String,
    },
    value: {
      default: undefined,
      type: [Array, Boolean, Number, String],
    },
  },

  computed: {
    computedMessages() {
      let computedMessages = [];

      if (this.errorMessages !== undefined) {
        computedMessages = (Array.isArray(this.errorMessages)
          ? this.errorMessages
          : [this.errorMessages]
        ).map((message) => ({
          elementClass: 'tc-form-field__message--type-error',
          text: message,
        }));
      }
      if (this.messages !== undefined) {
        computedMessages = [
          ...computedMessages,
          ...(Array.isArray(this.messages) ? this.messages : [this.messages]).map((message) => ({
            elementClass: 'tc-form-field__message--type-info',
            text: message,
          })),
        ];
      }

      return computedMessages;
    },
    elementClass() {
      return {
        [`tc-form-field--theme-${this.theme}`]: true,
        [`tc-form-field--width-${this.width}`]: true,
        'is-error': this.hasError,
        'is-focused': this.isFocused,
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
    hasLabel() {
      return !this.isLabelInline && this.label !== undefined;
    },
    hasMessages() {
      return this.computedMessages.length > 0;
    },
    inlineLabel() {
      return this.isLabelInline ? this.label : undefined;
    },
    inputIs() {
      if (typeof this.type !== 'string') {
        return this.type;
      }
      switch (this.type) {
        case FORM_FIELD_TYPES.CHECKBOX:
          return TcCheckbox;
        case FORM_FIELD_TYPES.RADIO_GROUP:
          return TcRadioGroup;
        case FORM_FIELD_TYPES.SELECT:
          return TcSelect;
        case FORM_FIELD_TYPES.SWITCH:
          return TcSwitch;
        case FORM_FIELD_TYPES.TEXT:
          return TcTextField;
        default:
          return TcTextField;
      }
    },
    isLabelInline() {
      return [FORM_FIELD_TYPES.CHECKBOX, FORM_FIELD_TYPES.SWITCH].includes(this.type);
    },
    mixinsProps() {
      return {
        ...this.getMixinProps(THEMES),
        ...this.getMixinProps(WIDTHS),
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
    getMixinProps(valuesConst) {
      return Object.fromEntries(
        Object.values(valuesConst)
          .slice(1)
          .map((propKey) => [propKey, this[propKey]]),
      );
    },
    triggerFocus() {
      this.$refs.input.triggerFocus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-form-field {
  display: flex;
  flex-direction: column;

  &.is-focused {
    .tc-form-field__label {
      color: $tc-color--studio;
    }
  }
}

.tc-form-field--theme-dark {
  .tc-form-field__label,
  .tc-form-field__message--type-info {
    color: $tc-color--white;
  }
}

.tc-form-field--theme-light {
  .tc-form-field__label,
  .tc-form-field__message--type-info {
    color: $tc-color--black;
  }
}

.tc-form-field__header {
  align-items: baseline;
  display: flex;
  margin-bottom: $tc-spacing--label;
}

.tc-form-field__hint {
  color: $tc-color--grey;
  cursor: pointer;
  display: flex;
  margin-left: $tc-spacing--label;
}

.tc-form-field__hint:first-child {
  margin-left: 0;
}

.tc-form-field__label {
  cursor: pointer;
  display: flex;
}

.tc-form-field__message {
  display: flex;
  margin-top: $tc-spacing--message;
}

.tc-form-field__message--type-error {
  color: $tc-color--warning;
}

.tc-form-field__messages {
  display: flex;
  flex-direction: column;
}
</style>

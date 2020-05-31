<template>
  <TcText class="tc-select" :class="elementClass">
    <VueMultiselect
      ref="multiselect"
      group-label="label"
      :group-values="groupValue"
      :id="id"
      label="label"
      :options="groups"
      placeholder=""
      :show-no-results="false"
      v-model="selectedOptionModel"
    >
      <template #caret>
        <div class="tc-select__container">
          <TcText class="tc-select__value" :class="valueClass">{{ label }}</TcText>
          <TcIcon class="tc-select__icon" :label="icon" small />
        </div>
      </template>
      <template #option="{ option }">
        <TcText :bold="option.$isLabel" class="tc-select__option">{{
          option.$isLabel ? option.$groupLabel : option.label
        }}</TcText>
      </template>
    </VueMultiselect>
  </TcText>
</template>

<script>
import VueMultiselect from 'vue-multiselect';

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
    VueMultiselect,
  },

  mixins: [focusable, themable, widthable],

  props: {
    error: {
      default: false,
      type: Boolean,
    },
    groupLabel: {
      default: undefined,
      type: String,
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
    itemLabel: {
      default: undefined,
      type: String,
    },
    itemValue: {
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
    groups() {
      if (this.groupLabel === undefined) {
        return this.options;
      }

      return this.options.reduce((groups, { groupLabel, label, value }) => {
        if (groups[groupLabel] === undefined) {
          groups[groupLabel] = groups.length;
          groups.push({
            label: groupLabel,
            value: [{ label, value }],
          });
        } else {
          groups[groups[groupLabel]].value.push({ label, value });
        }

        return groups;
      }, []);
    },
    groupValue() {
      return this.groupLabel === undefined ? undefined : 'value';
    },
    label() {
      return this.selectedOptionModel === undefined
        ? this.placeholder
        : this.selectedOptionModel.label;
    },
    options() {
      if (this.items === undefined) {
        return [];
      }

      const valueSelector =
        this.itemValue === undefined ? (item) => item : (item) => item[this.itemValue];
      const labelSelector =
        this.itemLabel === undefined ? valueSelector : (item) => item[this.itemLabel];
      const groupLabelSelector =
        this.groupLabel === undefined ? () => undefined : (item) => item[this.groupLabel];

      return this.items.map((item) => ({
        groupLabel: groupLabelSelector(item),
        label: labelSelector(item),
        value: valueSelector(item),
      }));
    },
    selectedOptionModel: {
      get() {
        return this.options.find(({ value }) => value === this.value);
      },
      set(option) {
        this.$emit('input', option.value);
      },
    },
    valueClass() {
      return {
        [`tc-select__value--type-${
          this.selectedOptionModel === undefined ? 'placeholder' : 'label'
        }`]: true,
      };
    },
  },

  methods: {
    triggerFocus() {
      this.$refs.input.focus();
    },
  },

  mounted() {
    this.contentWrapper = this.$refs.multiselect.$el.querySelector('.multiselect__content-wrapper');
    this.input = this.$refs.multiselect.$el.querySelector('.multiselect__input');

    this.contentWrapper.insertBefore(this.input, this.contentWrapper.firstChild);
    this.inputBlurListener = () => this.blur();
    this.inputFocusListener = () => this.focus();

    this.input.addEventListener('blur', this.inputBlurListener);
    this.input.addEventListener('focus', this.inputFocusListener);
  },

  beforeDestroy() {
    this.input.removeEventListener('blur', this.inputBlurListener);
    this.input.removeEventListener('focus', this.inputFocusListener);
    this.contentWrapper.removeChild(this.input);
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-select {
  display: flex;
  flex-direction: column;
  position: relative;

  &.is-error {
    .tc-select__container {
      border-color: $tc-color--warning;
    }
  }

  &.is-focused {
    .tc-select__container {
      border-color: $tc-color--studio;
    }
  }
}

.tc-select--theme-dark {
  .tc-select__container {
    border-color: $tc-color--grey;
  }

  .tc-select__icon,
  .tc-select__option,
  .tc-select__value--type-label,
  /deep/ .multiselect__input {
    color: $tc-color--white;
  }

  /deep/ .multiselect__content-wrapper {
    background-color: $tc-color--black;
    box-shadow: inset 0 0 0 $tc-border-width--input $tc-color--grey;
  }
}

.tc-select--theme-light {
  .tc-select__container {
    border-color: $tc-color--grey-light-2;
  }

  .tc-select__icon,
  .tc-select__option,
  .tc-select__value--type-label,
  /deep/ .multiselect__input {
    color: $tc-color--black;
  }

  .multiselect__option--highlight .tc-select__option {
    color: $tc-color--white;
  }

  /deep/ .multiselect__content-wrapper {
    background-color: $tc-color--white;
    box-shadow: inset 0 0 0 $tc-border-width--input $tc-color--grey-light-2;
  }
}

.tc-select--width-narrow {
  .tc-select__container {
    padding-left: $tc-spacing--input-narrow - $tc-border-width--input;
    padding-right: $tc-spacing--input-narrow - $tc-border-width--input;
  }

  .tc-select__icon {
    margin-left: $tc-spacing--input-narrow;
  }

  /deep/ .multiselect--active .multiselect__input,
  /deep/ .multiselect__option {
    padding-left: $tc-spacing--input-narrow;
    padding-right: $tc-spacing--input-narrow;
  }
}

.tc-select--width-wide {
  .tc-select__container {
    padding-left: $tc-spacing--input - $tc-border-width--input;
    padding-right: $tc-spacing--input - $tc-border-width--input;
  }

  .tc-select__icon {
    margin-left: $tc-spacing--input;
  }

  /deep/ .multiselect--active .multiselect__input,
  /deep/ .multiselect__option {
    padding-left: $tc-spacing--input;
    padding-right: $tc-spacing--input;
  }
}

.tc-select__container {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  cursor: pointer;
  display: flex;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
}

.tc-select__icon {
  flex-shrink: 0;
  margin-bottom: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
  margin-top: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
}

.tc-select__value {
  flex-grow: 1;
}

.tc-select__value--type-placeholder {
  color: $tc-color--grey;
}

/deep/ .multiselect {
  display: flex;
  flex-direction: column;
}

/deep/ .multiselect--above.multiselect--active .multiselect__content-wrapper {
  bottom: 100%;
  top: auto;
}

/deep/ .multiselect--active .multiselect__content {
  // Overwrite inline style
  display: flex !important;
}

/deep/ .multiselect--active .multiselect__content-wrapper {
  top: 100%;
}

/deep/ .multiselect--active .multiselect__input {
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5;
}

/deep/ .multiselect__content {
  // Overwrite inline style
  display: none !important;
  flex-direction: column;
  margin-bottom: 0;
  margin-top: 0;
  overflow: auto;
  padding-left: 0;
}

/deep/ .multiselect__content-wrapper {
  // Overwrite inline style
  display: flex !important;
  flex-direction: column;
  position: absolute;
  top: 0;
  width: 100%;
}

/deep/ .multiselect__element {
  list-style: none;
}

/deep/ .multiselect__input {
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  visibility: visible;
}

/deep/ .multiselect__option {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding-bottom: ($tc-height--button-small - $tc-font-size--medium) * 0.5;
  padding-top: ($tc-height--button-small - $tc-font-size--medium) * 0.5;
}

/deep/ .multiselect__option--disabled {
  cursor: initial;
}

/deep/ .multiselect__option--highlight {
  background-color: $tc-color--studio;
}

/deep/ .multiselect__tags {
  display: none;
}
</style>

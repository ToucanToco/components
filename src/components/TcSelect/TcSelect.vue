<template>
  <TcClickable
    class="tc-select"
    :class="elementClass"
    :id="id"
    @blur.native="blur($event)"
    @click.prevent="toggle()"
    @focus.native="focus($event)"
    @keydown.native.down.prevent="selectNext()"
    @keydown.native.up.prevent="selectPrev()"
    @mousedown.native.prevent="focus($event)"
  >
    <TcText
      :bold="outlined || underlined"
      class="tc-select__value"
      :class="valueClass"
      :uppercase="outlined || underlined"
      >{{ label }}</TcText
    >
    <TcIcon class="tc-select__icon" :label="icon" />
    <TcPopover
      bottom
      class="tc-select__popover"
      :container="container"
      justify
      :no-position="isMobile"
      :value="active"
      @click.native.self.prevent="deactivate()"
    >
      <div class="tc-select__container" :class="containerClass" @mousedown.prevent>
        <TcTextField
          v-model="query"
          class="tc-select__input"
          icon="search"
          narrow
          :primary="outlined || underlined"
          ref="input"
          @blur="deactivate($event)"
          @focus="focus($event)"
          @keydown.down.prevent="highlightNext()"
          @keydown.tab.prevent="deactivate()"
          @keydown.up.prevent="highlightPrev()"
          @keypress.enter.prevent.stop="selectHighlighted()"
          @keypress.space="deactivateIfEmpty($event)"
          @keyup.esc="deactivate()"
        />
        <div class="tc-select__options">
          <template v-for="(option, index) in filteredOptions">
            <div v-if="option.isGroup" class="tc-select__group" :key="index">
              <TcText bold :small="outlined" :uppercase="outlined || underlined">{{
                option.label
              }}</TcText>
            </div>
            <div
              v-else
              class="tc-select__option"
              :class="getOptionClass(index, option)"
              :key="index"
              @click.prevent="select(option)"
              @mouseenter="highlight(index)"
            >
              <TcText
                class="tc-select__label"
                :small="outlined || underlined"
                :uppercase="outlined || underlined"
                >{{ option.label }}</TcText
              >
            </div>
          </template>
        </div>
      </div>
    </TcPopover>
  </TcClickable>
</template>

<script>
import TcClickable from 'tc-components/components/TcClickable';
import TcIcon from 'tc-components/components/TcIcon';
import TcPopover from 'tc-components/components/TcPopover';
import TcText from 'tc-components/components/TcText';
import TcTextField from 'tc-components/components/TcTextField';
import focusable from 'tc-components/mixins/focusable';
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import getSelector from 'tc-components/utils/getSelector';
import isMobile from 'tc-components/utils/isMobile';
import normalize from 'tc-components/utils/normalize';
import { FIELD_WIDTHS } from 'tc-components/variables';

export const TC_SELECT_COLORS = {
  DEFAULT: 'default',

  REVERSED: 'reversed',
};

export const TC_SELECT_SIZES = {
  DEFAULT: 'medium',

  LARGE: 'large',
};

export const TC_SELECT_TYPES = {
  DEFAULT: 'input',

  OUTLINED: 'outlined',
  UNDERLINED: 'underlined',
};

export default {
  name: 'TcSelect',

  components: {
    TcClickable,
    TcIcon,
    TcPopover,
    TcText,
    TcTextField,
  },

  mixins: [
    tcComponent,
    focusable,
    getBooleansMixin('color', TC_SELECT_COLORS),
    getBooleansMixin('size', TC_SELECT_SIZES),
    getBooleansMixin('type', TC_SELECT_TYPES),
    getBooleansMixin('width', FIELD_WIDTHS),
  ],

  props: {
    container: {
      default: undefined,
      type: [HTMLElement, String],
    },
    error: {
      default: false,
      type: Boolean,
    },
    groupLabel: {
      default: undefined,
      type: [Function, String],
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
      type: [Function, String],
    },
    itemValue: {
      default: undefined,
      type: [Function, String],
    },
    items: {
      default() {
        return [];
      },
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

  data() {
    return {
      active: false,
      highlightedIndex: 0,
      query: '',
    };
  },

  computed: {
    containerClass() {
      return [
        `tc-select__container--color-${this.color}`,
        `tc-select__container--size-${this.size}`,
        `tc-select__container--theme-${this.theme}`,
        `tc-select__container--type-${this.type}`,
        `tc-select__container--width-${this.width}`,
      ];
    },
    elementClass() {
      return {
        [`tc-select--color-${this.color}`]: true,
        [`tc-select--size-${this.size}`]: true,
        [`tc-select--theme-${this.theme}`]: true,
        [`tc-select--type-${this.type}`]: true,
        [`tc-select--width-${this.width}`]: true,
        'is-active': this.active,
        'is-error': this.error,
        'is-focused': this.isFocused,
      };
    },
    filteredOptions() {
      const normalizedQuery = normalize(this.query);

      return (normalizedQuery === ''
        ? this.options
        : this.options.filter(({ normalizedLabel }) => normalizedLabel.includes(normalizedQuery))
      )
        .slice(0, 1000)
        .reduce((filteredOptions, option) => {
          if (option.groupLabel !== undefined && !filteredOptions[option.groupLabel]) {
            filteredOptions.push({
              isGroup: true,
              label: option.groupLabel,
            });

            filteredOptions[option.groupLabel] = true;
          }
          filteredOptions.push(option);

          return filteredOptions;
        }, []);
    },
    isMobile() {
      return isMobile();
    },
    label() {
      return this.selectedOption === undefined ? this.placeholder : this.selectedOption.label;
    },
    options() {
      const groupLabelSelector =
        this.groupLabel === undefined ? () => undefined : getSelector(this.groupLabel);
      const valueSelector = getSelector(this.itemValue);
      const labelSelector =
        this.itemLabel === undefined ? valueSelector : getSelector(this.itemLabel);

      return this.items.map((item) => {
        const label = labelSelector(item);

        return {
          groupLabel: groupLabelSelector(item),
          label,
          normalizedLabel: normalize(label),
          value: valueSelector(item),
        };
      });
    },
    selectedIndex() {
      return this.options.findIndex(({ value }) => value === this.value);
    },
    selectedOption() {
      return this.options.find(({ value }) => value === this.value);
    },
    valueClass() {
      return `tc-select__value--type-${
        this.selectedOption === undefined ? 'placeholder' : 'label'
      }`;
    },
  },

  watch: {
    filteredOptions: {
      handler(filteredOptions) {
        const highlightedOption = filteredOptions[this.highlightedIndex];

        if (highlightedOption === undefined) {
          this.highlightedIndex = Math.max(0, filteredOptions.length - 1);
        } else if (highlightedOption.isGroup) {
          this.highlightedIndex = this.highlightedIndex + 1;
        }
      },
      immediate: true,
    },
  },

  methods: {
    async activate() {
      if (this.active) {
        return;
      }

      this.active = true;

      if (!this.isMobile) {
        await this.$nextTick();
        this.$refs.input.triggerFocus();
      }
    },
    deactivate(e) {
      if (!this.active) {
        return;
      }

      this.active = false;
      this.query = '';

      this.highlight(this.filteredOptions.length > 0 && this.filteredOptions[0].isGroup ? 1 : 0);

      if (e === undefined) {
        this.$el.focus();
      } else {
        this.blur(e);
      }
    },
    deactivateIfEmpty(e) {
      if (this.query === '') {
        e.preventDefault();
        e.stopPropagation();
        this.deactivate();
      }
    },
    getOptionClass(index, option) {
      return {
        'is-highlighted': index === this.highlightedIndex,
        'is-selected': option === this.selectedOption,
      };
    },
    highlight(index) {
      this.highlightedIndex = index;
    },
    highlightNext() {
      if (this.highlightedIndex < this.filteredOptions.length - 1) {
        this.highlightedIndex =
          this.highlightedIndex + (this.filteredOptions[this.highlightedIndex + 1].isGroup ? 2 : 1);
      }
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        if (this.filteredOptions[this.highlightedIndex - 1].isGroup) {
          if (this.highlightedIndex > 1) {
            this.highlightedIndex = this.highlightedIndex - 2;
          }
        } else {
          this.highlightedIndex = this.highlightedIndex - 1;
        }
      }
    },
    select(option) {
      this.$emit('input', option.value);
      this.deactivate();
    },
    selectNext() {
      if (this.selectedIndex < this.options.length - 1) {
        this.select(this.options[this.selectedIndex + 1]);
      }
    },
    selectPrev() {
      if (this.selectedIndex > 0) {
        this.select(this.options[this.selectedIndex - 1]);
      }
    },
    selectHighlighted() {
      this.select(this.filteredOptions[this.highlightedIndex]);
    },
    toggle() {
      this.active ? this.deactivate() : this.activate();
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-popover--position-bottom {
  position: absolute;
}

.tc-popover--position-bottom .tc-select__container {
  max-height: 30vh;
}

.tc-popover--position-bottom .tc-select__container--theme-dark {
  box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey,
    inset $tc-border-width--input (-$tc-border-width--input) 0 0 $tc-color--grey,
    $tc-box-shadow--select-below;
}

.tc-popover--position-bottom .tc-select__container--theme-light {
  box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey-light-2,
    inset $tc-border-width--input (-$tc-border-width--input) 0 0 $tc-color--grey-light-2,
    $tc-box-shadow--select-below;
}

.tc-popover--position-none {
  background-color: rgba($tc-color--black, $tc-opacity--overlay);
  height: 100%;
  padding: $tc-spacing--container;
  position: fixed;
  width: 100%;
}

.tc-popover--position-none .tc-select__container {
  box-shadow: $tc-box-shadow--select-below;
  max-height: 100%;
}

.tc-popover--position-top {
  position: absolute;
}

.tc-popover--position-top .tc-select__container {
  max-height: 30vh;
}

.tc-popover--position-top .tc-select__container--theme-dark.tc-select__container--type-input,
.tc-popover--position-top .tc-select__container--theme-dark.tc-select__container--type-outlined {
  box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey,
    inset $tc-border-width--input $tc-border-width--input 0 0 $tc-color--grey,
    $tc-box-shadow--select-above;
}

.tc-popover--position-top .tc-select__container--theme-dark.tc-select__container--type-underlined {
  box-shadow: inset 0 0 0 $tc-border-width--input $tc-color--grey, $tc-box-shadow--select-above;
}

.tc-popover--position-top .tc-select__container--theme-light.tc-select__container--type-input,
.tc-popover--position-top .tc-select__container--theme-light.tc-select__container--type-outlined {
  box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey-light-2,
    inset $tc-border-width--input $tc-border-width--input 0 0 $tc-color--grey-light-2,
    $tc-box-shadow--select-above;
}

.tc-popover--position-top .tc-select__container--theme-light.tc-select__container--type-underlined {
  box-shadow: inset 0 0 0 $tc-border-width--input $tc-color--grey-light-2,
    $tc-box-shadow--select-above;
}

.tc-select {
  align-items: center;
  border-style: solid;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  outline: none;
}

.tc-select.is-active .tc-icon--label-expand {
  transform: rotate(180deg);
}

.tc-select.is-error {
  border-color: $tc-color--warning;
}

.tc-select--color-default.tc-select--theme-dark.tc-select--type-outlined,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-outlined {
  border-color: $tc-color--white;
}

.tc-select--color-default.tc-select--theme-dark.tc-select--type-outlined.is-focused,
.tc-select--color-default.tc-select--theme-dark.tc-select--type-underlined.is-focused,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-outlined.is-focused,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-underlined.is-focused {
  border-color: $tc-color--emphasis;
}

.tc-select--color-default.tc-select--theme-dark.tc-select--type-outlined .tc-select__icon,
.tc-select--color-default.tc-select--theme-dark.tc-select--type-outlined .tc-select__value,
.tc-select--color-default.tc-select--theme-dark.tc-select--type-underlined .tc-select__icon,
.tc-select--color-default.tc-select--theme-dark.tc-select--type-underlined
  .tc-select__value--type-label,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-outlined .tc-select__icon,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-outlined .tc-select__value,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-underlined .tc-select__icon,
.tc-select--color-reversed.tc-select--theme-light.tc-select--type-underlined
  .tc-select__value--type-label {
  color: $tc-color--white;
}

.tc-select--color-default.tc-select--theme-light.tc-select--type-outlined,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-outlined {
  border-color: $tc-color--black;
}

.tc-select--color-default.tc-select--theme-light.tc-select--type-outlined.is-focused,
.tc-select--color-default.tc-select--theme-light.tc-select--type-underlined.is-focused,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-outlined.is-focused,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-underlined.is-focused {
  border-color: $tc-color--emphasis;
}

.tc-select--color-default.tc-select--theme-light.tc-select--type-outlined .tc-select__icon,
.tc-select--color-default.tc-select--theme-light.tc-select--type-outlined .tc-select__value,
.tc-select--color-default.tc-select--theme-light.tc-select--type-underlined .tc-select__icon,
.tc-select--color-default.tc-select--theme-light.tc-select--type-underlined
  .tc-select__value--type-label,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-outlined .tc-select__icon,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-outlined .tc-select__value,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-underlined .tc-select__icon,
.tc-select--color-reversed.tc-select--theme-dark.tc-select--type-underlined
  .tc-select__value--type-label {
  color: $tc-color--black;
}

.tc-select--size-large.tc-select--type-outlined {
  padding-bottom: ($tc-height--button-large - $tc-font-size--medium) * 0.5 -
    $tc-border-width--button;
  padding-top: ($tc-height--button-large - $tc-font-size--medium) * 0.5 - $tc-border-width--button;
}

.tc-select--size-medium.tc-select--type-outlined {
  padding-bottom: ($tc-height--button-small - $tc-font-size--medium) * 0.5 -
    $tc-border-width--button;
  padding-top: ($tc-height--button-small - $tc-font-size--medium) * 0.5 - $tc-border-width--button;
}

.tc-select--theme-dark.tc-select--type-input,
.tc-select--theme-dark.tc-select--type-underlined {
  border-color: $tc-color--grey;
}

.tc-select--theme-dark.tc-select--type-input .tc-select__icon,
.tc-select--theme-dark.tc-select--type-input .tc-select__value--type-label {
  color: $tc-color--white;
}

.tc-select--theme-light.tc-select--type-input,
.tc-select--theme-light.tc-select--type-underlined {
  border-color: $tc-color--grey-light-2;
}

.tc-select--theme-light.tc-select--type-input .tc-select__icon,
.tc-select--theme-light.tc-select--type-input .tc-select__value--type-label {
  color: $tc-color--black;
}

.tc-select--type-input {
  border-width: $tc-border-width--input;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
}

.tc-select--type-input.is-focused {
  border-color: $tc-color--studio;
}

.tc-select--type-input.tc-select--width-narrow {
  padding-left: $tc-spacing--input-narrow - $tc-border-width--input;
  padding-right: $tc-spacing--input-narrow - $tc-border-width--input;
}

.tc-select--type-input.tc-select--width-narrow .tc-select__icon {
  margin-left: $tc-spacing--input-narrow;
}

.tc-select--type-input.tc-select--width-wide {
  padding-left: $tc-spacing--input - $tc-border-width--input;
  padding-right: $tc-spacing--input - $tc-border-width--input;
}

.tc-select--type-input.tc-select--width-wide .tc-select__icon {
  margin-left: $tc-spacing--input;
}

.tc-select--type-input .tc-select__value--type-placeholder {
  color: $tc-color--grey;
}

.tc-select--type-outlined {
  border-width: $tc-border-width--button;
  padding-left: $tc-spacing--button - $tc-border-width--button;
  padding-right: $tc-spacing--button - $tc-border-width--button;
}

.tc-select--type-outlined .tc-select__icon {
  margin-left: $tc-spacing--button;
}

.tc-select--type-underlined {
  border-width: 0 0 $tc-border-width--underline;
  padding: ($tc-height--button-small - $tc-font-size--medium) * 0.5 $tc-spacing--button -
    $tc-border-width--button ($tc-height--button-small - $tc-font-size--medium) * 0.5 -
    $tc-border-width--underline;
}

.tc-select--type-underlined .tc-select__icon {
  margin-left: $tc-spacing--button;
}

.tc-select--type-underlined .tc-select__value--type-placeholder {
  color: $tc-color--grey;
}

.tc-select__container {
  display: flex;
  flex-direction: column;
}

.tc-select__container--theme-dark {
  background-color: $tc-color--black;
}

.tc-select__container--theme-dark .tc-select__group,
.tc-select__container--theme-dark .tc-select__option {
  color: $tc-color--white;
}

.tc-select__container--theme-dark .tc-select__option.is-highlighted {
  background-color: $tc-color--black;
}

.tc-select__container--theme-light {
  background-color: $tc-color--white;
}

.tc-select__container--theme-light .tc-select__group,
.tc-select__container--theme-light .tc-select__option {
  color: $tc-color--black;
}

.tc-select__container--theme-light .tc-select__option.is-highlighted {
  background-color: $tc-color--white;
}

.tc-select__container--type-input .tc-select__option.is-highlighted {
  color: $tc-color--studio;
}

.tc-select__container--type-input .tc-select__option.is-highlighted::before,
.tc-select__container--type-input .tc-select__option.is-selected::before {
  background-color: $tc-color--studio;
}

.tc-select__container--type-input .tc-select__option.is-selected {
  color: $tc-color--white;
}

.tc-select__container--type-input .tc-select__group,
.tc-select__container--type-input .tc-select__option,
.tc-select__container--type-underlined .tc-select__group,
.tc-select__container--type-underlined .tc-select__option {
  padding-bottom: ($tc-height--select-option - $tc-font-size--medium) * 0.5;
  padding-top: ($tc-height--select-option - $tc-font-size--medium) * 0.5;
}

.tc-select__container--type-outlined .tc-select__option.is-highlighted::before,
.tc-select__container--type-outlined .tc-select__option.is-selected::before,
.tc-select__container--type-underlined .tc-select__option.is-highlighted::before,
.tc-select__container--type-underlined .tc-select__option.is-selected::before {
  background-color: $tc-color--emphasis;
}

.tc-select__container--type-outlined .tc-select__option.is-selected,
.tc-select__container--type-underlined .tc-select__option.is-selected {
  color: $tc-color--white;
}

.tc-select__container--type-outlined .tc-select__group,
.tc-select__container--type-outlined .tc-select__option {
  padding-bottom: ($tc-height--select-option - $tc-font-size--small) * 0.5;
  padding-top: ($tc-height--select-option - $tc-font-size--small) * 0.5;
}

.tc-select__group {
  overflow: hidden;
  padding-left: $tc-spacing--select-option;
  padding-right: $tc-spacing--select-option;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tc-select__icon {
  flex-shrink: 0;
  margin-bottom: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
  margin-top: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
}

.tc-select__input {
  flex-shrink: 0;
  margin: $tc-spacing--select-option - $tc-spacing--input-narrow;
}

.tc-select__label {
  position: relative;
}

.tc-select__option {
  cursor: pointer;
  overflow: hidden;
  padding-left: $tc-spacing--select-option;
  padding-right: $tc-spacing--select-option;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tc-select__option.is-highlighted:not(.is-selected)::before {
  opacity: $tc-opacity--faded;
}

.tc-select__option::before {
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.tc-select__options {
  overflow: auto;
}

.tc-select__popover {
  box-sizing: border-box;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  top: 0;
  visibility: hidden;
  z-index: $tc-z-index--select;
}

.tc-select__popover.is-active {
  visibility: visible;
}

.tc-select__value {
  flex-grow: 1;
}
</style>

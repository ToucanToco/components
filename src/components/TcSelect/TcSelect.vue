<template>
  <TcClickable
    class="tc-select"
    :class="elementClass"
    :id="id"
    @blur.native="blur($event)"
    @click.prevent="open()"
    @focus.native="focus($event)"
    @keydown.native.down.prevent="selectNext()"
    @keydown.native.up.prevent="selectPrev()"
    @mousedown.native="preventToggle()"
  >
    <TcText class="tc-select__value" :class="valueClass">{{ label }}</TcText>
    <TcIcon class="tc-select__icon" :label="icon" small />
    <TcPopover bottom class="tc-select__popover" justify :value="isOpen">
      <div class="tc-select__container" :class="containerClass">
        <TcTextField
          v-model="query"
          class="tc-select__input"
          icon="search"
          narrow
          ref="input"
          @blur="close($event)"
          @focus="focus($event)"
          @keydown.down.prevent="highlightNext()"
          @keydown.esc.prevent="close()"
          @keydown.tab.prevent="close()"
          @keydown.up.prevent="highlightPrev()"
          @keypress.enter.prevent="selectHighlighted()"
          @keypress.space="closeIfEmpty($event)"
        />
        <div class="tc-select__options">
          <template v-for="(option, index) in filteredOptions">
            <div v-if="option.isGroup" class="tc-select__group" :key="index">
              <TcText bold>{{ option.label }}</TcText>
            </div>
            <div
              v-else
              class="tc-select__option"
              :class="getOptionClass(index, option)"
              :key="index"
              @click.prevent="select(option)"
              @mouseenter="highlight(index)"
            >
              <TcText>{{ option.label }}</TcText>
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
import normalize from 'tc-components/utils/normalize';
import { FIELD_WIDTHS } from 'tc-components/variables';

export default {
  name: 'TcSelect',

  components: {
    TcClickable,
    TcIcon,
    TcPopover,
    TcText,
    TcTextField,
  },

  mixins: [tcComponent, focusable, getBooleansMixin('width', FIELD_WIDTHS)],

  props: {
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
      highlightedIndex: 0,
      isOpen: false,
      openable: true,
      query: '',
    };
  },

  computed: {
    containerClass() {
      return [
        `tc-select__container--theme-${this.theme}`,
        `tc-select__container--width-${this.width}`,
      ];
    },
    elementClass() {
      return {
        [`tc-select--theme-${this.theme}`]: true,
        [`tc-select--width-${this.width}`]: true,
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
    close(e) {
      this.isOpen = false;
      this.query = '';

      this.highlight(this.filteredOptions.length > 0 && this.filteredOptions[0].isGroup ? 1 : 0);

      if (e === undefined) {
        this.$el.focus();
      } else {
        this.blur(e);
      }
    },
    closeIfEmpty(e) {
      if (this.query === '') {
        e.preventDefault();
        this.close();
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
    async open() {
      if (this.openable) {
        this.isOpen = true;

        await this.$nextTick();
        this.$refs.input.triggerFocus();
      } else {
        this.openable = true;
      }
    },
    preventToggle() {
      if (this.isOpen) {
        this.openable = false;
      }
    },
    select(option) {
      this.$emit('input', option.value);
      this.close();
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
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-popover--position-bottom {
  .tc-select__container--theme-dark {
    box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey,
      inset $tc-border-width--input (-$tc-border-width--input) 0 0 $tc-color--grey,
      $tc-box-shadow--select-below;
  }

  .tc-select__container--theme-light {
    box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey-light-2,
      inset $tc-border-width--input (-$tc-border-width--input) 0 0 $tc-color--grey-light-2,
      $tc-box-shadow--select-below;
  }
}

.tc-popover--position-top {
  .tc-select__container--theme-dark {
    box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey,
      inset $tc-border-width--input $tc-border-width--input 0 0 $tc-color--grey,
      $tc-box-shadow--select-above;
  }

  .tc-select__container--theme-light {
    box-shadow: inset (-$tc-border-width--input) 0 0 0 $tc-color--grey-light-2,
      inset $tc-border-width--input $tc-border-width--input 0 0 $tc-color--grey-light-2,
      $tc-box-shadow--select-above;
  }
}

.tc-select {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--input;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  outline: none;
  padding-bottom: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;
  padding-top: ($tc-height--input - $tc-font-size--medium) * 0.5 - $tc-border-width--input;

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

.tc-select__container {
  display: flex;
  flex-direction: column;
  z-index: $tc-z-index--select;
}

.tc-select__container--theme-dark {
  background-color: $tc-color--black;

  .tc-select__option {
    color: $tc-color--white;

    &.is-highlighted {
      background-color: $tc-color--black;
    }
  }
}

.tc-select__container--theme-light {
  background-color: $tc-color--white;

  .tc-select__option {
    color: $tc-color--black;

    &.is-highlighted {
      background-color: $tc-color--white;
    }
  }
}

.tc-select__group {
  overflow: hidden;
  padding: ($tc-height--button-small - $tc-font-size--medium) * 0.5 $tc-spacing--button-large;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tc-select__icon {
  flex-shrink: 0;
  margin-bottom: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
  margin-top: ($tc-font-size--medium - $tc-font-size--small) * 0.5;
}

.tc-select__input {
  margin: $tc-spacing--button-large - $tc-spacing--input-narrow;
}

.tc-select__option {
  cursor: pointer;
  overflow: hidden;
  padding: ($tc-height--button-small - $tc-font-size--medium) * 0.5 $tc-spacing--button-large;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.is-highlighted {
    box-shadow: inset 0 $tc-height--button-small 0 0 $tc-color--studio-faded;
    color: $tc-color--studio;
  }

  &.is-selected {
    box-shadow: inset 0 $tc-height--button-small 0 0 $tc-color--studio;
    color: $tc-color--white;
  }
}

.tc-select__popover {
  position: fixed;
  visibility: hidden;

  &.is-active {
    visibility: visible;
  }
}

.tc-select__value {
  flex-grow: 1;
}

.tc-select__value--type-placeholder {
  color: $tc-color--grey;
}
</style>

<template>
  <div class="tc-checkbox" :class="elementClass">
    <div class="tc-checkbox__box">
      <TcIcon class="tc-checkbox__icon" label="check" small />
      <input
        :id="id"
        v-model="valueModel"
        class="tc-checkbox__input"
        type="checkbox"
        @blur="blur()"
        @focus="focus()"
      />
    </div>
    <label v-if="hasLabel" class="tc-checkbox__label" :for="id">
      <TcText>{{ label }}</TcText>
    </label>
  </div>
</template>

<script>
import focusable from 'tc-components/mixins/focusable';
import themable from 'tc-components/mixins/themable';
import TcIcon from 'tc-components/components/TcIcon';
import TcText from 'tc-components/components/TcText';

export default {
  name: 'TcCheckbox',

  components: {
    TcIcon,
    TcText,
  },

  mixins: [focusable, themable],

  props: {
    id: {
      default() {
        return `tc-checkbox--${this._uid}`;
      },
      type: String,
    },
    label: {
      default: undefined,
      type: String,
    },
    value: {
      default: false,
      type: Boolean,
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-checkbox--theme-${this.theme}`]: true,
        'is-checked': this.value,
        'is-focused': this.isFocused,
      };
    },
    hasLabel() {
      return this.label !== undefined;
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
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-checkbox {
  align-items: center;
  display: flex;

  &.is-checked {
    .tc-checkbox__icon {
      opacity: 1;
      transform: scale(1);
    }
  }

  &.is-focused {
    .tc-checkbox__box {
      border-color: $tc-color--studio;
    }

    .tc-checkbox__label {
      color: $tc-color--studio;
    }
  }
}

.tc-checkbox--theme-dark {
  .tc-checkbox__box {
    background-color: $tc-color--white;
  }

  .tc-checkbox__label {
    color: $tc-color--white;
  }
}

.tc-checkbox--theme-light {
  .tc-checkbox__label {
    color: $tc-color--black;
  }
}

.tc-checkbox__box {
  align-items: center;
  box-sizing: border-box;
  border: $tc-border-width--checkbox solid $tc-color--black;
  display: flex;
  flex-shrink: 0;
  height: $tc-size--checkbox;
  justify-content: center;
  position: relative;
  width: $tc-size--checkbox;
}

.tc-checkbox__icon {
  color: $tc-color--black;
  opacity: 0;
  transform: scale(0);
  transition-duration: $tc-transition-duration--check;
  transition-property: opacity, transform;
}

.tc-checkbox__input {
  border: none;
  cursor: pointer;
  height: $tc-size--checkbox;
  left: -$tc-border-width--checkbox;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: -$tc-border-width--checkbox;
  width: $tc-size--checkbox;
}

.tc-checkbox__label {
  cursor: pointer;
  display: flex;
  margin-left: $tc-spacing--input;
}
</style>

<template>
  <div class="tc-radio" :class="elementClass">
    <div class="tc-radio__box">
      <TcIcon class="tc-radio__icon" label="check" small />
      <input
        :id="id"
        v-model="groupValueModel"
        class="tc-radio__input"
        :name="name"
        type="radio"
        :value="value"
        @blur="blur()"
        @focus="focus()"
      />
    </div>
    <label v-if="hasLabel" class="tc-radio__label" :for="id">
      <TcText>{{ label }}</TcText>
    </label>
  </div>
</template>

<script>
import focusable from 'tc-components/mixins/focusable';
import TcIcon from 'tc-components/components/TcIcon';
import TcText from 'tc-components/components/TcText';

export default {
  name: 'TcRadio',

  inject: ['radioGroup'],

  components: {
    TcIcon,
    TcText,
  },

  mixins: [focusable],

  props: {
    label: {
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
        [`tc-radio--theme-${this.theme}`]: true,
        'is-checked': this.isChecked,
        'is-focused': this.isFocused,
        'is-sibling-checked': this.isSiblingChecked,
      };
    },
    groupValueModel: {
      get() {
        return this.radioGroup.valueModel;
      },
      set(value) {
        this.radioGroup.valueModel = value;
      },
    },
    hasLabel() {
      return this.label !== undefined;
    },
    id() {
      return `tc-radio--${this._uid}`;
    },
    isChecked() {
      return this.value === this.radioGroup.value;
    },
    isSiblingChecked() {
      return this.radioGroup.value !== undefined && !this.isChecked;
    },
    name() {
      return this.radioGroup.id;
    },
    theme() {
      return this.radioGroup.theme;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-radio {
  align-items: center;
  display: flex;

  &.is-checked {
    .tc-radio__icon {
      opacity: 1;
      transform: scale(1);
    }
  }

  &.is-focused {
    .tc-radio__box {
      border-color: $tc-color--studio;
    }

    .tc-radio__label {
      color: $tc-color--studio;
    }
  }
}

.tc-radio--theme-dark {
  &:not(.is-focused).is-sibling-checked {
    .tc-radio__box {
      background-color: $tc-color--grey-light-1;
    }

    .tc-radio__label {
      color: $tc-color--grey-light-1;
    }
  }

  .tc-radio__box {
    background-color: $tc-color--white;
  }

  .tc-radio__label {
    color: $tc-color--white;
  }
}

.tc-radio--theme-light {
  &:not(.is-focused).is-sibling-checked {
    .tc-radio__box {
      border-color: $tc-color--grey;
    }

    .tc-radio__label {
      color: $tc-color--grey;
    }
  }

  .tc-radio__label {
    color: $tc-color--black;
  }
}

.tc-radio__box {
  align-items: center;
  border: $tc-border-width--checkbox solid $tc-color--black;
  border-radius: $tc-border-radius--circle;
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: $tc-size--checkbox;
  justify-content: center;
  position: relative;
  width: $tc-size--checkbox;
}

.tc-radio__icon {
  color: $tc-color--black;
  opacity: 0;
  transform: scale(0);
  transition-duration: $tc-transition-duration--check;
  transition-property: opacity, transform;
}

.tc-radio__input {
  border: none;
  border-radius: $tc-border-radius--circle;
  cursor: pointer;
  height: $tc-size--checkbox;
  left: -$tc-border-width--checkbox;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: -$tc-border-width--checkbox;
  width: $tc-size--checkbox;
}

.tc-radio__label {
  cursor: pointer;
  display: flex;
  margin-left: $tc-spacing--input;
}
</style>

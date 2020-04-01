<template>
  <div class="tc-switch" :class="elementClass">
    <label
      v-if="hasLabel"
      class="tc-switch__label tc-switch__label--position-left"
      :class="leftLabelClass"
      :for="id"
    >
      <TcText>{{ leftLabel }}</TcText>
    </label>
    <div class="tc-switch__switch">
      <input
        :id="id"
        v-model="valueModel"
        class="tc-switch__input"
        type="checkbox"
        @blur="blur()"
        @focus="focus()"
      />
    </div>
    <label v-if="hasOffLabel" class="tc-switch__label tc-switch__label--position-right" :for="id">
      <TcText>{{ label }}</TcText>
    </label>
  </div>
</template>

<script>
import focusable from '../../mixins/focusable';
import themable from '../../mixins/themable';
import TcText from '../TcText';

export default {
  name: 'TcSwitch',

  components: {
    TcText,
  },

  mixins: [focusable, themable],

  props: {
    id: {
      default() {
        return `tc-switch--${this._uid}`;
      },
      type: String,
    },
    label: {
      default: undefined,
      type: String,
    },
    offLabel: {
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
        [`tc-switch--theme-${this.theme}`]: true,
        'is-focused': this.isFocused,
        'is-on': this.value,
      };
    },
    hasLabel() {
      return this.label !== undefined;
    },
    hasOffLabel() {
      return this.offLabel !== undefined;
    },
    leftLabel() {
      return this.hasOffLabel ? this.offLabel : this.label;
    },
    leftLabelClass() {
      return `tc-switch__label--type-${this.hasOffLabel ? 'off' : 'on'}`;
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
@import '../../variables';

.tc-switch {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &.is-focused {
    .tc-switch__label {
      color: $tc-color--studio;
    }
  }

  &.is-on {
    .tc-switch__switch::before {
      box-shadow: $tc-width--switch-track - $tc-size--switch-thumb * 0.5 0 0 0 $tc-color--studio
        inset;
    }

    .tc-switch__switch::after {
      transform: translateX(0);
    }
  }
}

.tc-switch--theme-dark {
  &.is-on:not(.is-focused) {
    .tc-switch__label--position-left.tc-switch__label--type-off {
      color: $tc-color--grey-light-1;
    }

    .tc-switch__label--position-right {
      color: $tc-color--white;
    }
  }

  .tc-switch__label--position-left {
    color: $tc-color--white;
  }

  .tc-switch__label--position-right {
    color: $tc-color--grey-light-1;
  }
}

.tc-switch--theme-light {
  &.is-on:not(.is-focused) {
    .tc-switch__label--position-left.tc-switch__label--type-off {
      color: $tc-color--grey;
    }

    .tc-switch__label--position-right {
      color: $tc-color--black;
    }
  }

  .tc-switch__label--position-left {
    color: $tc-color--black;
  }

  .tc-switch__label--position-right {
    color: $tc-color--grey;
  }
}

.tc-switch__input {
  border: none;
  border-radius: $tc-size--switch-thumb * 0.5;
  cursor: pointer;
  height: $tc-size--switch-thumb;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: $tc-width--switch-track;
}

.tc-switch__label {
  cursor: pointer;
  display: flex;
}

.tc-switch__label--position-left {
  margin-right: $tc-spacing--input;
}

.tc-switch__label--position-right {
  margin-left: $tc-spacing--input;
}

.tc-switch__switch {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  position: relative;
}

.tc-switch__switch::before {
  background-color: $tc-color--grey-light-1;
  border-radius: $tc-height--switch-track * 0.5;
  box-shadow: $tc-size--switch-thumb * 0.5 0 0 0 $tc-color--studio inset;
  content: '';
  height: $tc-height--switch-track;
  order: -1;
  width: $tc-width--switch-track;
  transition: box-shadow $tc-transition-duration--switch;
}

.tc-switch__switch::after {
  background-color: $tc-color--white;
  border-radius: $tc-border-radius--circle;
  box-shadow: $tc-box-shadow--switch;
  content: '';
  height: $tc-size--switch-thumb;
  margin-left: -$tc-size--switch-thumb;
  order: -1;
  transform: translateX($tc-size--switch-thumb - $tc-width--switch-track);
  width: $tc-size--switch-thumb;
  transition: transform $tc-transition-duration--switch;
}
</style>

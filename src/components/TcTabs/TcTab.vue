<template>
  <div class="tc-tab" :class="elementClass">
    <input
      :id="id"
      v-model="tabsValueModel"
      class="tc-tab__input"
      :name="name"
      type="radio"
      :value="value"
      @blur="blur()"
      @focus="focus()"
    />
    <label class="tc-tab__label" :for="id">
      <TcText bold uppercase>
        <slot />
      </TcText>
    </label>
  </div>
</template>

<script>
import focusable from '../../mixins/focusable';
import TcText from '../TcText';

export default {
  name: 'TcTab',

  components: {
    TcText,
  },

  mixins: [focusable],

  inject: ['tabs'],

  props: {
    value: {
      default: undefined,
      type: String,
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-tab--theme-${this.theme}`]: true,
        'is-active': this.isActive,
        'is-focused': this.isFocused,
      };
    },
    id() {
      return `tc-tab--${this._uid}`;
    },
    isActive() {
      return this.value === this.tabs.value;
    },
    name() {
      return this.tabs.id;
    },
    tabsValueModel: {
      get() {
        return this.tabs.valueModel;
      },
      set(value) {
        this.tabs.valueModel = value;
      },
    },
    theme() {
      return this.tabs.theme;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../variables';

.tc-tab {
  position: relative;

  &.is-focused {
    .tc-tab__label {
      color: $tc-color--studio;
    }
  }
}

.tc-tab--theme-dark {
  .tc-tab__label {
    color: $tc-color--grey-light-1;
  }

  &.is-active:not(.is-focused) {
    .tc-tab__label {
      color: $tc-color--white;
    }
  }
}

.tc-tab--theme-light {
  .tc-tab__label {
    color: $tc-color--grey;
  }

  &.is-active:not(.is-focused) {
    .tc-tab__label {
      color: $tc-color--black;
    }
  }
}

.tc-tab__input {
  border: none;
  height: 0;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 0;
}

.tc-tab__label {
  cursor: pointer;
  display: flex;
  padding-bottom: ($tc-height--tab - $tc-font-size--medium) * 0.5;
  padding-top: ($tc-height--tab - $tc-font-size--medium) * 0.5;
  position: relative;
}
</style>
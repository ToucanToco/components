<template>
  <div class="tc-tab" :class="elementClass">
    <input
      :id="id"
      v-model="tabsValueModel"
      class="tc-tab__input"
      :name="name"
      type="radio"
      :value="value"
      @blur="blur($event)"
      @focus="focus($event)"
    />
    <label class="tc-tab__label" :for="id">
      <TcText bold uppercase>
        <slot />
      </TcText>
    </label>
  </div>
</template>

<script>
import TcText from 'tc-components/components/TcText';
import focusable from 'tc-components/mixins/focusable';
import tcComponent from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcTab',

  inject: ['tabs'],

  components: {
    TcText,
  },

  mixins: [tcComponent, focusable],

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
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-tab {
  position: relative;
}

.tc-tab.is-focused .tc-tab__label {
  color: $tc-color--studio;
}

.tc-tab--theme-dark .tc-tab__label {
  color: $tc-color--grey-light-1;
}

.tc-tab--theme-dark.is-active:not(.is-focused) .tc-tab__label {
  color: $tc-color--white;
}

.tc-tab--theme-light .tc-tab__label {
  color: $tc-color--grey;
}

.tc-tab--theme-light.is-active:not(.is-focused) .tc-tab__label {
  color: $tc-color--black;
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

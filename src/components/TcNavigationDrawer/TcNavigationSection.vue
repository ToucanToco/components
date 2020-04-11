<template>
  <div class="tc-navigation-section" :class="elementClass">
    <TcNavigationButton class="tc-navigation-section__label" @click="toggle()">
      <slot name="label" />
    </TcNavigationButton>
    <div class="tc-navigation-section__body">
      <slot />
    </div>
  </div>
</template>

<script>
import TcNavigationButton from './TcNavigationButton.vue';

export default {
  name: 'TcNavigationSection',

  inject: ['navigationDrawer'],

  components: {
    TcNavigationButton,
  },

  props: {
    value: {
      default: undefined,
      type: String,
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-navigation-section--theme-${this.theme}`]: true,
        'is-active': this.isActive,
      };
    },
    isActive() {
      return this.value === this.navigationDrawer.activeSection;
    },
    theme() {
      return this.navigationDrawer.theme;
    },
  },

  methods: {
    toggle() {
      this.navigationDrawer.activeSection = this.isActive ? undefined : this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../variables';

.tc-navigation-section {
  display: flex;
  flex-direction: column;
  margin-bottom: $tc-size--separator;

  &.is-active {
    .tc-navigation-section__body {
      display: flex;
    }
  }
}

.tc-navigation-section--theme-dark {
  box-shadow: 0 $tc-size--separator 0 0 $tc-color--black;
}

.tc-navigation-section--theme-light {
  box-shadow: 0 $tc-size--separator 0 0 $tc-color--white;
}

.tc-navigation-section__body {
  display: none;
  flex-direction: column;
}
</style>

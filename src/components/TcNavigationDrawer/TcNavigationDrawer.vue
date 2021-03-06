<template>
  <div class="tc-navigation-drawer" :class="elementClass">
    <div class="tc-navigation-drawer__overlay" @click="close()" />
    <div class="tc-navigation-drawer__container">
      <div class="tc-navigation-drawer__header">
        <slot name="header" />
      </div>
      <div class="tc-navigation-drawer__body">
        <slot />
      </div>
      <div class="tc-navigation-drawer__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcNavigationDrawer',

  provide() {
    return {
      navigationDrawer: this,
    };
  },

  mixins: [tcComponent],

  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      activeSection: undefined,
    };
  },

  computed: {
    elementClass() {
      return {
        [`tc-navigation-drawer--theme-${this.theme}`]: true,
        'is-active': this.value,
      };
    },
  },

  methods: {
    close() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-navigation-drawer {
  display: flex;
  position: sticky;
  top: 0;
  transition: visibility $tc-transition-duration--drawer;
  visibility: hidden;
  z-index: $tc-z-index--navigation-drawer;
}

.tc-navigation-drawer.is-active {
  visibility: visible;
}

.tc-navigation-drawer.is-active .tc-navigation-drawer__container {
  box-shadow: $tc-box-shadow--overflow;
  transform: translateX(0);
  transition-delay: 0s;
}

.tc-navigation-drawer.is-active .tc-navigation-drawer__overlay {
  opacity: 1;
}

.tc-navigation-drawer--theme-dark .tc-navigation-drawer__body {
  background-color: $tc-color--brand;
}

.tc-navigation-drawer--theme-dark .tc-navigation-drawer__header {
  background-color: $tc-color--black;
}

.tc-navigation-drawer--theme-dark .tc-navigation-drawer__overlay {
  background-color: rgba($tc-color--black, $tc-opacity--overlay);
}

.tc-navigation-drawer--theme-light .tc-navigation-drawer__body {
  background-color: $tc-color--brand-light;
}

.tc-navigation-drawer--theme-light .tc-navigation-drawer__header {
  background-color: $tc-color--white;
}

.tc-navigation-drawer--theme-light .tc-navigation-drawer__overlay {
  background-color: rgba($tc-color--white, $tc-opacity--overlay);
}

.tc-navigation-drawer__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0;
  overflow: auto;
}

.tc-navigation-drawer__container {
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  max-width: calc(100vw - #{$tc-height--app-bar});
  position: absolute;
  top: 0;
  transform: translateX(-100%);
  transition: box-shadow $tc-transition-duration--raise
      ($tc-transition-duration--drawer - $tc-transition-duration--raise),
    transform $tc-transition-duration--drawer;
  width: $tc-width--navigation-drawer;
}

.tc-navigation-drawer__footer {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.tc-navigation-drawer__header {
  display: flex;
  flex-shrink: 0;
  height: $tc-height--app-bar;
}

.tc-navigation-drawer__overlay {
  bottom: 0;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity $tc-transition-duration--drawer;
}

@media (min-width: $tc-width--navigation-drawer * 4) {
  .tc-navigation-drawer--mode-default {
    top: $tc-height--app-bar;
    visibility: visible;
    z-index: 0;
  }

  .tc-navigation-drawer--mode-default.is-active .tc-navigation-drawer__container {
    box-shadow: none;
  }

  .tc-navigatin-drawer--mode-default .tc-navigation-drawer__container {
    position: static;
    transform: translateX(0);
  }

  .tc-navigatin-drawer--mode-default .tc-navigation-drawer__header {
    height: auto;
  }

  .tc-navigatin-drawer--mode-default .tc-navigation-drawer__overlay {
    display: none;
  }
}
</style>

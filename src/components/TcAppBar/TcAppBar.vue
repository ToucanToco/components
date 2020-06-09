<template>
  <div class="tc-app-bar" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import themable from 'tc-components/mixins/themable';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import { BAR_TYPES } from 'tc-components/variables';

export default {
  name: 'TcAppBar',

  mixins: [getBooleansMixin('type', BAR_TYPES), themable],

  computed: {
    elementClass() {
      return [`tc-app-bar--theme-${this.theme}`, `tc-app-bar--type-${this.type}`];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-app-bar {
  align-items: center;
  display: flex;
  height: $tc-height--app-bar;
}

.tc-app-bar--theme-dark {
  background-color: $tc-color--black;
}

.tc-app-bar--theme-light {
  background-color: $tc-color--white;
}

.tc-app-bar--type-raised {
  box-shadow: $tc-box-shadow--overflow;
  position: sticky;
  top: 0;
  z-index: $tc-z-index--app-bar;
}
</style>

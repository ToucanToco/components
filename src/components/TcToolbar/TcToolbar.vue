<template>
  <div class="tc-toolbar" :class="elementClass">
    <slot />
  </div>
</template>

<script>
import themable from 'tc-components/mixins/themable';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';
import { BAR_TYPES } from 'tc-components/variables';

export default {
  name: 'TcToolbar',

  mixins: [getBooleansMixin('type', BAR_TYPES), themable],

  computed: {
    elementClass() {
      return [`tc-toolbar--theme-${this.theme}`, `tc-toolbar--type-${this.type}`];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-toolbar {
  align-items: center;
  display: flex;
  height: $tc-height--toolbar;
}

.tc-toolbar--theme-dark {
  background-color: $tc-color--black;
}

.tc-toolbar--theme-light {
  background-color: $tc-color--grey-extralight-2;
}

.tc-toolbar--type-raised {
  box-shadow: $tc-box-shadow--overflow;
  position: sticky;
  top: 0;
  z-index: $tc-z-index--toolbar;
}
</style>

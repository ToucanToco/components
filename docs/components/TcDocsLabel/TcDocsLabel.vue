<template>
  <Component :is="is" class="tc-docs-label" :class="elementClass">
    <TcText
      :bold="isBold"
      :large="isLarge"
      :serif="isSerif"
      :thin="isThin"
      :uppercase="isUppercase"
      :xx-large="isXxLarge"
    >
      <slot />
    </TcText>
  </Component>
</template>

<script>
import TcText from 'tc-components/components/TcText';
import themable from 'tc-components/mixins/themable';

export default {
  name: 'TcDocsLabel',

  components: {
    TcText,
  },

  mixins: [themable],

  props: {
    level: {
      default: '1',
      type: String,
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-docs-label--theme-${this.theme}`]: true,
      };
    },
    is() {
      return `h${this.level}`;
    },
    isBold() {
      return this.level === '2';
    },
    isLarge() {
      return this.level === '2';
    },
    isSerif() {
      return this.level === '1';
    },
    isThin() {
      return this.level === '1';
    },
    isUppercase() {
      return this.level === '2';
    },
    isXxLarge() {
      return this.level === '1';
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-top: $tc-spacing--container-large;
}

.tc-docs-label--theme-dark {
  color: $tc-color--white;
}

.tc-docs-label--theme-light {
  color: $tc-color--black;
}
</style>

<template>
  <p class="tc-docs-description">
    <TcText :large="subtitle">
      <slot />
    </TcText>
  </p>
</template>

<script>
import TcText from 'tc-components/components/TcText';
import tcComponent from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcDocsDescription',

  components: {
    TcText,
  },

  mixins: [tcComponent],

  props: {
    subtitle: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-description {
  color: $tc-color--grey;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-top: $tc-spacing--container-small;
}
</style>

<template>
  <p class="tc-docs-description">
    <TcText :large="subtitle">
      <slot />
    </TcText>
  </p>
</template>

<script>
import TcText from '../../../components/TcText';

export default {
  name: 'TcDocsDescription',

  components: {
    TcText,
  },

  props: {
    subtitle: {
      default: false,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../variables';

.tc-docs-description {
  color: $tc-color--grey;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  margin-top: $tc-spacing--container-small;
}
</style>

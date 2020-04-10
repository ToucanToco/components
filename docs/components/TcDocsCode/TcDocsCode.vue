<template>
  <pre class="tc-docs-code">
    <TcText class="tc-docs-code__text" monospace>{{ value }}</TcText>
  </pre>
</template>

<script>
import TcText from 'tc-components/components/TcText';

export default {
  name: 'TcDocsCode',

  components: {
    TcText,
  },

  props: {
    language: {
      default: undefined,
      type: String,
    },
    value: {
      default: undefined,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-code {
  background-color: $tc-color--grey-dark;
  border-radius: $tc-border-radius--medium;
  box-sizing: border-box;
  color: $tc-color--white;
  display: flex;
  margin-bottom: 0;
  margin-top: $tc-spacing--container-small;
  white-space: normal;
}

.tc-docs-code__text {
  display: flex;
  flex-grow: 1;
  overflow: auto;
  padding: $tc-spacing--container;
  width: 0;
  white-space: pre;
}

.tc-docs-code__text::after {
  content: "";
  flex-shrink: 0;
  width: $tc-spacing--container;
}
</style>

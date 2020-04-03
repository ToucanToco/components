<template>
  <div class="tc-docs-actions">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TcDocsActions',
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-actions {
  display: flex;
  margin-top: $tc-spacing--container-small;
}

.tc-docs-actions /deep/ > * {
  margin-right: $tc-spacing--actions;
}

.tc-docs-actions /deep/ > :last-child {
  margin-right: 0;
}
</style>

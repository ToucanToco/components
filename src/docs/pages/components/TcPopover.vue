<template>
  <TcDocsPage v-model="props" center-example :components="components" :slots="slots">
    <div class="tc-docs-page-popover__container">
      <TcButton @click="toggleValue()">Toggle popover</TcButton>
      <TcPopover v-bind="props" class="tc-docs-page-popover__popover">
        <TcText>Popover content</TcText>
      </TcPopover>
    </div>
  </TcDocsPage>
</template>

<script>
import TcButton from 'tc-components/components/TcButton';
import TcPopover from 'tc-components/components/TcPopover';
import TcText from 'tc-components/components/TcText';

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPagePopover',

  components: {
    TcButton,
    TcDocsPage,
    TcPopover,
    TcText,
  },

  data() {
    return {
      components: TcPopover,
      props: {
        container: 'body',
      },
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },

  methods: {
    toggleValue() {
      this.$set(this.props, 'value', !this.props.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tc-docs-page-popover__container {
  position: relative;
}

.tc-docs-page-popover__popover {
  position: fixed;
  visibility: hidden;
}

.tc-docs-page-popover__popover.is-active {
  visibility: visible;
}
</style>

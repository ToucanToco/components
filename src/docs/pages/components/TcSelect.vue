<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    description="TODO :: Improve search"
    :events="events"
  >
    <TcSelect v-bind="props" @input="updateValue($event)" />
  </TcDocsPage>
</template>

<script>
import TcSelect from 'tc-components/components/TcSelect';

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageSelect',

  components: {
    TcDocsPage,
    TcSelect,
  },

  data() {
    return {
      components: TcSelect,
      events: {
        blur: 'Emitted when component is blurred',
        focus: 'Emitted when component is focused',
        input: 'The updated bound model',
      },
      props: {
        items: ['The first', 'The second', 'The third'],
        value: 'The first',
      },
    };
  },

  methods: {
    updateValue(value) {
      this.$set(this.props, 'value', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

/deep/ .tc-select {
  max-width: 100%;
  width: $tc-width--dialog-action;
}
</style>

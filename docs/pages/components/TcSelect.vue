<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    description="TODO :: Add search & style options"
    :events="events"
  >
    <TcSelect v-bind="props" @input="updateValue($event)" />
  </TcDocsPage>
</template>

<script>
import TcSelect from 'tc-components/components/TcSelect';

import TcDocsPage from '@/components/TcDocsPage';

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

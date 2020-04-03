<template>
  <TcDocsPage v-model="props" center-example :components="components" :events="events">
    <TcTextField v-bind="props" @input="updateValue($event)" />
  </TcDocsPage>
</template>

<script>
import TcTextField from 'tc-components/components/TcTextField';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageTextField',

  components: {
    TcDocsPage,
    TcTextField,
  },

  data() {
    return {
      components: TcTextField,
      events: {
        blur: 'Emitted when component is blurred',
        focus: 'Emitted when component is focused',
        input: 'The updated bound model',
      },
      props: {},
    };
  },

  methods: {
    updateValue(value) {
      this.$set(this.props, 'value', value);
    },
  },
};
</script>

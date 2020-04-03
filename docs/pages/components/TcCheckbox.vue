<template>
  <TcDocsPage v-model="props" center-example :components="components" :events="events">
    <TcCheckbox v-bind="props" @input="updateValue($event)" />
  </TcDocsPage>
</template>

<script>
import TcCheckbox from 'tc-components/components/TcCheckbox';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageCheckbox',

  components: {
    TcCheckbox,
    TcDocsPage,
  },

  data() {
    return {
      components: TcCheckbox,
      events: {
        blur: 'Emitted when component is blurred',
        focus: 'Emitted when component is focused',
        input: 'The updated bound model',
      },
      props: {
        label: 'Check this',
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

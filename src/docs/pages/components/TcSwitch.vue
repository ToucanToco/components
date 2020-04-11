<template>
  <TcDocsPage v-model="props" center-example :components="components" :events="events">
    <TcSwitch v-bind="props" @input="updateValue($event)" />
  </TcDocsPage>
</template>

<script>
import TcSwitch from 'tc-components/components/TcSwitch';

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageSwitch',

  components: {
    TcDocsPage,
    TcSwitch,
  },

  data() {
    return {
      components: TcSwitch,
      events: {
        blur: 'Emitted when component is blurred',
        focus: 'Emitted when component is focused',
        input: 'The updated bound model',
      },
      props: {
        label: 'On',
        offLabel: 'Off',
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

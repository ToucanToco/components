<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    :events="events"
    :slots="slots"
  >
    <TcRadioGroup v-bind="props" @input="updateValue($event)">
      <TcRadio value="1" label="One" />
      <TcRadio value="2" label="Two" />
      <TcRadio value="3" label="Three" />
    </TcRadioGroup>
  </TcDocsPage>
</template>

<script>
import { TcRadio, TcRadioGroup } from 'tc-components/components/TcRadioGroup';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageRadioGroup',

  components: {
    TcDocsPage,
    TcRadio,
    TcRadioGroup,
  },

  data() {
    return {
      components: [TcRadioGroup, TcRadio],
      events: {
        TcRadio: {
          blur: 'Emitted when component is blurred',
          focus: 'Emitted when component is focused',
        },
        TcRadioGroup: {
          input: 'The updated bound model',
        },
      },
      props: {},
      slots: {
        TcRadioGroup: {
          default: 'The default Vue slot.',
        },
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

<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    :events="events"
    :slots="slots"
  >
    <TcTabs v-bind="props" @input="updateValue($event)">
      <TcTab value="1">One</TcTab>
      <TcTab value="2">Two</TcTab>
      <TcTab value="3">Three</TcTab>
    </TcTabs>
  </TcDocsPage>
</template>

<script>
import { TcTab, TcTabs } from '../../../components/TcTabs';
import TcDocsPage from '../../components/TcDocsPage';

export default {
  name: 'TcDocsPageTabs',

  components: {
    TcDocsPage,
    TcTab,
    TcTabs,
  },

  data() {
    return {
      components: [TcTabs, TcTab],
      events: {
        TcTab: {
          blur: 'Emitted when component is blurred',
          focus: 'Emitted when component is focused',
        },
        TcTabs: {
          input: 'The updated bound model',
        },
      },
      props: {},
      slots: {
        TcTab: {
          default: 'The default Vue slot.',
        },
        TcTabs: {
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

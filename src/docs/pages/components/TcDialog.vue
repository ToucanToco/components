<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    :events="events"
    :slots="slots"
  >
    <TcButton @click="updateValue(true)">Open dialog</TcButton>
    <TcDialog v-bind="props" @input="updateValue($event)">
      <TcText>Content</TcText>
      <template #footer>
        <TcButton secondary @click="updateValue(false)">Cancel</TcButton>
        <TcButton studio @click="updateValue(false)">Submit</TcButton>
      </template>
    </TcDialog>
  </TcDocsPage>
</template>

<script>
import TcButton from 'tc-components/components/TcButton';
import TcDialog from 'tc-components/components/TcDialog';
import TcText from 'tc-components/components/TcText';

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageDialog',

  components: {
    TcButton,
    TcDialog,
    TcDocsPage,
    TcText,
  },

  data() {
    return {
      components: TcDialog,
      events: {
        input: 'The updated bound model',
      },
      props: {
        label: 'This is important',
      },
      slots: {
        default: 'The default Vue slot.',
        footer: 'The footer actions slot.',
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

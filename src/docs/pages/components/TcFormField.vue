<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    :events="events"
    :slots="slots"
  >
    <TcFormField v-bind="props" />
  </TcDocsPage>
</template>

<script>
import TcFormField from 'tc-components/components/TcFormField';

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageForm',

  components: {
    TcDocsPage,
    TcFormField,
  },

  data() {
    return {
      components: TcFormField,
      events: {
        blur: 'Emitted when component is blurred',
        focus: 'Emitted when component is focused',
        input: 'The updated bound model',
      },
      props: {
        hint: 'Need help?',
        label: 'Label',
      },
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },
};
</script>

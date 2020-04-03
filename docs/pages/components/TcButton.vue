<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    description="TODO :: Add focus highlights"
    :events="events"
    :slots="slots"
  >
    <TcButton v-bind="props">Click me!</TcButton>
  </TcDocsPage>
</template>

<script>
import TcButton from 'tc-components/components/TcButton';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageButton',

  components: {
    TcButton,
    TcDocsPage,
  },

  data() {
    return {
      components: TcButton,
      events: {
        click: 'Event that is emitted when the component is clicked',
      },
      props: {},
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },
};
</script>

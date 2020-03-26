<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    :events="events"
    :slots="slots"
  >
    <TcClickable v-bind="props">
      <TcText>Click me!</TcText>
    </TcClickable>
  </TcDocsPage>
</template>

<script>
import TcClickable from '../../../components/TcClickable';
import TcText from '../../../components/TcText';
import TcDocsPage from '../../components/TcDocsPage';

export default {
  name: 'TcDocsPageClickable',

  components: {
    TcClickable,
    TcDocsPage,
    TcText,
  },

  data() {
    return {
      components: TcClickable,
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

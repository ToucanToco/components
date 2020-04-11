<template>
  <TcDocsPage v-model="props" center-example :components="components" :slots="slots">
    <TcText v-bind="props">Lorem ipsum dolor sit amet</TcText>
  </TcDocsPage>
</template>

<script>
import TcText from 'tc-components/components/TcText';

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageText',

  components: {
    TcDocsPage,
    TcText,
  },

  data() {
    return {
      components: TcText,
      props: {},
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },
};
</script>

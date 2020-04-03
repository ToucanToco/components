<template>
  <TcDocsPage
    v-model="props"
    :components="components"
    description="TODO :: Handle children spacings (TcToolbarSection?)"
    :slots="slots"
  >
    <TcToolbar v-bind="props" />
  </TcDocsPage>
</template>

<script>
import TcToolbar from 'tc-components/components/TcToolbar';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageToolbar',

  components: {
    TcDocsPage,
    TcToolbar,
  },

  data() {
    return {
      components: TcToolbar,
      props: {},
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },
};
</script>

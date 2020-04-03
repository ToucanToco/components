<template>
  <TcDocsPage
    v-model="props"
    :components="components"
    description="TODO :: Handle children spacings (TcAppBarSection?)"
    :slots="slots"
  >
    <TcAppBar v-bind="props" />
  </TcDocsPage>
</template>

<script>
import TcAppBar from 'tc-components/components/TcAppBar';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageAppBar',

  components: {
    TcAppBar,
    TcDocsPage,
  },

  data() {
    return {
      components: TcAppBar,
      props: {},
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },
};
</script>

<template>
  <TcDocsPage v-model="props" center-example :components="components">
    <TcIcon v-bind="props" />
  </TcDocsPage>
</template>

<script>
import TcIcon from 'tc-components/components/TcIcon';
import ICONS from 'tc-components/components/TcIcon/icons';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageIcon',

  components: {
    TcDocsPage,
    TcIcon,
  },

  data() {
    return {
      components: TcIcon,
      props: {
        label: Object.keys(ICONS)[0],
      },
    };
  },
};
</script>

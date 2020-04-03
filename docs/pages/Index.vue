<template>
  <TcDocsPage>
    <TcDocsLabel :dark="isDark">Toucan Toco's Component Library</TcDocsLabel>
    <TcDocsActions>
      <TcButton :dark="isDark" large studio :to="{ name: 'QuickStart' }">Get started</TcButton>
      <TcButton
        :dark="isDark"
        href="https://github.com/ToucanToco/components"
        icon="mdGithub"
        large
        secondary
        >Github</TcButton
      >
    </TcDocsActions>
  </TcDocsPage>
</template>

<script>
import TcButton from 'tc-components/components/TcButton';
import { THEMES } from 'tc-components/variables';

import TcDocsActions from '@/components/TcDocsActions';
import TcDocsLabel from '@/components/TcDocsLabel';
import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageIndex',

  components: {
    TcButton,
    TcDocsActions,
    TcDocsLabel,
    TcDocsPage,
  },

  computed: {
    isDark() {
      return this.$route.params.theme === THEMES.DARK;
    },
  },
};
</script>

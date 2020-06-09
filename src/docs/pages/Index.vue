<template>
  <TcDocsPage>
    <TcDocsLabel>Toucan Toco's Component Library</TcDocsLabel>
    <TcDocsActions>
      <TcButton large studio :to="{ name: 'QuickStart' }">Get started</TcButton>
      <TcButton href="https://github.com/ToucanToco/components" icon="mdGithub" large secondary
        >Github</TcButton
      >
    </TcDocsActions>
  </TcDocsPage>
</template>

<script>
import TcButton from 'tc-components/components/TcButton';

import TcDocsActions from 'tc-components/docs/components/TcDocsActions';
import TcDocsLabel from 'tc-components/docs/components/TcDocsLabel';
import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageIndex',

  components: {
    TcButton,
    TcDocsActions,
    TcDocsLabel,
    TcDocsPage,
  },
};
</script>

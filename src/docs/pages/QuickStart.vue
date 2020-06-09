<template>
  <TcDocsPage>
    <TcDocsLabel>Quick Start</TcDocsLabel>
    <TcDocsDescription subtitle>Get started with TcComponents.</TcDocsDescription>
    <TcDocsLabel level="2">Insall</TcDocsLabel>
    <TcDocsCode language="bash" :value="installText" />
    <TcDocsLabel level="2">Customize colors</TcDocsLabel>
    <TcDocsColorsForm />
    <TcDocsLabel level="2">Usage</TcDocsLabel>
    <TcDocsDescription>Import the components</TcDocsDescription>
    <TcDocsCode language="javascript" :value="usageComponentsText" />
    <TcDocsDescription>Colors can be customized using CSS custom properties</TcDocsDescription>
    <TcDocsCode language="css" :value="usageUpdateColorsText" />
  </TcDocsPage>
</template>

<script>
import kebabCase from 'lodash/kebabCase';

import TcDocsCode from 'tc-components/docs/components/TcDocsCode';
import TcDocsColorsForm from 'tc-components/docs/components/TcDocsColorsForm';
import TcDocsDescription from 'tc-components/docs/components/TcDocsDescription';
import TcDocsLabel from 'tc-components/docs/components/TcDocsLabel';
import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

export default {
  name: 'TcDocsPageQuickStart',

  components: {
    TcDocsCode,
    TcDocsColorsForm,
    TcDocsDescription,
    TcDocsLabel,
    TcDocsPage,
  },

  computed: {
    installText() {
      return 'yarn add @toucantoco/components';
    },
    usageComponentsText() {
      return (
        "import Vue from 'vue';\n" +
        "import { TcAppBar } from '@toucantoco/components';\n" +
        '\n' +
        'new Vue({\n' +
        '  components: {\n' +
        '    TcAppBar,\n' +
        '  },\n' +
        '});'
      );
    },
    usageUpdateColorsText() {
      return (
        '* {\n' +
        Object.entries(this.$store.state.colors)
          .map(([colorKey, color]) => `  --tc-color--${kebabCase(colorKey)}: ${color};\n`)
          .join('') +
        '}'
      );
    },
  },
};
</script>

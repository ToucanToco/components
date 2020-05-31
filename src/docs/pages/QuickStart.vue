<template>
  <TcDocsPage>
    <TcDocsLabel :dark="isDark">Quick Start</TcDocsLabel>
    <TcDocsDescription subtitle>Get started with TcComponents.</TcDocsDescription>
    <TcDocsLabel :dark="isDark" level="2">Insall</TcDocsLabel>
    <TcDocsCode language="bash" :value="installText" />
    <TcDocsLabel :dark="isDark" level="2">Customize colors</TcDocsLabel>
    <TcDocsColorsForm :dark="isDark" />
    <TcDocsLabel :dark="isDark" level="2">Usage</TcDocsLabel>
    <TcDocsDescription>Import the components</TcDocsDescription>
    <TcDocsCode language="javascript" :value="usageComponentsText" />
    <TcDocsDescription>Colors can be customized using CSS custom properties</TcDocsDescription>
    <TcDocsCode language="css" :value="usageUpdateColorsText" />
  </TcDocsPage>
</template>

<script>
import { THEMES } from 'tc-components/variables';

import hyphenate from 'tc-components/docs/utils/hyphenate';
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
    isDark() {
      return this.$route.params.theme === THEMES.DARK;
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
          .map(([colorKey, color]) => `  --tc-color--${hyphenate(colorKey)}: ${color};\n`)
          .join('') +
        '}'
      );
    },
  },
};
</script>

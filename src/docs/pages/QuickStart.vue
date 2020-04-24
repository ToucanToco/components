<template>
  <TcDocsPage>
    <TcDocsLabel :dark="isDark">Quick Start</TcDocsLabel>
    <TcDocsDescription subtitle>Get started with TcComponents.</TcDocsDescription>
    <TcDocsLabel :dark="isDark" level="2">Insall</TcDocsLabel>
    <TcDocsCode language="bash" :value="installText" />
    <TcDocsLabel :dark="isDark" level="2">Customize colors</TcDocsLabel>
    <TcDocsColorsForm :dark="isDark" />
    <TcDocsLabel :dark="isDark" level="2">Usage</TcDocsLabel>
    <TcDocsDescription>Add the plugin to Vue</TcDocsDescription>
    <TcDocsCode language="javascript" :value="usagePluginText" />
    <TcDocsDescription>Use the components</TcDocsDescription>
    <TcDocsCode language="javascript" :value="usageComponentsText" />
    <TcDocsDescription
      >`$tcComponents` is passed to all components, you can use it to update colors from inside any
      component</TcDocsDescription
    >
    <TcDocsCode language="javascript" :value="usageUpdateColorsText" />
  </TcDocsPage>
</template>

<script>
import { THEMES } from 'tc-components/variables';

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
    usagePluginText() {
      return (
        "import Vue from 'vue';\n" +
        "import TcComponents from '@toucantoco/components'\n" +
        '\n' +
        'Vue.use(TcComponents);\n' +
        '\n' +
        '// Optionally you can pass colors on init\n' +
        'Vue.use(TcComponents, {\n' +
        '  colors: {\n' +
        Object.entries(this.$tcComponents.colors)
          .map(([colorKey, color]) => `    ${colorKey}: '${color}',\n`)
          .join('') +
        '  },\n' +
        '});'
      );
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
      return 'this.$tcComponents.updateColors({\n' + "  emphasis: 'purple',\n" + '});';
    },
  },
};
</script>

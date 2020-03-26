<template>
  <TcDocsPage>
    <TcDocsLabel :dark="isDark">Quick Start</TcDocsLabel>
    <TcDocsDescription subtitle>Get started with TcCompoents.</TcDocsDescription>
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
import { THEMES } from '../../variables';
import TcDocsCode from '../components/TcDocsCode';
import TcDocsColorsForm from '../components/TcDocsColorsForm';
import TcDocsDescription from '../components/TcDocsDescription';
import TcDocsLabel from '../components/TcDocsLabel';
import TcDocsPage from '../components/TcDocsPage';

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
      return 'yarn add git+ssh://git@github.com/ToucanToco/components.git#master';
    },
    isDark() {
      return this.$route.params.theme === THEMES.DARK;
    },
    usagePluginText() {
      return (
        `import Vue from 'vue';\n` +
        `\n` +
        `import TcComponents from 'tc-components/src/plugin'\n` +
        `\n` +
        `Vue.use(TcComponents);\n` +
        `\n` +
        `// Optionally you can pass colors on init\n` +
        `Vue.use(TcComponents, {\n` +
        `  colors: {\n` +
        Object.entries(this.$tcComponents.colors)
          .map(([colorKey, color]) => `    ${colorKey}: '${color}',\n`)
          .join('') +
        `  },\n` +
        `});`
      );
    },
    usageComponentsText() {
      return (
        `import Vue from 'vue';\n` +
        `\n` +
        `import TcAppBar from 'tc-components/src/components/TcAppBar';\n` +
        `\n` +
        `new Vue({\n` +
        `  components: {\n` +
        `    TcAppBar,\n` +
        `  },\n` +
        `});`
      );
    },
    usageUpdateColorsText() {
      return `this.$tcComponents.updateColors({\n` + `  emphasis: 'purple',\n` + `});`;
    },
  },
};
</script>

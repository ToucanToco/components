<template>
  <TcDocsPage v-model="props" center-example :components="components" :slots="slots">
    <TcForm v-bind="props">
      <TcFormField :dark="isDark" label="Text" />
      <TcFormField :dark="isDark" label="Select" select />
      <TcFormField :dark="isDark" label="Switch" switch />
      <TcFormField :dark="isDark" radio-group value="1">
        <TcRadio label="One" value="1" />
        <TcRadio label="Two" value="2" />
        <TcRadio label="Three" value="3" />
      </TcFormField>
    </TcForm>
  </TcDocsPage>
</template>

<script>
import TcForm from 'tc-components/components/TcForm';
import TcFormField from 'tc-components/components/TcFormField';
import { TcRadio } from 'tc-components/components/TcRadioGroup';
import { THEMES } from 'tc-components/variables';

import TcDocsPage from '@/components/TcDocsPage';

export default {
  name: 'TcDocsPageForm',

  components: {
    TcDocsPage,
    TcForm,
    TcFormField,
    TcRadio,
  },

  data() {
    return {
      components: TcForm,
      props: {},
      slots: {
        default: 'The default Vue slot.',
      },
    };
  },

  computed: {
    isDark() {
      return this.$route.params.theme === THEMES.DARK;
    },
  },
};
</script>

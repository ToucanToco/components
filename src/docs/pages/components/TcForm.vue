<template>
  <TcDocsPage
    v-model="props"
    center-example
    :components="components"
    description="TODO :: Add a generic TcFormField component"
    :slots="slots"
  >
    <TcForm v-bind="props">
      <TcTextField :dark="isDark" label="Text" />
      <TcRadioGroup :dark="isDark" value="1">
        <TcRadio label="One" value="1" />
        <TcRadio label="Two" value="2" />
        <TcRadio label="Three" value="3" />
      </TcRadioGroup>
    </TcForm>
  </TcDocsPage>
</template>

<script>
import TcForm from '../../../components/TcForm';
import { TcRadio, TcRadioGroup } from '../../../components/TcRadioGroup';
import TcTextField from '../../../components/TcTextField';
import { THEMES } from '../../../variables';
import TcDocsPage from '../../components/TcDocsPage';

export default {
  name: 'TcDocsPageForm',

  components: {
    TcDocsPage,
    TcForm,
    TcRadio,
    TcRadioGroup,
    TcTextField,
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

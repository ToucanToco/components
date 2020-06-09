<template>
  <TcDocsPage v-model="props" center-example :components="components" :slots="slots">
    <TcForm v-bind="props">
      <TcFormField label="Text" />
      <TcFormField :items="['One', 'Two', 'Three']" label="Select" select value="One" />
      <TcFormField label="Switch" switch />
      <TcFormField radio-group value="1">
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

import TcDocsPage from 'tc-components/docs/components/TcDocsPage';

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
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

/deep/ .tc-form {
  max-width: 100%;
  width: $tc-width--dialog-action;
}
</style>

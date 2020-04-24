<template>
  <TcForm class="tc-docs-colors-form" horizontal>
    <div v-for="(color, colorKey) in colors" :key="colorKey" class="tc-docs-colors-form__item">
      <div class="tc-docs-colors-form__color" :style="{ backgroundColor: color }" />
      <TcFormField
        class="tc-docs-colors-form__field"
        :label="colorKey"
        :value="color"
        @input="updateColor(colorKey, $event)"
      />
    </div>
  </TcForm>
</template>

<script>
import TcForm from 'tc-components/components/TcForm';
import TcFormField from 'tc-components/components/TcFormField';
import themable from 'tc-components/mixins/themable';

export default {
  name: 'TcDocsColorsForm',

  components: {
    TcForm,
    TcFormField,
  },

  mixins: [themable],

  computed: {
    colors() {
      return this.$tcComponents.colors;
    },
  },

  methods: {
    updateColor(colorKey, color) {
      this.$tcComponents.updateColors({
        [colorKey]: color,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-colors-form.tc-form {
  margin-top: $tc-spacing--container-small - $tc-spacing--form * 0.5;
}

.tc-docs-colors-form__color {
  border-radius: $tc-border-radius--circle;
  flex-shrink: 0;
  height: $tc-height--input;
  margin-right: $tc-spacing--input;
  width: $tc-height--input;
}

.tc-docs-colors-form__field {
  flex-grow: 1;
  width: 0;
}

.tc-docs-colors-form__item {
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  width: calc(100% - #{$tc-spacing--form});
}

@media (min-width: $tc-width--navigation-drawer) {
  .tc-docs-colors-form__item {
    width: $tc-width--navigation-drawer - $tc-spacing--container-large * 2;
  }
}
</style>

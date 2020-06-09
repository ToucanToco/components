<template>
  <div class="tc-docs-page">
    <TcDocsBreadcrumbs class="tc-docs-page__breadcrumb" />
    <template v-if="isRaw">
      <slot />
    </template>
    <template v-else>
      <TcDocsLabel>{{ label }}</TcDocsLabel>
      <TcDocsDescription v-if="hasDescription" subtitle>{{ description }}</TcDocsDescription>
      <TcDocsLabel level="2">Usage</TcDocsLabel>
      <TcDocsExample
        v-model="valueModel"
        :center="centerExample"
        :label="label"
        :options="mainComponentOptions"
      >
        <slot />
      </TcDocsExample>
      <TcDocsLabel level="2">Api</TcDocsLabel>
      <TcDocsApi :events="events" :label="label" :options="options" :slots="slots" />
    </template>
  </div>
</template>

<script>
import TcDocsApi from 'tc-components/docs/components/TcDocsApi';
import TcDocsBreadcrumbs from 'tc-components/docs/components/TcDocsBreadcrumbs';
import TcDocsDescription from 'tc-components/docs/components/TcDocsDescription';
import TcDocsExample from 'tc-components/docs/components/TcDocsExample';
import TcDocsLabel from 'tc-components/docs/components/TcDocsLabel';
import { TC_COMPONENT_THEMES } from 'tc-components/mixins/tcComponent';
import getDocsDefaultProps from 'tc-components/docs/utils/getDocsDefaultProps';
import getDocsOptions from 'tc-components/docs/utils/getDocsOptions';

export default {
  name: 'TcDocsPage',

  components: {
    TcDocsApi,
    TcDocsBreadcrumbs,
    TcDocsDescription,
    TcDocsExample,
    TcDocsLabel,
  },

  props: {
    centerExample: {
      default: false,
      type: Boolean,
    },
    components: {
      default: undefined,
      type: [Array, Object],
    },
    description: {
      default: undefined,
      type: String,
    },
    events: {
      default: undefined,
      type: Object,
    },
    slots: {
      default: undefined,
      type: Object,
    },
    value: {
      default: undefined,
      type: Object,
    },
  },

  computed: {
    hasDescription() {
      return this.description !== undefined;
    },
    hasMultipleComponents() {
      return !this.isRaw && Array.isArray(this.components);
    },
    isRaw() {
      return this.components === undefined;
    },
    label() {
      return this.mainComponent.name;
    },
    mainComponent() {
      if (this.isRaw) {
        return {};
      }

      return this.hasMultipleComponents ? this.components[0] : this.components;
    },
    mainComponentOptions() {
      return this.hasMultipleComponents ? this.options[this.label] : this.options;
    },
    options() {
      if (this.isRaw) {
        return undefined;
      }

      return this.hasMultipleComponents
        ? Object.fromEntries(
            this.components.map((component) => [component.name, getDocsOptions(component)]),
          )
        : getDocsOptions(this.components);
    },
    theme() {
      return this.$route.params.theme === undefined
        ? TC_COMPONENT_THEMES.DEFAULT
        : this.$route.params.theme;
    },
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  created() {
    if (!this.isRaw) {
      this.valueModel = {
        ...getDocsDefaultProps(this.mainComponentOptions),
        ...(this.value === undefined ? {} : this.value),
      };
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: $tc-spacing--container-large;
}

.tc-docs-page /deep/ > * {
  flex-shrink: 0;
}
</style>

<template>
  <div class="tc-docs-page">
    <TcDocsBreadcrumbs class="tc-docs-page__breadcrumb" :dark="isDark" />
    <template v-if="isRaw">
      <slot />
    </template>
    <template v-else>
      <TcDocsLabel :dark="isDark">{{ label }}</TcDocsLabel>
      <TcDocsDescription v-if="hasDescription" subtitle>{{ description }}</TcDocsDescription>
      <TcDocsLabel :dark="isDark" level="2">Usage</TcDocsLabel>
      <TcDocsExample
        v-model="valueModel"
        :center="centerExample"
        :dark="isDark"
        :label="label"
        :options="mainComponentOptions"
      >
        <slot />
      </TcDocsExample>
      <TcDocsLabel :dark="isDark" level="2">Api</TcDocsLabel>
      <TcDocsApi :dark="isDark" :events="events" :label="label" :options="options" :slots="slots" />
    </template>
  </div>
</template>

<script>
import { THEMES } from 'tc-components/variables';

import TcDocsApi from '@/components/TcDocsApi';
import TcDocsBreadcrumbs from '@/components/TcDocsBreadcrumbs';
import TcDocsDescription from '@/components/TcDocsDescription';
import TcDocsExample from '@/components/TcDocsExample';
import TcDocsLabel from '@/components/TcDocsLabel';
import getDocsDefaultProps from '@/utils/getDocsDefaultProps';
import getDocsOptions from '@/utils/getDocsOptions';

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
    isDark() {
      return this.$route.params.theme === THEMES.DARK;
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
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  watch: {
    isDark(isDark) {
      if (this.value !== undefined && this.value.dark !== isDark) {
        this.$set(this.valueModel, 'dark', isDark);
      }
    },
  },

  created() {
    if (!this.isRaw) {
      const newValue = {
        ...getDocsDefaultProps(this.mainComponentOptions),
        ...(this.value === undefined ? {} : this.value),
      };

      if (newValue.dark !== undefined) {
        newValue.dark = this.$route.params.theme === THEMES.DARK;
      }

      this.valueModel = newValue;
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

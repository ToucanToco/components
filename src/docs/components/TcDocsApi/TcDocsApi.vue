<template>
  <div class="tc-docs-api">
    <TcSelect
      v-if="hasMultipleComponents"
      v-model="selectedComponentName"
      class="tc-docs-api__select"
      :dark="dark"
      :items="componentsNames"
    />
    <TcDocsApiComponent
      :dark="dark"
      :events="selectedEvents"
      :label="selectedComponentName"
      :options="selectedOptions"
      :slots="selectedSlots"
    />
  </div>
</template>

<script>
import TcSelect from 'tc-components/components/TcSelect';
import themable from 'tc-components/mixins/themable';

import TcDocsApiComponent from './TcDocsApiComponent.vue';

export default {
  name: 'TcDocsApi',

  components: {
    TcDocsApiComponent,
    TcSelect,
  },

  mixins: [themable],

  props: {
    events: {
      default: undefined,
      type: Object,
    },
    label: {
      default: undefined,
      type: String,
    },
    options: {
      default: undefined,
      type: Object,
    },
    slots: {
      default: undefined,
      type: Object,
    },
  },

  data() {
    return {
      selectedComponentName: undefined,
    };
  },

  computed: {
    componentsNames() {
      return this.hasMultipleComponents ? Object.keys(this.options) : [this.label];
    },
    getSelectionValue() {
      return this.hasMultipleComponents
        ? (key) => (this[key] === undefined ? undefined : this[key][this.selectedComponentName])
        : (key) => this[key];
    },
    hasMultipleComponents() {
      if (this.options === undefined) {
        return false;
      }

      const optionsKeys = Object.keys(this.options);

      return optionsKeys.length > 0 && optionsKeys.every((optionKey) => optionKey.startsWith('Tc'));
    },
    selectedEvents() {
      return this.getSelectionValue('events');
    },
    selectedOptions() {
      return this.getSelectionValue('options');
    },
    selectedSlots() {
      return this.getSelectionValue('slots');
    },
  },

  created() {
    this.selectedComponentName = this.componentsNames[0];
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-api {
  display: flex;
  flex-direction: column;
  margin-top: $tc-spacing--container-small;
}

.tc-docs-api__select {
  align-self: flex-start;
}
</style>

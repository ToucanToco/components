<template>
  <div class="tc-docs-api-component" :class="elementClass">
    <TcTabs v-model="selectedTab" class="tc-docs-api-component__tabs">
      <TcTab v-if="hasProps" value="props">Props</TcTab>
      <TcTab v-if="hasSlots" value="slots">Slots</TcTab>
      <TcTab v-if="hasEvents" value="events">Events</TcTab>
    </TcTabs>
    <div class="tc-docs-api-component__body">
      <div v-for="item in items" :key="item.label" class="tc-docs-api-component__item">
        <div
          v-for="prop in item.props"
          :key="prop.label"
          class="tc-docs-api-component__prop"
          :class="prop.elementClass"
        >
          <div class="tc-docs-api-component__label" :style="prop.labelStyle">
            <TcText xx-small>{{ prop.label }}</TcText>
          </div>
          <div class="tc-docs-api-component__value">
            <TcText :monospace="prop.isMonospace">{{ prop.value }}</TcText>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TcTab, TcTabs } from 'tc-components/components/TcTabs';
import TcText from 'tc-components/components/TcText';
import tcComponent from 'tc-components/mixins/tcComponent';

const _getPropDescription = function (label, name, options) {
  if (options.group !== undefined) {
    return `Applies the \`${name}\` ${options.group} variant to the component.`;
  }
  if (name === 'value') {
    switch (label) {
      case 'TcCheckbox':
      case 'TcFormField':
      case 'TcRadioGroup':
      case 'TcSelect':
      case 'TcSwitch':
      case 'TcTextField':
        return "The input's value.";
      case 'TcDialog':
      case 'TcNavigationDrawer':
      case 'TcPopover':
        return 'Controls whether the component is visible.';
      case 'TcNavigationSection':
        return "The navigation drawer's value when this component is selected.";
      case 'TcRadio':
        return "The radio group's value when this component is selected.";
      case 'TcTab':
        return "The tabs' value when this component is selected.";
      case 'TcTabs':
        return "The selected tab's value.";
      default:
        return undefined;
    }
  }

  switch (name) {
    case 'compact':
      return "Applies the `flat` mode variant to the component. Defaults to its parent's mode.";
    case 'container':
      return "The components' template will be moved as a child of this element to prevent it from being cropped by an overflow: auto or hidden parent.";
    case 'dark':
      return "Applies the `dark` theme variant to the component. Defaults to its parent's theme.";
    case 'error':
      return 'Puts the input in a manual error state.';
    case 'errorMessages':
      return 'Puts the input in an error state and passes through custom error messages.';
    case 'groupLabel':
      return 'The property used to group items.';
    case 'hideSelected':
      return 'Do not display in the options list the item that is selected.';
    case 'hint':
      return 'Adds hint text.';
    case 'href':
      return 'Converts the component into an `<a>` HTML tag.';
    case 'icon':
      return 'Adds this icon to the component.';
    case 'id':
      return "The input's id attribute.";
    case 'itemLabel':
      return 'The property used to display items. Defaults to `itemValue`.';
    case 'items':
      return 'Can be an array of objects or an array of strings.';
    case 'itemValue':
      return "The property used when returning the selected items's value. If unset, the whole item is returned.";
    case 'label':
      return 'Adds a label to the component.';
    case 'level':
      return "Sets the component's heading level. E.g. 1 will be `<h1>`.";
    case 'messages':
      return 'Displays a list of messages or message if using a string.';
    case 'offLabel':
      return 'Adds a label to the `false` value of the component.';
    case 'placeholder':
      return "Sets the input's placeholder text.";
    case 'overrides':
      return 'Overrides specified variants.';
    case 'to':
      return 'Converts the component to a `ViewLink`.';
    default:
      return undefined;
  }
};

export default {
  name: 'TcDocsApiComponent',

  components: {
    TcTab,
    TcTabs,
    TcText,
  },

  mixins: [tcComponent],

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
      selectedComponent: undefined,
      selectedTab: undefined,
    };
  },

  computed: {
    describedEvents() {
      if (!this.hasEvents) {
        return [];
      }

      return Object.entries(this.events).map(([name, description]) => ({
        label: name,
        props: [
          {
            elementClass: 'tc-docs-api-component__prop--type-name',
            isMonospace: true,
            label: 'Name',
            value: name,
          },
          {
            elementClass: 'tc-docs-api-component__prop--type-type',
            isMonospace: true,
            label: 'Type',
            value: name === 'input' ? this.options.value.types.join(' | ') : 'Event',
          },
          {
            elementClass: 'tc-docs-api-component__prop--type-description',
            isMonospace: false,
            label: 'Description',
            value: description,
          },
        ],
      }));
    },
    describedProps() {
      if (!this.hasProps) {
        return [];
      }

      return Object.entries(this.options).flatMap(([name, options]) => {
        if (options.types[0] === 'Booleans') {
          return options.values.map((value) => {
            const description = _getPropDescription(this.label, value, { group: name });

            return {
              label: value,
              props: [
                {
                  elementClass: 'tc-docs-api-component__prop--type-name',
                  isMonospace: true,
                  label: 'Name',
                  value,
                },
                {
                  elementClass: 'tc-docs-api-component__prop--type-type',
                  isMonospace: true,
                  label: 'Type',
                  value: 'Boolean',
                },
                {
                  elementClass: 'tc-docs-api-component__prop--type-default',
                  isMonospace: true,
                  label: 'Default',
                  value: 'false',
                },
                {
                  elementClass: 'tc-docs-api-component__prop--type-description',
                  isMonospace: false,
                  label: 'Description',
                  labelStyle: description === undefined ? { color: 'red' } : undefined,
                  value: description,
                },
              ],
            };
          });
        }

        const description = _getPropDescription(this.label, name, options);

        return [
          {
            label: name,
            props: [
              {
                elementClass: 'tc-docs-api-component__prop--type-name',
                isMonospace: true,
                label: 'Name',
                value: name,
              },
              {
                elementClass: 'tc-docs-api-component__prop--type-type',
                isMonospace: true,
                label: 'Type',
                value: options.types.join(' | '),
              },
              {
                elementClass: 'tc-docs-api-component__prop--type-default',
                isMonospace: true,
                label: 'Default',
                value: Array.isArray(options.value)
                  ? JSON.stringify(options.value)
                  : String(options.value),
              },
              {
                elementClass: 'tc-docs-api-component__prop--type-description',
                isMonospace: false,
                label: 'Description',
                labelStyle: description === undefined ? { color: 'red' } : undefined,
                value: description,
              },
            ],
          },
        ];
      });
    },
    describedSlots() {
      return this.hasSlots
        ? Object.entries(this.slots).map(([name, description]) => ({
            label: name,
            props: [
              {
                elementClass: 'tc-docs-api-component__prop--type-name',
                isMonospace: true,
                label: 'Name',
                value: name,
              },
              {
                elementClass: 'tc-docs-api-component__prop--type-description',
                isMonospace: false,
                label: 'Description',
                value: description,
              },
            ],
          }))
        : [];
    },
    elementClass() {
      return `tc-docs-api-component--theme-${this.theme}`;
    },
    items() {
      switch (this.selectedTab) {
        case 'events':
          return this.describedEvents;
        case 'slots':
          return this.describedSlots;
        default:
          return this.describedProps;
      }
    },
    hasEvents() {
      return this.events !== undefined;
    },
    hasProps() {
      return this.options !== undefined && Object.keys(this.options).length > 0;
    },
    hasSlots() {
      return this.slots !== undefined;
    },
  },

  watch: {
    hasEvents: {
      handler(hasEvents) {
        if (hasEvents && this.selectedTab === undefined && !this.hasProps && !this.hasSlots) {
          this.selectedTab = 'events';
        } else if (!hasEvents && this.selectedTab === 'events') {
          if (this.hasProps) {
            this.selectedTab = 'props';
          } else if (this.hasSlots) {
            this.selectedTab = 'slots';
          } else {
            this.selectedTab = undefined;
          }
        }
      },
      immediate: true,
    },
    hasProps: {
      handler(hasProps) {
        if (hasProps && this.selectedTab === undefined) {
          this.selectedTab = 'props';
        } else if (!hasProps && this.selectedTab === 'props') {
          if (this.hasSlots) {
            this.selectedTab = 'slots';
          } else if (this.hasEvents) {
            this.selectedTab = 'events';
          } else {
            this.selectedTab = undefined;
          }
        }
      },
      immediate: true,
    },
    hasSlots: {
      handler(hasSlots) {
        if (hasSlots && this.selectedTab === undefined && !this.hasProps) {
          this.selectedTab = 'slots';
        } else if (!hasSlots && this.selectedTab === 'slots') {
          if (this.hasProps) {
            this.selectedTab = 'props';
          } else if (this.hasEvents) {
            this.selectedTab = 'events';
          } else {
            this.selectedTab = undefined;
          }
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-api-component {
  display: flex;
  flex-direction: column;
}

.tc-docs-api-component--theme-dark .tc-docs-api-component__body {
  background-color: $tc-color--grey-dark;
}

.tc-docs-api-component--theme-dark .tc-docs-api-component__item {
  background-color: $tc-color--black;
}

.tc-docs-api-component--theme-dark .tc-docs-api-component__prop--type-default,
.tc-docs-api-component--theme-dark .tc-docs-api-component__prop--type-description,
.tc-docs-api-component--theme-dark .tc-docs-api-component__prop--type-type {
  color: $tc-color--white;
}

.tc-docs-api-component--theme-light .tc-docs-api-component__body {
  background-color: $tc-color--grey-light-2;
}

.tc-docs-api-component--theme-light .tc-docs-api-component__item {
  background-color: $tc-color--white;
}

.tc-docs-api-component--theme-light .tc-docs-api-component__prop--type-default,
.tc-docs-api-component--theme-light .tc-docs-api-component__prop--type-description,
.tc-docs-api-component--theme-light .tc-docs-api-component__prop--type-type {
  color: $tc-color--black;
}

.tc-docs-api-component__body {
  border: $tc-size--separator solid transparent;
  border-top: none;
  display: grid;
  grid-gap: $tc-size--separator;
  max-height: calc(100vh - #{$tc-height--app-bar + $tc-spacing--container-small + $tc-height--tab});
  overflow: auto;
}

.tc-docs-api-component__item {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: $tc-spacing--input-narrow $tc-spacing--input * 0.5;
}

.tc-docs-api-component__label {
  color: $tc-color--grey;
}

.tc-docs-api-component__prop {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-left: $tc-spacing--input * 0.5;
  padding-right: $tc-spacing--input * 0.5;
}

.tc-docs-api-component__prop--type-default {
  margin-top: $tc-spacing--input-narrow;
}

.tc-docs-api-component__prop--type-description {
  margin-top: $tc-spacing--input-narrow;
}

.tc-docs-api-component__prop--type-type {
  margin-top: $tc-spacing--input-narrow;
}

.tc-docs-api-component__value {
  margin-top: $tc-spacing--message;
}

@media (min-width: $tc-width--navigation-drawer * 2) {
  .tc-docs-api-component__item {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .tc-docs-api-component__prop--type-default {
    margin-top: 0;
    width: 25%;
  }

  .tc-docs-api-component__prop--type-description {
    width: 100%;
  }

  .tc-docs-api-component__prop--type-name {
    color: $tc-color--studio;
    width: 25%;
  }

  .tc-docs-api-component__prop--type-type {
    margin-top: 0;
    width: 50%;
  }
}
</style>

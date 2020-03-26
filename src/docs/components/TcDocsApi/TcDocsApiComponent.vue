<template>
  <div class="tc-docs-api-component" :class="elementClass">
    <TcTabs v-model="selectedTab" class="tc-docs-api-component__tabs" :dark="dark">
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
          <div class="tc-docs-api-component__label">
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
import { TcTab, TcTabs } from '../../../components/TcTabs';
import TcText from '../../../components/TcText';
import themable from '../../../mixins/themable';

const _getPropDescription = function(label, name, options) {
  if (options.group !== undefined) {
    return `Applies the \`${name}\` ${options.group} variant to the component.`;
  }
  if (name === 'value') {
    switch (label) {
      case 'TcCheckbox':
      case 'TcRadioGroup':
      case 'TcSelect':
      case 'TcSwitch':
      case 'TcTextField':
        return "The input's value.";
      case 'TcDialog':
      case 'TcNavigationDrawer':
        return 'Controls whether the component is visible.';
      case 'TcNavigationSection':
        return "The navigation drawer's value when this component is selected.";
      case 'TcRadio':
        return "The radio group's value when this component is selected";
      case 'TcTab':
        return "The tabs' value when this component is selected";
      case 'TcTabs':
        return "The selected tab's value";
      default:
        return undefined;
    }
  }

  switch (name) {
    case 'error':
      return 'Puts the input in a manual error state.';
    case 'errorMessages':
      return 'Puts the input in an error state and pases through custom error messages.';
    case 'href':
      return 'Converts the component into an `<a>` HTML tag.';
    case 'icon':
      return 'Adds this icon to the component.';
    case 'items':
      return 'Can be an array of objects or an array of strings. When using objects, will look for a label and value field.';
    case 'hint':
      return 'Adds hint text.';
    case 'label':
      return 'Adds a label to the component';
    case 'level':
      return 'Sets the components heading level. E.g. 1 will be `<h1>`.';
    case 'messages':
      return 'Displays a list of messages or message if using a string.';
    case 'offLabel':
      return 'Adds a label to the `false` value of the component.';
    case 'placeholder':
      return "Sets the input's placeholder text.";
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
      selectedComponent: undefined,
      selectedTab: undefined,
    };
  },

  computed: {
    describedEvents() {
      return this.hasEvents
        ? Object.entries(this.events).map(([name, description]) => ({
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
          }))
        : [];
    },
    describedProps() {
      return this.hasProps
        ? Object.entries(this.options).flatMap(([name, options]) =>
            options.types[0] === 'Booleans'
              ? options.values.map((value) => ({
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
                      value: _getPropDescription(this.label, value, {
                        group: name,
                      }),
                    },
                  ],
                }))
              : [
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
                        value: String(options.value),
                      },
                      {
                        elementClass: 'tc-docs-api-component__prop--type-description',
                        isMonospace: false,
                        label: 'Description',
                        value: _getPropDescription(this.label, name, options),
                      },
                    ],
                  },
                ],
          )
        : [];
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
      return {
        [`tc-docs-api-component--theme-${this.theme}`]: true,
      };
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
@import '../../../variables';

.tc-docs-api-component {
  display: flex;
  flex-direction: column;
}

.tc-docs-api-component--theme-dark {
  .tc-docs-api-component__body {
    background-color: $tc-color--grey-dark;
  }

  .tc-docs-api-component__item {
    background-color: $tc-color--black;
  }

  .tc-docs-api-component__prop--type-default,
  .tc-docs-api-component__prop--type-description,
  .tc-docs-api-component__prop--type-type {
    color: $tc-color--white;
  }
}

.tc-docs-api-component--theme-light {
  .tc-docs-api-component__body {
    background-color: $tc-color--grey-light-2;
  }

  .tc-docs-api-component__item {
    background-color: $tc-color--white;
  }

  .tc-docs-api-component__prop--type-default,
  .tc-docs-api-component__prop--type-description,
  .tc-docs-api-component__prop--type-type {
    color: $tc-color--black;
  }
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
  display: flex;
  flex-direction: column;
  padding: $tc-spacing--input-narrow $tc-spacing--input;
}

.tc-docs-api-component__label {
  color: $tc-color--grey;
}

.tc-docs-api-component__prop {
  display: flex;
  flex-direction: column;
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

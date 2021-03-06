<template>
  <div class="tc-docs-example" :class="elementClass">
    <TcToolbar class="tc-docs-example__toolbar" flat>
      <RouterLink class="tc-docs-example__action" :to="toOtherTheme">
        <TcIcon label="mdInvertColors" large />
      </RouterLink>
      <a
        class="tc-docs-example__action"
        :href="githubLink"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TcIcon label="mdGithub" large />
      </a>
    </TcToolbar>
    <div class="tc-docs-example__body">
      <slot />
    </div>
    <div class="tc-docs-example__options">
      <TcForm>
        <TcFormField
          v-for="formElement in formElements"
          :key="formElement.key"
          v-bind="formElement"
          :value="formValues[formElement.key]"
          @input="update(formElement.key, $event)"
        />
      </TcForm>
    </div>
  </div>
</template>

<script>
import startCase from 'lodash/startCase';
import TcForm from 'tc-components/components/TcForm';
import TcFormField, { TC_FORM_FIELD_TYPES } from 'tc-components/components/TcFormField';
import TcIcon from 'tc-components/components/TcIcon';
import TcToolbar from 'tc-components/components/TcToolbar';
import tcComponent, { TC_COMPONENT_THEMES } from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';

const _getDocsExampleEditorType = function (key, value, editor) {
  if (key === 'value' && (value.checkbox || value.switch)) {
    return TC_FORM_FIELD_TYPES.SWITCH;
  }
  switch (editor) {
    case 'boolean':
      return TC_FORM_FIELD_TYPES.SWITCH;
    case 'select':
      return TC_FORM_FIELD_TYPES.SELECT;
    default:
      return TC_FORM_FIELD_TYPES.DEFAULT;
  }
};

export default {
  name: 'TcDocsExample',

  components: {
    TcForm,
    TcFormField,
    TcIcon,
    TcToolbar,
  },

  mixins: [
    tcComponent,
    getBooleansMixin('type', {
      DEFAULT: 'contain',

      CENTER: 'center',
    }),
  ],

  props: {
    label: {
      default: undefined,
      type: String,
    },
    options: {
      default: undefined,
      type: Object,
    },
    value: {
      default: undefined,
      type: Object,
    },
  },

  computed: {
    elementClass() {
      return [`tc-docs-example--theme-${this.theme}`, `tc-docs-example--type-${this.type}`];
    },
    formElements() {
      if (this.options === undefined) {
        return [];
      }

      return Object.entries(this.options)
        .filter(([key]) => key !== 'dark')
        .map(([key, options]) => {
          const formElement = {
            [_getDocsExampleEditorType(key, this.value, options.editor)]: true,
            key,
            label: startCase(key),
          };

          if (options.editor === 'select') {
            formElement.itemLabel = 'label';
            formElement.items = [
              { label: 'Default', value: undefined },
              ...options.values.map((value) => ({
                label: startCase(value),
                value,
              })),
            ];
            formElement.itemValue = 'value';
          }

          return formElement;
        });
    },
    formValues() {
      if (this.options === undefined) {
        return {};
      }

      return Object.fromEntries(
        Object.entries(this.options).map(([key, options]) => {
          if (options.types[0] === 'Booleans') {
            return [key, options.values.find((value) => this.value[value])];
          }

          const formValue = this.value[key];

          if (Array.isArray(formValue)) {
            const stringifiedValue = JSON.stringify(formValue);

            if (stringifiedValue.includes('{')) {
              return [key, stringifiedValue];
            }
          }

          return [key, formValue];
        }),
      );
    },
    githubLink() {
      return `https://github.com/ToucanToco/components/tree/master/src/docs/pages/components/${this.label}.vue`;
    },
    toOtherTheme() {
      return {
        params: {
          theme:
            this.theme === TC_COMPONENT_THEMES.DEFAULT
              ? TC_COMPONENT_THEMES.DARK
              : TC_COMPONENT_THEMES.DEFAULT,
        },
      };
    },
  },

  methods: {
    update(key, value) {
      const option = this.options[key];
      const updatedValue = { ...this.value };

      if (option.types[0] === 'Booleans') {
        option.values.forEach((o) => {
          updatedValue[o] = o === value;
        });
      } else if (value === '') {
        updatedValue[key] = undefined;
      } else if (
        option.editor === 'array' &&
        typeof value === 'string' &&
        (value.includes(',') || !option.types.includes('String'))
      ) {
        updatedValue[key] = /^\[.*\]$/.test(value) ? JSON.parse(value) : value.split(',');
      } else {
        updatedValue[key] = value;
      }

      this.$emit('input', updatedValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-example {
  border: $tc-size--separator solid transparent;
  box-sizing: border-box;
  display: grid;
  grid-gap: $tc-size--separator;
  grid-template-areas: 'toolbar' 'body' 'options';
  grid-template-rows: $tc-height--toolbar 1fr 1fr;
  height: $tc-width--navigation-drawer;
  margin-top: $tc-spacing--container-small;
}

.tc-docs-example--theme-dark {
  background-color: $tc-color--grey-dark;
}

.tc-docs-example--theme-dark .tc-docs-example__action {
  color: $tc-color--grey-light-1;
}

.tc-docs-example--theme-dark .tc-docs-example__action:focus,
.tc-docs-example--theme-dark .tc-docs-example__action:hover {
  color: $tc-color--white;
}

.tc-docs-example--theme-dark .tc-docs-example__body,
.tc-docs-example--theme-dark .tc-docs-example__options {
  background-color: $tc-color--black;
}

.tc-docs-example--theme-light {
  background-color: $tc-color--grey-light-2;
}

.tc-docs-example--theme-light .tc-docs-example__action {
  color: $tc-color--grey;
}

.tc-docs-example--theme-light .tc-docs-example__action:focus,
.tc-docs-example--theme-light .tc-docs-example__action:hover {
  color: $tc-color--black;
}

.tc-docs-example--theme-light .tc-docs-example__body,
.tc-docs-example--theme-light .tc-docs-example__options {
  background-color: $tc-color--white;
}

.tc-docs-example--type-center .tc-docs-example__body {
  align-items: center;
  justify-content: center;
}

.tc-docs-example__action {
  cursor: pointer;
  padding: ($tc-height--toolbar - $tc-font-size--large) * 0.5;
}

.tc-docs-example__body {
  display: flex;
  flex-direction: column;
  grid-area: body;
  overflow: auto;
  position: relative;
}

.tc-docs-example__options {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  grid-area: options;
  overflow: auto;
  padding: $tc-spacing--container;
}

.tc-docs-example__options::after {
  content: '';
  flex-shrink: 0;
  height: $tc-spacing--container;
}

.tc-docs-example__toolbar {
  grid-area: toolbar;
  justify-content: flex-end;
}

@media (min-width: $tc-width--navigation-drawer * 2) {
  .tc-docs-example {
    grid-template-areas: 'toolbar toolbar' 'body options';
    grid-template-columns: 2fr 1fr;
    grid-template-rows: $tc-height--toolbar 1fr;
    max-height: calc(100vh - #{$tc-spacing--container-small + $tc-height--app-bar});
  }
}

@media (min-width: $tc-width--navigation-drawer * 3) {
  .tc-docs-example {
    grid-template-columns: 3fr 1fr;
  }
}
</style>

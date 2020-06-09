<template>
  <div class="tc-docs-layout" :class="elementClass">
    <TcAppBar class="tc-docs-layout__app-bar">
      <TcClickable class="tc-docs-layout__nav-toggle" @click="openNavigationDrawer()">
        <TcText>Open navigation</TcText>
      </TcClickable>
    </TcAppBar>
    <TcNavigationDrawer
      v-model="isNavigationDrawerOpenedModel"
      class="tc-docs-layout__navigation-drawer"
    >
      <TcNavigationButton :to="{ name: 'Index', params: { theme } }">Index</TcNavigationButton>
      <TcNavigationButton :to="{ name: 'QuickStart', params: { theme } }"
        >Quick Start</TcNavigationButton
      >
      <TcNavigationSection>
        <template #label>Components</template>
        <TcNavigationButton level="2" :to="{ name: 'TcAppBar', params: { theme } }"
          >App Bar</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcButton', params: { theme } }"
          >Button</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcCheckbox', params: { theme } }"
          >Checkbox</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcClickable', params: { theme } }"
          >Clickable</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcDialog', params: { theme } }"
          >Dialog</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcForm', params: { theme } }"
          >Form</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcFormField', params: { theme } }"
          >Form Field</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcIcon', params: { theme } }"
          >Icon</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcNavigationDrawer', params: { theme } }"
          >Navigation Drawer</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcRadioGroup', params: { theme } }"
          >Radio Group</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcSelect', params: { theme } }"
          >Select</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcSwitch', params: { theme } }"
          >Switch</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcTabs', params: { theme } }"
          >Tabs</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcText', params: { theme } }"
          >Text</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcTextField', params: { theme } }"
          >Text Field</TcNavigationButton
        >
        <TcNavigationButton level="2" :to="{ name: 'TcToolbar', params: { theme } }"
          >Toolbar</TcNavigationButton
        >
      </TcNavigationSection>
    </TcNavigationDrawer>
    <RouterView class="tc-docs-layout__body" />
  </div>
</template>

<script>
import TcAppBar from 'tc-components/components/TcAppBar';
import TcClickable from 'tc-components/components/TcClickable';
import {
  TcNavigationButton,
  TcNavigationDrawer,
  TcNavigationSection,
} from 'tc-components/components/TcNavigationDrawer';
import TcText from 'tc-components/components/TcText';
import { TC_COMPONENT_THEMES } from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcDocsLayout',

  components: {
    TcAppBar,
    TcClickable,
    TcNavigationButton,
    TcNavigationDrawer,
    TcNavigationSection,
    TcText,
  },

  data() {
    return {
      isNavigationDrawerOpened: false,
    };
  },

  computed: {
    elementClass() {
      return `tc-docs-layout--theme-${this.theme}`;
    },
    isNavigationDrawerOpenedModel: {
      get() {
        return this.isNavigationDrawerOpened;
      },
      set(isNavigationDrawerOpened) {
        this.isNavigationDrawerOpened = isNavigationDrawerOpened;
      },
    },
    theme() {
      return this.$route.params.theme === undefined
        ? TC_COMPONENT_THEMES.DEFAULT
        : this.$route.params.theme;
    },
  },

  watch: {
    ['$route.name']() {
      if (this.isNavigationDrawerOpened) {
        this.isNavigationDrawerOpened = false;
      }
    },
  },

  methods: {
    openNavigationDrawer() {
      this.isNavigationDrawerOpened = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-layout {
  bottom: 0;
  color: red;
  display: grid;
  grid-template-areas: 'navigation-drawer app-bar' 'navigation-drawer body';
  grid-template-columns: 0 1fr;
  grid-template-rows: $tc-height--app-bar 1fr;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
}

.tc-docs-layout--theme-dark {
  background-color: $tc-color--black;
}

.tc-docs-layout--theme-light {
  background-color: $tc-color--white;
}

.tc-docs-layout__app-bar {
  flex-shrink: 0;
  grid-area: app-bar;
  position: sticky;
  top: 0;
}

.tc-docs-layout__body {
  grid-area: body;
  justify-self: center;
  max-width: $tc-width--navigation-drawer * 3;
  min-height: 0;
  width: 100%;
}

.tc-docs-layout__body::after {
  content: '';
  flex-shrink: 0;
  height: $tc-spacing--container-large;
}

.tc-docs-layout__navigation-drawer {
  grid-area: navigation-drawer;
}

@media (min-width: $tc-width--navigation-drawer * 4) {
  .tc-docs-layout {
    grid-template-areas: 'app-bar app-bar' 'navigation-drawer body';
    grid-template-columns: $tc-width--navigation-drawer 1fr;
  }

  .tc-docs-layout__nav-toggle {
    display: none;
  }
}
</style>

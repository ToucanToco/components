<template>
  <nav class="tc-docs-breadcrumbs" :class="elementClass">
    <ul class="tc-docs-breadcrumbs__list">
      <li v-for="{ label, name } in items" :key="name" class="tc-docs-breadcrumbs__item">
        <RouterLink class="tc-docs-breadcrumbs__link" :to="{ name }">
          <TcText small>{{ label }}</TcText>
        </RouterLink>
      </li>
      <li class="tc-docs-breadcrumbs__item">
        <TcText small>{{ currentViewLabel }}</TcText>
      </li>
    </ul>
  </nav>
</template>

<script>
import startCase from 'lodash/startCase';
import TcText from 'tc-components/components/TcText';
import themable from 'tc-components/mixins/themable';

export default {
  name: 'TcDocsBreadcrumbs',

  components: {
    TcText,
  },

  mixins: [themable],

  computed: {
    currentViewLabel() {
      return startCase(this.$route.name);
    },
    elementClass() {
      return {
        [`tc-docs-breadcrumbs--theme-${this.theme}`]: true,
      };
    },
    items() {
      return this.$route.name === 'Index' ? [] : [{ label: 'Index', name: 'Index' }];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-docs-breadcrumbs {
  display: flex;
}

.tc-docs-breadcrumbs--theme-dark {
  .tc-docs-breadcrumbs__link:focus,
  .tc-docs-breadcrumbs__link:hover {
    color: $tc-color--white;
  }
}

.tc-docs-breadcrumbs--theme-light {
  .tc-docs-breadcrumbs__link:focus,
  .tc-docs-breadcrumbs__link:hover {
    color: $tc-color--black;
  }
}

.tc-docs-breadcrumbs__item {
  align-items: center;
  color: $tc-color--grey;
  display: flex;
  list-style: none;
}

.tc-docs-breadcrumbs__item:first-child::before {
  content: none;
}

.tc-docs-breadcrumbs__item::before {
  background-color: $tc-color--grey;
  content: '';
  height: $tc-font-size--small;
  margin-left: $tc-spacing--actions;
  margin-right: $tc-spacing--actions;
  transform: $tc-transform--slash;
  width: $tc-size--separator;
}

.tc-docs-breadcrumbs__link {
  color: $tc-color--studio;
  text-decoration: none;
}

.tc-docs-breadcrumbs__list {
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0;
}
</style>

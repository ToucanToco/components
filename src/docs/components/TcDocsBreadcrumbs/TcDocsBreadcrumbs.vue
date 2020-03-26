<template>
  <nav class="tc-docs-breadcrumbs">
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

import TcText from '../../../components/TcText';

export default {
  name: 'TcDocsBreadcrumbs',

  components: {
    TcText,
  },

  computed: {
    currentViewLabel() {
      return startCase(this.$route.name);
    },
    items() {
      return this.$route.name === 'Index' ? [] : [{ label: 'Index', name: 'Index' }];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../variables';

.tc-docs-breadcrumbs {
  display: flex;
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

  &:hover {
    color: $tc-color--black;
  }
}

.tc-docs-breadcrumbs__list {
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0;
}
</style>

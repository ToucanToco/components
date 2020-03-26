<template>
  <TcDocsPage v-model="props" :components="components" :events="events" :slots="slots">
    <TcNavigationDrawer v-bind="props" :style="{ height: '100%' }" @input="updateValue($event)">
      <TcNavigationButton :to="path">First chapter</TcNavigationButton>
      <TcNavigationButton :to="path">Second chapter</TcNavigationButton>
      <TcNavigationSection value="third-chapter">
        <template #label>Third chapter</template>
        <TcNavigationButton level="2" :to="path">First subchapter</TcNavigationButton>
        <TcNavigationButton level="2" :to="path">Second subchapter</TcNavigationButton>
        <TcNavigationButton level="2" :to="path">Third subchapter</TcNavigationButton>
        <TcNavigationButton level="2" :to="path">Fourth subchapter</TcNavigationButton>
      </TcNavigationSection>
    </TcNavigationDrawer>
  </TcDocsPage>
</template>

<script>
import {
  TcNavigationButton,
  TcNavigationDrawer,
  TcNavigationSection,
} from '../../../components/TcNavigationDrawer';
import TcDocsPage from '../../components/TcDocsPage';

export default {
  name: 'TcDocsPageNavigationDrawer',

  components: {
    TcDocsPage,
    TcNavigationButton,
    TcNavigationDrawer,
    TcNavigationSection,
  },

  data() {
    return {
      components: [TcNavigationDrawer, TcNavigationButton, TcNavigationSection],
      events: {
        TcNavigationButton: {
          click: 'Event that is emitted when the component is clicked.',
        },
        TcNavigationDrawer: {
          input: 'The updated bound model',
        },
      },
      props: {},
      slots: {
        TcNavigationButton: {
          default: 'The default Vue slot.',
        },
        TcNavigationDrawer: {
          default: 'The default Vue slot.',
          footer: 'The footer description slot.',
          header: 'The header actions slot.',
        },
        TcNavigationSection: {
          default: 'The default Vue slot.',
          label: "The label displayed on the component's toggle.",
        },
      },
    };
  },

  computed: {
    path() {
      return this.$route.path;
    },
  },

  methods: {
    updateValue(value) {
      this.$set(this.props, 'value', value);
    },
  },
};
</script>

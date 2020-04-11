<template>
  <Component :is="is" class="tc-navigation-button" :class="elementClass" :to="to" @click="click()">
    <TcText
      :bold="isLevel2"
      :serif="isLevel1"
      :thin="isLevel1"
      :uppercase="isLevel2"
      :x-large="isLevel1"
    >
      <slot />
    </TcText>
  </Component>
</template>

<script>
import TcClickable from '../TcClickable';
import TcText from '../TcText';

export default {
  name: 'TcNavigationButton',

  inject: ['navigationDrawer'],

  components: {
    TcClickable,
    TcText,
  },

  props: {
    level: {
      default: '1',
      type: String,
    },
    to: {
      default: undefined,
      type: [Object, String],
    },
  },

  computed: {
    elementClass() {
      return {
        [`tc-navigation-button--level-${this.level}`]: true,
        [`tc-navigation-button--theme-${this.theme}`]: true,
        [`tc-navigation-button--type-${this.type}`]: true,
      };
    },
    is() {
      return this.isLink ? 'RouterLink' : 'TcClickable';
    },
    isLevel1() {
      return this.level === '1';
    },
    isLevel2() {
      return this.level === '2';
    },
    isLink() {
      return this.to !== undefined;
    },
    theme() {
      return this.navigationDrawer.theme;
    },
    type() {
      return this.isLink ? 'link' : 'button';
    },
  },

  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../variables';

.tc-navigation-button {
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding-left: $tc-spacing--container;
  padding-right: $tc-spacing--container;
  text-decoration: none;
}

.tc-navigation-button--level-1 {
  padding-bottom: $tc-spacing--container;
  padding-top: $tc-spacing--container;
}

.tc-navigation-button--level-1.tc-navigation-button--theme-dark.tc-navigation-button--type-link {
  box-shadow: 0 $tc-size--separator 0 0 $tc-color--black;
}

.tc-navigation-button--level-1.tc-navigation-button--theme-light.tc-navigation-button--type-link {
  box-shadow: 0 $tc-size--separator 0 0 $tc-color--white;
}

.tc-navigation-button--level-1.tc-navigation-button--type-link {
  margin-bottom: $tc-size--separator;
}

.tc-navigation-button--level-2 {
  padding-bottom: $tc-spacing--container-small;
  padding-top: $tc-spacing--container-small;
}

.tc-navigation-button--theme-dark {
  color: $tc-color--black;
}

.tc-navigation-button--theme-light {
  color: $tc-color--white;
}
</style>

<template>
  <Component
    :is="is"
    class="tc-button"
    :class="elementClass"
    :href="href"
    :rel="rel"
    :style="elementStyle"
    :target="target"
    :to="to"
    @click="click()"
  >
    <TcIcon v-if="hasIcon" class="tc-button__icon" :label="icon" :small="isTextSmall" />
    <TcText bold center :small="isTextSmall" uppercase>
      <slot />
    </TcText>
  </Component>
</template>

<script>
import themable from '../../mixins/themable';
import getBooleansMixin from '../../utils/getBooleansMixin';
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_TYPES } from '../../variables';
import TcClickable from '../TcClickable';
import TcIcon from '../TcIcon';
import TcText from '../TcText';

export default {
  name: 'TcButton',

  components: {
    TcClickable,
    TcIcon,
    TcText,
  },

  mixins: [
    getBooleansMixin('color', BUTTON_COLORS),
    getBooleansMixin('size', BUTTON_SIZES),
    getBooleansMixin('type', BUTTON_TYPES),
    themable,
  ],

  props: {
    href: {
      default: undefined,
      type: String,
    },
    icon: {
      default: undefined,
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
        [`tc-button--color-${this.color}`]: true,
        [`tc-button--size-${this.size}`]: true,
        [`tc-button--theme-${this.theme}`]: true,
        [`tc-button--type-${this.type}`]: true,
      };
    },
    elementStyle() {
      return {
        backgroundColor:
          this.primary && this.type === BUTTON_TYPES.DEFAULT
            ? this.$tcComponents.colors.emphasis
            : undefined,
        color: this.primary && this.outlined ? this.$tcComponents.colors.emphasis : undefined,
      };
    },
    hasIcon() {
      return this.icon !== undefined;
    },
    is() {
      if (this.isLink) {
        return 'a';
      }
      if (this.isRouterLink) {
        return 'RouterLink';
      }

      return 'TcClickable';
    },
    isLink() {
      return this.href !== undefined;
    },
    isRouterLink() {
      return this.to !== undefined;
    },
    isTextSmall() {
      return this.size !== BUTTON_SIZES.LARGE;
    },
    rel() {
      return this.isLink ? 'noopener noreferrer' : undefined;
    },
    target() {
      return this.isLink ? '_blank' : undefined;
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

.tc-button {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--button;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
  padding-left: $tc-spacing--button - $tc-border-width--button;
  padding-right: $tc-spacing--button - $tc-border-width--button;
  text-decoration: none;
}

.tc-button--color-default.tc-button--theme-dark.tc-button--type-outlined {
  color: $tc-color--white;
}

.tc-button--color-default.tc-button--theme-dark.tc-button--type-plain {
  background-color: $tc-color--white;
  color: $tc-color--black;
}

.tc-button--color-default.tc-button--theme-light.tc-button--type-outlined {
  color: $tc-color--black;
}

.tc-button--color-default.tc-button--theme-light.tc-button--type-plain {
  background-color: $tc-color--black;
  color: $tc-color--white;
}

.tc-button--color-primary.tc-button--theme-dark.tc-button--type-plain {
  color: $tc-color--black;
}

.tc-button--color-primary.tc-button--theme-light.tc-button--type-plain {
  color: $tc-color--white;
}

.tc-button--color-secondary.tc-button--theme-dark.tc-button--type-plain {
  background-color: $tc-color--grey-dark;
  color: $tc-color--white;
}

.tc-button--color-secondary.tc-button--theme-light.tc-button--type-plain {
  background-color: $tc-color--grey-extralight-1;
  color: $tc-color--grey;
}

.tc-button--color-secondary.tc-button--type-outlined {
  color: $tc-color--grey;
}

.tc-button--color-studio.tc-button--type-outlined {
  color: $tc-color--studio;
}

.tc-button--color-studio.tc-button--type-plain {
  background-color: $tc-color--studio;
  color: $tc-color--white;
}

.tc-button--size-large {
  padding-bottom: ($tc-height--button-large - $tc-font-size--medium) * 0.5 -
    $tc-border-width--button;
  padding-top: ($tc-height--button-large - $tc-font-size--medium) * 0.5 - $tc-border-width--button;
}

.tc-button--size-medium {
  padding-bottom: ($tc-height--button-medium - $tc-font-size--small) * 0.5 -
    $tc-border-width--button;
  padding-top: ($tc-height--button-medium - $tc-font-size--small) * 0.5 - $tc-border-width--button;
}

.tc-button--size-small {
  padding-bottom: ($tc-height--button-small - $tc-font-size--small) * 0.5 - $tc-border-width--button;
  padding-top: ($tc-height--button-small - $tc-font-size--small) * 0.5 - $tc-border-width--button;
}

.tc-button--type-outlined {
  border-color: currentColor;
}

.tc-button--type-plain {
  border-color: transparent;
}

.tc-button__icon {
  margin-right: $tc-spacing--button;
}
</style>

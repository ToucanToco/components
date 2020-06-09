<template>
  <Component
    :is="is"
    class="tc-button"
    :class="elementClass"
    :href="href"
    :rel="rel"
    :target="target"
    :to="to"
    @click="click($event)"
  >
    <TcIcon v-if="hasIcon" class="tc-button__icon" :label="icon" :small="isTextSmall" />
    <TcText bold center :small="isTextSmall" uppercase>
      <slot />
    </TcText>
  </Component>
</template>

<script>
import TcClickable from 'tc-components/components/TcClickable';
import TcIcon from 'tc-components/components/TcIcon';
import TcText from 'tc-components/components/TcText';
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';

export const TC_BUTTON_COLORS = {
  DEFAULT: 'default',

  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  STUDIO: 'studio',
};

export const TC_BUTTON_SIZES = {
  DEFAULT: 'medium',

  SMALL: 'small',
  LARGE: 'large',
};

export const TC_BUTTON_TYPES = {
  DEFAULT: 'plain',

  OUTLINED: 'outlined',
};

export default {
  name: 'TcButton',

  components: {
    TcClickable,
    TcIcon,
    TcText,
  },

  mixins: [
    tcComponent,
    getBooleansMixin('color', TC_BUTTON_COLORS),
    getBooleansMixin('size', TC_BUTTON_SIZES),
    getBooleansMixin('type', TC_BUTTON_TYPES),
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
      return [
        `tc-button--color-${this.color}`,
        `tc-button--size-${this.size}`,
        `tc-button--theme-${this.theme}`,
        `tc-button--type-${this.type}`,
      ];
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
      return this.size !== TC_BUTTON_SIZES.LARGE;
    },
    rel() {
      return this.isLink ? 'noopener noreferrer' : undefined;
    },
    target() {
      return this.isLink ? '_blank' : undefined;
    },
  },

  methods: {
    click(e) {
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-button {
  align-items: center;
  border-style: solid;
  border-width: $tc-border-width--button;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  outline: none;
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

.tc-button--color-primary.tc-button--type-outlined {
  color: $tc-color--emphasis;
}

.tc-button--color-primary.tc-button--type-plain {
  background-color: $tc-color--emphasis;
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
  padding: ($tc-height--button-large - $tc-font-size--medium) * 0.5 - $tc-border-width--button
    $tc-spacing--button - $tc-border-width--button;
}

.tc-button--size-medium {
  padding: ($tc-height--button-medium - $tc-font-size--small) * 0.5 - $tc-border-width--button
    $tc-spacing--button - $tc-border-width--button;
}

.tc-button--size-small {
  padding: ($tc-height--button-small - $tc-font-size--small) * 0.5 - $tc-border-width--button
    $tc-spacing--button - $tc-border-width--button;
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

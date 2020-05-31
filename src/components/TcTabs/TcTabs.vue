<template>
  <div class="tc-tabs" :class="elementClass">
    <div class="tc-tabs__slider" :style="sliderStyle" />
    <slot />
  </div>
</template>

<script>
import themable from 'tc-components/mixins/themable';

export default {
  name: 'TcTabs',

  provide() {
    return {
      tabs: this,
    };
  },

  mixins: [themable],

  props: {
    value: {
      default: undefined,
      type: String,
    },
  },

  data() {
    return {
      sliderStyle: {},
    };
  },

  computed: {
    elementClass() {
      return {
        [`tc-tabs--theme-${this.theme}`]: true,
      };
    },
    id() {
      return `tc-tabs--${this._uid}`;
    },
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  watch: {
    value() {
      this.updateSliderStyle();
    },
  },

  mounted() {
    this.updateSliderStyle();
  },

  methods: {
    updateSliderStyle() {
      requestAnimationFrame(() => {
        if (this.value === undefined) {
          return undefined;
        }
        if (this.$el === undefined) {
          return this.updateSliderStyle();
        }

        const activeTab = this.$el.querySelector('.is-active');

        if (activeTab === null) {
          return this.updateSliderStyle();
        }

        this.sliderStyle = {
          left: `${activeTab.offsetLeft}px`,
          width: `${activeTab.offsetWidth}px`,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-tabs {
  display: flex;
  justify-content: flex-start;
  position: relative;
}

.tc-tabs--theme-dark {
  box-shadow: inset 0 (-$tc-border-width--tabs) 0 0 $tc-color--grey-dark;
}

.tc-tabs--theme-light {
  box-shadow: inset 0 (-$tc-border-width--tabs) 0 0 $tc-color--grey-light-3;
}

.tc-tabs /deep/ > * {
  margin-right: $tc-spacing--tabs;
}

.tc-tabs /deep/ > :last-child {
  margin-right: 0;
}

.tc-tabs__slider {
  background-color: $tc-color--studio;
  bottom: 0;
  height: $tc-border-width--tabs;
  position: absolute;
  transition-duration: $tc-transition-duration--tabs;
  transition-property: left, width;
}
</style>

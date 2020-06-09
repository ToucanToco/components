<template>
  <div v-if="value" class="tc-dialog" :class="elementClass">
    <div class="tc-dialog__overlay" @click="close()" />
    <div class="tc-dialog__container">
      <div class="tc-dialog__header">
        <div v-if="hasLabel" class="tc-dialog__label">
          <TcText bold large>{{ label }}</TcText>
        </div>
        <TcClickable class="tc-dialog__close" @click="close()">
          <TcIcon label="close" x-large />
        </TcClickable>
      </div>
      <div ref="body" class="tc-dialog__body">
        <div ref="content" class="tc-dialog__content">
          <slot />
        </div>
      </div>
      <div v-if="hasFooter" class="tc-dialog__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import TcClickable from 'tc-components/components/TcClickable';
import TcIcon from 'tc-components/components/TcIcon';
import TcText from 'tc-components/components/TcText';
import tcComponent from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcDialog',

  components: {
    TcClickable,
    TcIcon,
    TcText,
  },

  mixins: [tcComponent],

  props: {
    label: {
      default: undefined,
      type: String,
    },
    value: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      isScrollable: false,
    };
  },

  computed: {
    elementClass() {
      return {
        [`tc-dialog--theme-${this.theme}`]: true,
        'is-scrollable': this.isScrollable,
      };
    },
    hasFooter() {
      return this.$slots.footer !== undefined;
    },
    hasLabel() {
      return this.label !== undefined;
    },
  },

  watch: {
    async value(value) {
      if (value) {
        await this.$nextTick();
        if (this.$refs.body.offsetHeight < this.$refs.content.offsetHeight) {
          this.isScrollable = true;
        }
      }
    },
  },

  methods: {
    close() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'tc-components/variables';

.tc-dialog {
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: $tc-spacing--container;
  position: fixed;
  right: 0;
  top: 0;
  z-index: $tc-z-index--dialog;

  &.is-scrollable {
    .tc-dialog__body {
      padding-top: $tc-size--separator;
    }

    .tc-dialog__body::before {
      content: '';
      flex-shrink: 0;
      height: $tc-size--separator;
      margin-left: $tc-spacing--container;
      margin-right: $tc-spacing--container;
      position: sticky;
      top: 0;
    }

    .tc-dialog__footer {
      box-shadow: $tc-box-shadow--overflow;
    }
  }
}

.tc-dialog--theme-dark {
  &.is-scrollable {
    .tc-dialog__body::before {
      background-color: $tc-color--grey-dark;
    }
  }

  .tc-dialog__close {
    color: $tc-color--white;
    margin-bottom: $tc-spacing--container-large - $tc-spacing--container-small;
    margin-top: $tc-spacing--container-small - $tc-spacing--container-large;
  }

  .tc-dialog__container {
    background-color: $tc-color--black;
  }

  .tc-dialog__content {
    padding-left: $tc-spacing--container-large;
    padding-right: $tc-spacing--container-large;
  }

  .tc-dialog__footer {
    padding-bottom: $tc-spacing--container-large;
    padding-left: $tc-spacing--container-large - $tc-spacing--actions * 0.5;
    padding-right: $tc-spacing--container-large - $tc-spacing--actions * 0.5;
  }

  .tc-dialog__header {
    padding-left: $tc-spacing--container-large;
    padding-right: $tc-spacing--container-small;
    padding-top: $tc-spacing--container-large;
  }

  .tc-dialog__label {
    color: $tc-color--white;
  }
}

.tc-dialog--theme-light {
  &.is-scrollable {
    .tc-dialog__body::before {
      background-color: $tc-color--grey-light-3;
    }
  }

  .tc-dialog__close {
    color: $tc-color--black;
  }

  .tc-dialog__container {
    background-color: $tc-color--white;
    border-radius: $tc-border-radius--large;
  }

  .tc-dialog__content {
    padding-left: $tc-spacing--container;
    padding-right: $tc-spacing--container;
  }

  .tc-dialog__footer {
    padding: $tc-spacing--actions $tc-spacing--container - $tc-spacing--actions * 0.5;
  }

  .tc-dialog__footer /deep/ > :only-child {
    margin-bottom: $tc-spacing--container - $tc-spacing--actions;
    margin-top: $tc-spacing--container - $tc-spacing--actions;
  }

  .tc-dialog__header {
    padding: $tc-spacing--container;
  }

  .tc-dialog__label {
    color: $tc-color--black;
  }
}

.tc-dialog__body {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.tc-dialog__close {
  cursor: pointer;
  outline: none;
  flex-shrink: 0;
}

.tc-dialog__container {
  box-shadow: $tc-box-shadow--dialog;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  width: $tc-width--dialog;
}

.tc-dialog__content {
  display: flex;
  flex-direction: column;
  padding-bottom: $tc-spacing--container;
  padding-top: $tc-spacing--container;
}

.tc-dialog__footer {
  justify-content: center;
  display: flex;
  flex-shrink: 0;
}

.tc-dialog__footer /deep/ > * {
  margin-left: $tc-spacing--actions * 0.5;
  margin-right: $tc-spacing--actions * 0.5;
  width: $tc-width--dialog-action;
}

.tc-dialog__footer /deep/ > :only-child {
  width: 100%;
}

.tc-dialog__header {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
}

.tc-dialog__label {
  display: flex;
  flex-grow: 1;
  margin-right: $tc-spacing--container;
}

.tc-dialog__overlay {
  background-color: rgba($tc-color--black, $tc-opacity--overlay);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
</style>

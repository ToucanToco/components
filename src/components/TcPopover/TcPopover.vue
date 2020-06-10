<template>
  <div class="tc-popover" :class="elementClass" :style="elementStyle">
    <slot />
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';
import getBooleansMixin from 'tc-components/utils/getBooleansMixin';

export const TC_POPOVER_ALIGNMENTS = {
  DEFAULT: 'center',

  JUSTIFY: 'justify',
  LEFT: 'left',
  RIGHT: 'right',
};

export const TC_POPOVER_POSITIONS = {
  DEFAULT: 'top',

  BOTTOM: 'bottom',
};

export default {
  name: 'TcPopover',

  mixins: [
    tcComponent,
    getBooleansMixin('align', TC_POPOVER_ALIGNMENTS),
    getBooleansMixin('position', TC_POPOVER_POSITIONS),
  ],

  props: {
    container: {
      default() {
        return document.body;
      },
      type: [HTMLElement, String],
    },
    noPosition: {
      default: false,
      type: Boolean,
    },
    value: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      computedPosition: undefined,
      elementStyle: undefined,
      updatePositionPending: false,
    };
  },

  computed: {
    alignMethod() {
      return this[`align${this.align[0].toUpperCase()}${this.align.slice(1)}`];
    },
    containerElement() {
      if (typeof this.container === 'string') {
        return document.querySelector(this.container);
      }

      return this.container;
    },
    elementClass() {
      return {
        [`tc-popover--position-${this.noPosition ? 'none' : this.computedPosition}`]: true,
        'is-active': this.value,
      };
    },
  },

  watch: {
    containerElement() {
      this.moveToContainer();
    },
  },

  created() {
    if (this.noPosition) {
      return;
    }

    this.computedPosition = this.position;

    this.$watch('align', () => {
      if (this.value) {
        this.updatePosition();
      }
    });
    this.$watch('position', () => {
      if (this.value) {
        this.updatePosition();
      }
    });
    this.$watch('value', (value) => {
      if (value) {
        this.updatePosition();
        this.addListeners();
      } else {
        this.removeListeners();
      }
    });
  },

  mounted() {
    // Save original parent before moving into the container to use its position
    this.parent = this.$el.parentElement;

    this.moveToContainer();
  },

  beforeDestroy() {
    if (!this.noPosition) {
      this.removeListeners();
    }
    if (this.$el.parentElement !== null) {
      this.$el.parentElement.removeChild(this.$el);
    }
  },

  methods: {
    addListeners() {
      window.addEventListener('orientationchange', this.updatePosition);
      window.addEventListener('resize', this.updatePosition);
      this.parents.forEach((parent) => {
        parent.addEventListener('scroll', this.updatePosition);
      });
    },
    alignCenter(containerBounds, parentBounds) {
      const parentLeft = parentBounds.left - containerBounds.left;
      const parentRight = parentLeft + parentBounds.width;
      // Align center
      let left = parentLeft + (parentBounds.width - this.$el.offsetWidth) / 2;

      // Overflows on left
      if (left < 0) {
        // Align left
        left = parentLeft;
        // Overflows on right
      } else if (left + this.$el.offsetWidth > window.innerWidth) {
        // Align right
        left = parentRight - this.$el.offsetWidth;
      }

      return {
        left: `${left}px`,
      };
    },
    alignJustify(containerBounds, parentBounds) {
      const parentLeft = parentBounds.left - containerBounds.left;

      return {
        // Align left
        left: `${parentLeft}px`,
        // Use parent width
        width: `${parentBounds.width}px`,
      };
    },
    alignLeft(containerBounds, parentBounds) {
      const parentLeft = parentBounds.left - containerBounds.left;
      const parentRight = parentLeft + parentBounds.width;
      // Align left
      let left = parentLeft;

      if (
        // Overflows on right
        left + this.$el.offsetWidth > window.innerWidth &&
        // If aligned right, will not overflow on left
        parentRight - this.$el.offsetWidth >= 0
      ) {
        // Align right
        left = parentRight - this.$el.offsetWidth;
      }

      return {
        left: `${left}px`,
      };
    },
    alignRight(containerBounds, parentBounds) {
      const parentLeft = parentBounds.left - containerBounds.left;
      const parentRight = parentLeft + parentBounds.width;
      // Align right
      let left = parentRight - this.$el.offsetWidth;

      if (
        // Overflows on left
        left < 0 &&
        // If aligned left, will not overflow on right
        parentLeft + this.$el.offsetWidth <= window.innerWidth
      ) {
        // Align left
        left = parentLeft;
      }

      return {
        left: `${left}px`,
      };
    },
    async moveToContainer() {
      // Move the popover into the specified container to prevent its hiding by
      // an `overflow: hidden` parent
      this.containerElement.appendChild(this.$el);

      if (this.value && this.parents !== undefined) {
        this.removeListeners();
      }

      // Get all scrollable parents
      const parents = [];
      let { parent } = this;

      while (parent !== this.containerElement && parent !== null) {
        parents.push(parent);
        parent = parent.parentElement;
      }

      this.parents = parents;

      if (this.value) {
        this.addListeners();
        this.updatePosition();
      }
    },
    removeListeners() {
      window.removeEventListener('orientationchange', this.updatePosition);
      window.removeEventListener('resize', this.updatePosition);
      this.parents.forEach((parent) => {
        parent.removeEventListener('scroll', this.updatePosition);
      });
    },
    updatePosition() {
      if (this.updatePositionPending) {
        return;
      }

      this.updatePositionPending = true;

      window.requestAnimationFrame(() => {
        this.updatePositionPending = false;

        if (!this.value) {
          return undefined;
        }

        const containerBounds = this.containerElement.getBoundingClientRect();
        const parentBounds = this.parent.getBoundingClientRect();

        // Set alignment
        const elementStyle = this.alignMethod(containerBounds, parentBounds);

        const parentTop = parentBounds.top - containerBounds.top;
        const topAbove = parentTop - this.$el.offsetHeight;
        const topBelow = parentTop + parentBounds.height;
        let position;
        let top;

        if (this.bottom) {
          // Not enough space below and enough space above
          if (topBelow + this.$el.offsetHeight > window.innerHeight && topAbove >= 0) {
            position = TC_POPOVER_POSITIONS.DEFAULT;
            top = topAbove;
          } else {
            position = TC_POPOVER_POSITIONS.BOTTOM;
            top = topBelow;
          }
        } else {
          // Not enough space above and enough space below
          if (topAbove < 0 && topBelow + this.$el.offsetHeight <= window.innerHeight) {
            position = TC_POPOVER_POSITIONS.BOTTOM;
            top = topBelow;
          } else {
            position = TC_POPOVER_POSITIONS.DEFAULT;
            top = topAbove;
          }
        }

        elementStyle.top = `${top}px`;
        this.elementStyle = elementStyle;
        this.computedPosition = position;
      });
    },
  },
};
</script>

export default {
  data() {
    return {
      isFocused: false,
    };
  },

  methods: {
    blur(e) {
      this.$emit('blur', e);
      this.isFocused = false;
    },
    focus(e) {
      this.$emit('focus', e);
      this.isFocused = true;
    },
  },
};

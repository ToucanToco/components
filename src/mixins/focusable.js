export default {
  data() {
    return {
      isFocused: false,
    };
  },

  methods: {
    blur() {
      this.$emit('blur');
      this.isFocused = false;
    },
    focus() {
      this.$emit('focus');
      this.isFocused = true;
    },
  },
};

<template>
  <div
    tabindex="0"
    @click="click()"
    @keydown.enter="click()"
    @keydown.space="click()"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TcClickable',

  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

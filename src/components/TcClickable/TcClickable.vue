<template>
  <div tabindex="0" @click="click()" @keydown.enter="click()" @keydown.space="click()">
    <slot />
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcClickable',

  mixins: [tcComponent],

  methods: {
    click() {
      this.$emit('click');
    },
  },
};
</script>

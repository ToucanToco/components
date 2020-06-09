<template>
  <div
    tabindex="0"
    @click="click($event)"
    @keydown.enter="click($event)"
    @keydown.space="click($event)"
  >
    <slot />
  </div>
</template>

<script>
import tcComponent from 'tc-components/mixins/tcComponent';

export default {
  name: 'TcClickable',

  mixins: [tcComponent],

  methods: {
    click(e) {
      this.$emit('click', e);
    },
  },
};
</script>

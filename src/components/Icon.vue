<template>
  <button tabindex="1" class="icon" :data-icon="title">
    <svg class="icon__svg" viewBox="0 0 24 24"><path :d="svgPath" /></svg>
    <div class="icon__title" v-text="title"></div>
  </button>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    title: {
      type: String,
      required: true,
    },
    svgPath: {
      type: String,
      required: true,
    },
    brandColor: {
      type: String,
      default: 'unset',
    },
  },
};
</script>

<style lang="scss">
.icon {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 1em;
  cursor: pointer;
  user-select: none;

  &:hover {
    $color: #eae2f4;
    background: $color;
  }
}

.icon__svg {
  $size: 2em;
  width: $size;
  height: $size;
  margin: 0.5em;
}
</style>

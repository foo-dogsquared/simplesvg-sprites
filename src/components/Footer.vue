<template>
  <footer class="site__footer">
    <span>Maintained by <a :href="app.authorWebsite">{{ app.author }}</a></span>
    <span><a href="https://github.com/simple-icons/simple-icons">Simple Icons</a></span>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.site__footer {
  display: flex;
  justify-content: space-evenly;

  padding: 1em;
}
</style>

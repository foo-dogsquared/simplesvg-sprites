<template>
  <header class="site__header">
    <h1>{{ app.name }}</h1>
    <p>{{ app.description }}</p>
    <p>Simply select one or more icons to compile and download the resulting file.</p>
    <p><a :href="app.repo">GitHub repo</a></p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.site__header {
  margin: 1em auto;
}
</style>

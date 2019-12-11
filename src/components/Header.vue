<template>
  <header class="site__header">
    <h1>{{ app.name }}</h1>
    <p>{{ app.description }}</p>
    <p>Simply select one or more icons among the selection of {{ iconsCount }} icons from <a href="https://github.com/simple-icons/simple-icons">Simple Icons</a> to compile.</p>
    <p>Then, if you're sure of your choices, you can compile it to create the resulting SVG file(s).</p>
    <p>The code for this website is open for the public, visit the <a :href="app.repo">GitHub repo</a> to take a look at it.</p>
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
    icons: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconsCount() {
      return Object.entries(this.icons).length;
    },
  },
};
</script>

<style lang="scss">
.site__header {
  margin: 1em auto;
}
</style>

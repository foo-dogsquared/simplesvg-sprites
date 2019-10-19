<template>
  <div id="app">
    <Header :app="constants.app"></Header>
    <Main :icons="simpleIcons"></Main>
    <Footer :app="constants.app"></Footer>
  </div>
</template>

<script>
import simpleIcons from 'simple-icons';
import components from '../components';
import constants from '../constants';

export default {
  name: 'Root',
  components: {
    Header: components.Header,
    Footer: components.Footer,
    Main: components.Main,
  },
  data() {
    return {
      simpleIcons,
      constants,
    };
  },
};
</script>

<style lang="scss">
$border: 1px black solid;
$color: #eae2f4;
$fontFamily: "Fira Sans","Copper Hewitt","IBM Plex",sans;

#app {
  $size: 900px;
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: $size;
  margin: auto;

  display: flex;
  flex-flow: column;
}

button {
  border: $border;
  background: transparent;
  cursor: pointer;
  font-family: $fontFamily;
  padding: 0.5em;

  &:hover {
    background: $color;
  }
}
</style>

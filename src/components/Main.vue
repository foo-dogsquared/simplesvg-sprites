<template>
  <main class="app__main">
    <input tabindex="2" class="icons__search" @input="event => this.searchValue = event.target.value" />
    <div :class="{ 'icons--list' : listMode }" class="icons" @click="addToList">
      <Icon v-for="logo in icons"
      :key="logo.slug" :title="logo.title" :svgPath="logo.path" :brandColor="logo.hex"
      :class="[selectedIcons.indexOf(logo.title) !== -1 ? 'icon--selected' : '']"
      v-show="searchValue ? (logo.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) : true" />
    </div>

    <div id="app__controls">
      <button class="app__button" :disabled="selectedIcons.length <= 0" @click="compileSvgSprite">Compile</button>
      <button class="app__button" @click="event => this.selectedIcons = Array.from(this.iconList)">Select all</button>
      <button class="app__button" @click="event => this.selectedIcons = []">Unselect all</button>
      <button class="app__button" @click="listMode = !listMode">{{ listMode ? "Grid" : "List" }}</button>
      <span><label for="zip">Download as individual files</label><input type="checkbox" id="zip" v-model="enableZip"/></span>
    </div>
  </main>
</template>

<script>
import filesaver from 'file-saver';
import jszip from 'jszip';
import Icon from './Icon.vue';

export default {
  name: 'Main',
  props: {
    msg: String,
    icons: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedIcons: [],
      searchValue: '',
      listMode: false,
      enableZip: false,
    };
  },
  computed: {
    iconList() {
      return Object.keys(this.icons);
    },
    appControls() {
      return document.querySelector('#app__controls');
    },
  },
  components: {
    Icon,
  },
  methods: {
    addToList(event) {
      let { target } = event;

      if (target.tagName === 'path' && target.parentElement.classList.contains('icon__svg')) target = target.parentElement;
      if (target.tagName === 'svg' || target.classList.contains('icon__title')) target = target.parentElement;

      if (target.dataset.icon) {
        const index = this.selectedIcons.indexOf(target.dataset.icon);

        if (index === -1) {
          this.selectedIcons.push(target.dataset.icon);
        } else {
          this.selectedIcons.splice(index, 1);
        }
      }
    },
    compileSvgSprite() {
      if (this.enableZip) {
        const zip = new jszip();

        for (const iconName of this.selectedIcons) {
          const icon = this.icons[iconName];
          zip.file(`${icon.slug}.svg`, icon.svg);
        }

        zip.generateAsync({ type: 'blob' }).then((content) => {
          filesaver.saveAs(content, 'blob.zip');
        });

        this.selectedIcons = [];
      } else {
        let svg = '<svg xmlns="http://www.w3.org/2000/svg">';

        for (const iconName of this.selectedIcons) {
          const icon = this.icons[iconName];
          svg += `\n\t<symbol id="${icon.slug}" viewBox="0 0 24 24">\n\t\t<path d="${icon.path}" />\n\t</symbol>\n`;
        }

        svg += '</svg>';

        const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        filesaver.saveAs(svgBlob, 'blob.svg');
        this.selectedIcons = [];
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app__main {
  flex: 1 1 0%;
  margin: 1em 0;
}

.icons__search {
  width: 80%;
}

.icons {
  $size: 100px;
  $padding: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
  grid-template-rows: repeat(auto-fill, minmax($size, 1fr));
  padding: $padding;
  grid-gap: 10px;
}

.icons--list {
  $size: 100px;
  $padding: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($size * 1.75, 1fr));
  grid-template-rows: repeat(auto-fill, minmax($size / 2, 1fr));
  padding: 0.5em;
  grid-gap: 10px;

  .icon {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 0.5em;
    cursor: pointer;
    user-select: none;
  }
}

.icon--selected {
  background: black;
  fill: white;
  color: white;
}

#app__controls {
  background: white;
  border: 3px black solid;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  padding: 1em;
  margin: 0.5em;
  height: 50px;
  overflow: auto;
}

.app__button {
  margin: 0.5em;
}
</style>

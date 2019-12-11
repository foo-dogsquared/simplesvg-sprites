<template>
  <main class="app__main">
    <div class="app__status" :class="{ 'app__status--resize' : statusResize && !statusMinimize && selectedIcons.length > 0 }">
      <button v-show="selectedIcons.length > 0" class="status__minimize" @click="statusMinimize = !statusMinimize"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg></button>
      <button v-show="selectedIcons.length > 0 && !statusMinimize" class="status__resize" @click="statusResize = !statusResize"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 5h-3l5-5 5 5h-3v3h-4v-3zm4 14h3l-5 5-5-5h3v-3h4v3zm-9-5v3l-5-5 5-5v3h3v4h-3zm14-4v-3l5 5-5 5v-3h-3v-4h3z"/></svg></button>
      <input tabindex="2" class="status__search" @input="event => this.searchValue = event.target.value" @keyup.esc="event => event.target.blur()" />
      <div v-show="statusResize" class="status__icons-list" @click="goToIcon">
        <span class="status__selected-icon" v-for="selectedIcon in selectedIcons" :key="selectedIcon" v-text="selectedIcon"></span>
      </div>
      <p v-show="selectedIcons.length > 0 && !statusResize && !statusMinimize">You have chosen {{ selectedIcons.length }} icons.</p>
    </div>
    <div :class="{ 'icons--list' : listMode }" class="icons" @click="addToList">
      <Icon v-for="logo in validIconList"
      :key="logo.slug" :title="logo.title" :svgPath="logo.path" :brandColor="logo.hex"
      :class="[selectedIcons.indexOf(logo.title) !== -1 ? 'icon--selected' : '']"
      />
    </div>

    <div id="app__controls">
      <button class="app__button" :disabled="selectedIcons.length <= 0" @click="compileSvgSprite">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
      </button>

      <button class="app__button" @click="addAllValidIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></svg>
      </button>

      <button class="app__button" @click="removeAllValidIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm5.959-17v2h-8v-2h8zm0 24v-2h-8v2h8zm2-22h4v4h2v-6h-6v2zm-18 14h2v-8h-2v8zm2-10v-4h4v-2h-6v6h2zm22 2h-2v8h2v-8zm-2 10v4h-4v2h6v-6h-2zm-16 4h-4v-4h-2v6h6v-2z"/></svg>
      </button>

      <button class="app__button" v-if="listMode" @click="listMode = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/></svg>
      </button>
      <button class="app__button" v-else @click="listMode = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3h-16v-2h16v2zm0 3h-16v2h16v-2zm0 5h-16v2h16v-2zm0 5h-16v2h16v-2zm0 5h-16v2h16v-2zm-18-20h-6v6h6v-6zm0 8h-6v6h6v-6zm0 8h-6v6h6v-6z"/></svg>
      </button>

      <span><label for="zip">Download as individual files</label><input type="checkbox" id="zip" v-model="enableZip"/></span>
    </div>
  </main>
</template>

<script>
import filesaver from 'file-saver';
import jszip from 'jszip';
import fusejs from 'fuse.js';
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
      statusResize: false,
      statusMinimize: false,
      listMode: false,
      enableZip: false,
      currentCompilingProcesses: [],
    };
  },
  computed: {
    iconList() {
      return Object.values(this.icons);
    },
    searchEngine() {
      return new fusejs(this.iconList, {
        keys: ['title', 'hex'],
      });
    },
    validIconList() {
      return this.searchValue ? this.searchEngine.search(this.searchValue) : this.iconList;
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
          this.selectedIcons.unshift(target.dataset.icon);
        } else {
          this.selectedIcons.splice(index, 1);
        }
      }
    },
    addAllValidIcon() {
      for (const icon of this.validIconList) {
        if (this.selectedIcons.indexOf(icon.title) === -1) {
          this.selectedIcons.unshift(icon.title);
        }
      }
    },
    removeAllValidIcon() {
      for (const icon of this.validIconList) {
        const index = this.selectedIcons.indexOf(icon.title);
        if (index !== -1) {
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
          filesaver.saveAs(content, 'simple-icons-symbols.zip');
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
        filesaver.saveAs(svgBlob, 'simple-icons-symbols.svg');
        this.selectedIcons = [];
      }
    },
    goToIcon(event) {
      const { target } = event;
      if (target.tagName === 'SPAN' && target.classList.contains('status__selected-icon')) {
        const { textContent } = target;
        const icons = document.querySelector('.icons');

        const icon = icons.querySelector(`.icon[data-icon="${textContent}"]`);
        icon.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  },
  mounted() {
    function keyListener(event) {
      const { key } = event;
      if (key === '/') {
        event.preventDefault();
        const statusSearch = document.querySelector('.status__search');
        statusSearch.focus();
      }

      if (event.ctrlKey) {
        if (key === 'a' || key === 'A') {
          event.preventDefault();
          this.addAllValidIcon();
        } else if (key === 'x' || key === 'X') {
          event.preventDefault();
          this.removeAllValidIcon();
        } else if (key === ',' && this.selectedIcons.length > 0) {
          event.preventDefault();
          this.statusMinimize = !this.statusMinimize;
        } else if (key === '.' && this.selectedIcons.length > 0 && !this.statusMinimize) {
          event.preventDefault();
          this.statusResize = !this.statusResize;
        } else if (key === 'Enter') {
          event.preventDefault();
          this.compileSvgSprite();
        } else if (key === ';') {
          event.preventDefault();
          this.enableZip = !this.enableZip;
        }
      }
    }

    document.addEventListener('keydown', keyListener.bind(this));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$border: 3px black solid;
$bgColor: white;
$secondaryColor: #eae2f4;
$fontFamily: "Fira Sans","Copper Hewitt","IBM Plex",sans;

button:focus {
  outline: none;
}

.app__main {
  flex: 1 1 0%;
  margin: 1em 0;
}

.app__status {
  background: $bgColor;
  border: $border;
  font-size: 1.1em;
  font-family: $fontFamily;
  padding: 0.5em;
  position: sticky;
  top: 0;
}

.status__minimize {
  background: $bgColor;
  position: absolute;
  top: 0;
  left: 0;
}

.status__resize {
  background: $bgColor;
  position: absolute;
  top: 0;
  right: 0;
}

.status__icons-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 80px;
  overflow: auto;
  margin: 1em auto;
}

.status__selected-icon {
  border: black solid 1px;
  cursor: pointer;
  font-size: 0.85rem;
  margin: 0.5em;
  padding: 0.5em;

  &:hover {
    background: $secondaryColor;
  }
}

.status__search {
  width: 75%;
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
    text-align: left;
  }
}

.icon--selected {
  background: black;
  fill: white;
  color: white;

  &:hover {
  background: black;
  fill: white;
  color: white;
  }
}

#app__controls {
  background: $bgColor;
  border: $border;
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

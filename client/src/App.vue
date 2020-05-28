<template>
  <div id="app">
    <button type="button" @click="switchTheme">Theme</button>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/kit-of-parts">Kit of Parts</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
  @import 'theme/colors.scss';
  @import 'theme/sizes.scss';
  @import 'theme/reset.css';
  @import 'theme/typography.scss';
  @import 'theme/buttons.scss';
  @import 'theme/checkbox.scss';
  @import 'theme/inputs.scss';

  #app {
    box-sizing: border-box;
    font-size: 14px;
    padding: 24px;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import setRootTheme from './theme/themeShiv'

  // Default to a dark theme
  setRootTheme(true)

  @Component({})
  export default class App extends Vue {
    isDark = true

    switchTheme() {
      this.isDark = !this.isDark
      setRootTheme(this.isDark)
    }
  }
</script>

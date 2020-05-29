<template>
  <div id="app">
    <fieldset>
      <legend>Appearance Settings</legend>
      <DarkSwitch></DarkSwitch>
    </fieldset>
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
  import DarkSwitch from './components/darkSwitch.vue'

  @Component({
    components: {
      DarkSwitch
    }
  })
  export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/kit-of-parts">Kit of Parts</router-link>
      <router-link to="/settings">Settings</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
  @import 'theme/reset.css';

  @import 'theme/mixins/transitions.scss';
  @import 'theme/colors.scss';
  @import 'theme/sizes.scss';
  @import 'theme/typography.scss';
  @import 'theme/buttons.scss';
  @import 'theme/checkbox.scss';
  @import 'theme/inputs.scss';

  #app {
    @include standardTransition(border, padding);
    box-sizing: border-box;
    padding: 24px;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class App extends Vue {}
</script>

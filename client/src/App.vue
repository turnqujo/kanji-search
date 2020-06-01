<template>
  <div id="app">
    <nav class="kn-navbar">
      <ul class="kn-navbar__link-list">
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/">Home</router-link></li>
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/kit-of-parts">Kit of Parts</router-link></li>
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/settings">Settings</router-link></li>
      </ul>
    </nav>
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
  @import 'theme/navigation.scss';

  #app {
    @include standardTransition(border);
    margin: 12px 24px;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class App extends Vue {}
</script>

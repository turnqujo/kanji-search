<template>
  <div id="app">
    <nav class="kn-navbar" id="kn-nav">
      <ul class="kn-navbar__link-list">
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/" data-tid="home">Home</router-link></li>
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/kit-of-parts">Kit of Parts</router-link></li>
        <li class="kn-navbar__link">
          <router-link class="kn-anchor" to="/settings" data-tid="settings">Settings</router-link>
        </li>
      </ul>
    </nav>
    <div class="kn-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  @import 'theme/index.scss';

  #app {
    padding: 24px;
  }

  .kn-content {
    margin-top: 2em;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class App extends Vue {}
</script>

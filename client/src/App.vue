<template>
  <div id="app" class="section">
    <nav id="kn-nav" class="kn-navbar container columns">
      <ul class="kn-navbar__link-list column">
        <li class="kn-navbar__link">
          <router-link class="kn-anchor" to="/" data-tid="home">Kanji Search</router-link>
        </li>
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/about">About</router-link></li>
        <li class="kn-navbar__link">
          <router-link class="kn-anchor" to="/settings" data-tid="settings">Settings</router-link>
        </li>
      </ul>
      <ul class="kn-navbar__extras column is-narrow">
        <li><DarkSwitch></DarkSwitch></li>
      </ul>
    </nav>
    <div class="kn-content container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  #app {
    padding-bottom: 20vh;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import DarkSwitch from './components/rootMods/DarkSwitch.vue'

  @Component({
    components: {
      DarkSwitch
    }
  })
  export default class App extends Vue {}
</script>

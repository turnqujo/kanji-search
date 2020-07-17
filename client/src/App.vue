<template>
  <div id="app" class="">
    <nav class="kn-navbar section" id="kn-nav">
      <ul class="kn-navbar__link-list columns">
        <li class="kn-navbar__link column is-narrow"><router-link class="kn-anchor" to="/" data-tid="home">Home</router-link></li>
        <li class="kn-navbar__link column is-narrow"><router-link class="kn-anchor" to="/about">About</router-link></li>
        <li class="kn-navbar__link column is-narrow">
          <router-link class="kn-anchor" to="/settings" data-tid="settings">Settings</router-link>
        </li>
      </ul>
      <ul class="kn-navbar__extras columns">
        <li class="column is-narrow"><DarkSwitch></DarkSwitch></li>
      </ul>
    </nav>
    <div class="kn-content section">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  .kn-navbar {
    // Override bulma section style
    padding: 1.5rem 1.5rem 0 1.5rem;
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

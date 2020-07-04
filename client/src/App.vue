<template>
  <div id="app">
    <nav class="kn-navbar" id="kn-nav">
      <ul class="kn-navbar__link-list">
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/" data-tid="home">Home</router-link></li>
        <li class="kn-navbar__link"><router-link class="kn-anchor" to="/about">About</router-link></li>
        <li class="kn-navbar__link">
          <router-link class="kn-anchor" to="/settings" data-tid="settings">Settings</router-link>
        </li>
      </ul>
      <ul class="kn-navbar__extras">
        <li><DarkSwitch></DarkSwitch></li>
      </ul>
    </nav>
    <div class="kn-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
  #app {
    padding: 24px;
  }

  .kn-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .kn-content {
    margin-top: 2em;
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

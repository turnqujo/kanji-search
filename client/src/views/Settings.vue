<template>
  <div class="kn-settings">
    <fieldset class="kn-settings__options kn-fieldset">
      <legend class="kn-fieldset__legend">Appearance Settings</legend>
      <ul>
        <li><FontSizeSwitch></FontSizeSwitch></li>
        <li><AnimationSwitch></AnimationSwitch></li>
      </ul>
    </fieldset>
    <div class="kn-settings__kop">
      <router-link class="kn-anchor" to="/kit-of-parts">View the Kit of Parts</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kn-settings__options {
    padding-top: 0.5em;
  }

  .kn-settings__options > ul > li:not(:first-of-type) {
    margin-top: 1em;
  }

  .kn-settings__kop {
    margin-top: 1em;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import FontSizeSwitch from '@/components/rootMods/FontSizeSwitch.vue'
  import AnimationSwitch from '@/components/rootMods/AnimationSwitch.vue'

  @Component({
    components: {
      FontSizeSwitch,
      AnimationSwitch
    }
  })
  export default class UserSettings extends Vue {}
</script>

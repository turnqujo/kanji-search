<template>
  <div class="settings__container">
    <fieldset class="settings__appearance">
      <legend>Appearance Settings</legend>
      <ul>
        <li><DarkSwitch></DarkSwitch></li>
        <li><FontSizeSwitch></FontSizeSwitch></li>
        <li><AnimationSwitch></AnimationSwitch></li>
      </ul>
    </fieldset>
  </div>
</template>

<style lang="scss">
  .settings__container,
  .settings__appearance > ul > li:not(:first-of-type) {
    margin-top: 1em;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import DarkSwitch from '@/components/rootMods/DarkSwitch.vue'
  import FontSizeSwitch from '@/components/rootMods/FontSizeSwitch.vue'
  import AnimationSwitch from '@/components/rootMods/AnimationSwitch.vue'

  @Component({
    components: {
      DarkSwitch,
      FontSizeSwitch,
      AnimationSwitch
    }
  })
  export default class UserSettings extends Vue {}
</script>

<template>
  <fieldset class="kn-fieldset">
    <legend class="kn-fieldset__legend">Appearance Settings</legend>
    <ul>
      <li><DarkSwitch></DarkSwitch></li>
      <li><FontSizeSwitch></FontSizeSwitch></li>
      <li><AnimationSwitch></AnimationSwitch></li>
    </ul>
  </fieldset>
</template>

<style lang="scss" scoped>
  .kn-fieldset > ul > li:not(:first-of-type) {
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

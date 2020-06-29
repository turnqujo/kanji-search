<template>
  <fieldset class="kn-fieldset">
    <legend class="kn-fieldset__legend">Appearance Settings</legend>
    <ul>
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

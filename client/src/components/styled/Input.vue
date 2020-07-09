<template>
  <label class="kn-input kn-input--text">
    <input type="text" class="kn-input__control" placeholder="Placeholder" />
    <span class="kn-input__label">Default</span>
  </label>
</template>

<style lang="scss" scoped>
  @import '../../theme/_inputs.scss';
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class KnInput extends Vue {}
</script>

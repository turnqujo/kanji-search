<template>
  <div>
    <slot></slot>
  </div>
</template>

<style lang="scss"></style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class ThemeProvider extends Vue {}
</script>

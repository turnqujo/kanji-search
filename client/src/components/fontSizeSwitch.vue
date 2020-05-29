<template>
  <label class="kn-select">
    <select class="kn-select__control" v-model="fontSize">
      <option value="xsmall">Extra Small</option>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
      <option value="xlarge">Extra Large</option>
    </select>
    <span class="kn-select__label">Font Size</span>
  </label>
</template>

<style lang="scss"></style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type FontSizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

  @Component({})
  export default class FontSizeSwitch extends Vue {
    pFontSize: FontSizes = 'medium'

    get fontSize() {
      return this.pFontSize
    }
    set fontSize(newSize: FontSizes) {
      this.pFontSize = newSize
      document.querySelector(':root')?.setAttribute('font-size', newSize)
      localStorage.setItem('kn-font-size-preference', newSize)
    }

    mounted() {
      const storedPreference = localStorage.getItem('kn-font-size-preference') as FontSizes
      if (['xsmall', 'small', 'medium', 'large', 'xlarge'].indexOf(storedPreference) > -1) {
        document.querySelector(':root')?.setAttribute('font-size', storedPreference)
        this.fontSize = storedPreference
      }
    }
  }
</script>

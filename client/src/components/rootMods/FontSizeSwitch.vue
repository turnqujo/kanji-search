<template>
  <kn-select-list label="Font Size" v-model="fontSize" v-if="fontSize !== null">
    <option value="xsmall">Extra Small</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
    <option value="xlarge">Extra Large</option>
  </kn-select-list>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import KnSelectList from '../SelectList.vue'

  type FontSizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

  @Component({
    components: {
      KnSelectList
    }
  })
  export default class FontSizeSwitch extends Vue {
    static storageKey = 'kn-font-size-preference'
    pFontSize: FontSizes | null = null

    get fontSize() {
      return this.pFontSize
    }
    set fontSize(newSize: FontSizes | null) {
      if (newSize === null) {
        return
      }

      if (['xsmall', 'small', 'medium', 'large', 'xlarge'].indexOf(newSize) === -1) {
        return
      }

      this.pFontSize = newSize
      document.querySelector(':root')?.setAttribute('font-size', newSize)
      localStorage.setItem(FontSizeSwitch.storageKey, newSize)
    }

    mounted() {
      const storedPreference = localStorage.getItem(FontSizeSwitch.storageKey) as FontSizes
      if (['xsmall', 'small', 'medium', 'large', 'xlarge'].indexOf(storedPreference) > -1) {
        document.querySelector(':root')?.setAttribute('font-size', storedPreference)
        this.fontSize = storedPreference
        return
      }

      this.fontSize = 'medium'
    }
  }
</script>

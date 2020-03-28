<template>
  <ul>
    <li v-for="kanji in kanjiSet" :key="kanji.char">
      <kanji-card v-once :kanji="kanji"></kanji-card>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  ul {
    box-sizing: border-box;
    column-gap: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 8px;
    row-gap: 8px;
  }
</style>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Kanji } from '../models/kanji'
  import conversionTable from '../data/conversion-table'
  import KanjiCard from './KanjiCard.vue'

  @Component({
    components: {
      KanjiCard
    }
  })
  export default class PickList extends Vue {
    @Prop() private kanjiSet!: Kanji[]
    @Prop() private romaji!: string

    hiragana = ''
    katakana = ''

    @Watch('romaji')
    onRomajiChanged(newRomaji: string) {
      const foundConversion = conversionTable.find((x: any) => x.romaji === newRomaji)
      if (!foundConversion) {
        this.hiragana = ''
        this.katakana = ''
        return
      }

      this.hiragana = foundConversion.hiragana
      this.katakana = foundConversion.katakana
    }
  }
</script>

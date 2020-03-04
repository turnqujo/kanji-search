<template>
  <div>
    <ul>
      <li>{{ hiragana }}</li>
      <li>{{ katakana }}</li>
      <li v-for="kanji in kanjiSet" :key="kanji.char" v-on:click="$emit('onKanjiPicked', kanji)">
        {{ kanji.char }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  ul {
    align-items: center;
    background-color: white;
    display: flex;
    font-size: 2em;
    height: 2em;
    margin: 0;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0;
    width: 100%;
  }

  li {
    color: black;
    margin-left: 12px;
  }
</style>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Kanji } from '../../../shared/models/kanji'

  // @ts-ignore
  import conversionTable from '../../../shared/data/conversion-table.json'

  @Component({})
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

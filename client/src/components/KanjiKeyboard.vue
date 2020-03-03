<!--
Kanji Keyboard
The idea here is to have a keyboard with multiple modes and tools to help
the user find and pick kanji.

MVP:
- Key listener
- Romaji only, with kana and katakana outputs

Post-MVP:
- Display a keyboard which models the JIS Standard 
  - https://en.wikipedia.org/wiki/Keyboard_layout#Japanese
- Highlight matched keys, select when found
  - e.g. "k" matches ka, ku, ke, ki, and ko, typing "a" selects ka
-->

<template>
  <div class="kanji-keyboard">
    <label>
      Romaji
      <input v-on:input="test" />
    </label>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Kanji } from '../../../shared/models/kanji'
  import { getAllKanji } from '../workers/getAllKanji.wrapper'

  // @ts-ignore
  import conversionTable from '../../../shared/data/conversion-table.json'

  @Component({})
  export default class KanjiKeyboard extends Vue {
    private sortKanjiWorker: Worker
    private getKanjiByRomajiWorker: Worker

    constructor() {
      super()

      this.getKanjiByRomajiWorker = new Worker('workers/getKanjiByRomaji.js')
      this.sortKanjiWorker = new Worker('workers/sortKanji.js')
    }

    public async test(e: InputEvent) {
      const inputValue = (e.target as HTMLInputElement).value

      const kanjiSet = await getAllKanji()

      const foundKanji = await new Promise((resolve) => {
        this.getKanjiByRomajiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
        this.getKanjiByRomajiWorker.postMessage({
          romaji: inputValue,
          conversionTable,
          kanjiSet
        })
      })

      const sortedKanji: Kanji[] = await new Promise((resolve) => {
        this.sortKanjiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
        this.sortKanjiWorker.postMessage({
          kanjiSet: foundKanji,
          sortBy: 'frequency',
          order: 'asc'
        })
      })

      console.log(sortedKanji.map((y: Kanji) => y.char))
    }
  }
</script>

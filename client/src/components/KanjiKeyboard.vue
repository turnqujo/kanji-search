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
  <p class="output">
    {{ output }}
  </p>
</template>

<style lang="scss" scoped>
  .output {
    display: block;
    margin: 0;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Kanji } from '../../../shared/models/kanji'

  @Component({})
  export default class KanjiKeyboard extends Vue {
    output = ''

    async mounted() {
      document.addEventListener('keypress', this.onKeypress)

      const getAllKanjiWorker = new Worker('workers/getAllKanji.js')
      const sortKanjiWorker = new Worker('workers/sortKanji.js')

      sortKanjiWorker.onmessage = (e: any) => console.log(e.data.map((y: Kanji) => y.frequency))

      getAllKanjiWorker.onmessage = (e: any) =>
        sortKanjiWorker.postMessage({
          kanjiSet: e.data,
          sortBy: 'frequency',
          order: 'asc'
        })

      getAllKanjiWorker.postMessage(null)
    }

    destroyed() {
      document.removeEventListener('keypress', this.onKeypress)
    }

    private onKeypress(e: KeyboardEvent) {
      this.output += e.key
    }
  }
</script>

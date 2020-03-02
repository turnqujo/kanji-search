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

  const kanjiSet = [
    {
      char: '亜',
      stroke: '7',
      meanings: ['Asia', 'rank next', 'come after', '-ous'],
      readings: ['ア']
    },
    {
      char: '唖',
      stroke: '10',
      meanings: ['mute', 'dumb'],
      readings: ['ア', 'アク']
    },
    {
      char: '娃',
      stroke: '9',
      meanings: ['beautiful'],
      readings: ['ア', 'アイ', 'ワ']
    },
    {
      char: '阿',
      stroke: '8',
      meanings: ['Africa', 'flatter', 'fawn upon', 'corner', 'nook', 'recess'],
      readings: ['ア', 'オ']
    },
    {
      char: '哀',
      stroke: '9',
      meanings: ['pathetic', 'grief', 'sorrow', 'pathos', 'pity', 'sympathize'],
      readings: ['アイ']
    },
    {
      char: '愛',
      stroke: '13',
      meanings: ['love', 'affection', 'favourite'],
      readings: ['アイ']
    },
    {
      char: '挨',
      stroke: '10',
      meanings: ['approach', 'draw near', 'push open'],
      readings: ['アイ']
    },
    {
      char: '姶',
      stroke: '9',
      meanings: ['good-looking', 'quiet'],
      readings: ['オウ', 'アイ']
    },
    {
      char: '逢',
      stroke: ['10', '9'],
      meanings: ['meeting', 'tryst', 'date', 'rendezvous'],
      readings: ['ホウ']
    },
    { char: '葵', stroke: '12', meanings: ['hollyhock'], readings: ['キ'] }
  ]

  @Component({})
  export default class KanjiKeyboard extends Vue {
    output = ''

    async mounted() {
      document.addEventListener('keypress', this.onKeypress)

      const worker = new Worker('workers/sortKanji.js')
      worker.onmessage = (e: any) => console.log(e.data.map((y: any) => y.stroke))
      worker.postMessage({
        kanjiSet,
        sortBy: 'strokeCount',
        sortDirection: 'asc'
      })
    }

    destroyed() {
      document.removeEventListener('keypress', this.onKeypress)
    }

    private onKeypress(e: KeyboardEvent) {
      this.output += e.key
    }
  }
</script>

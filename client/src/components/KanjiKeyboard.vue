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

/**
 * TODO: Webworkers
 * I'm thinking now to just compile the TS Webworkers to JS, and then serve / inject them separately.
 * See here: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
 */

@Component({})
export default class KanjiKeyboard extends Vue {
  output = ''

  mounted() {
    document.addEventListener('keypress', this.onKeypress)
  }

  destroyed() {
    document.removeEventListener('keypress', this.onKeypress)
  }

  private onKeypress(e: KeyboardEvent) {
    this.output += e.key
  }
}
</script>

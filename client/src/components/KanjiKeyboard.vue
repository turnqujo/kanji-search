<template>
  <div class="kanji-keyboard">
    <label>
      Romaji
      <input v-on:input="onInput" />
    </label>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
  import { getAllKanji } from '../workers/getAllKanji.wrapper'
  import { getKanjiByRomaji } from '../workers/getKanjiByRomaji.wrapper'
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class KanjiKeyboard extends Vue {
    public async onInput(e: InputEvent) {
      const inputValue = (e.target as HTMLInputElement).value
      this.$emit('romajiEntered', inputValue)

      const kanjiSet = await getAllKanji()
      const foundKanji = await getKanjiByRomaji(inputValue, kanjiSet, 'start')
      this.$emit('foundKanji', foundKanji)
    }
  }
</script>

<template>
  <div class="search-form">
    <kana-keyboard @input="onReadingInput"></kana-keyboard>
    <label>
      <span>Sort by</span>
      <select>
        <option>Frequency</option>
        <option>Stroke Count</option>
        <option>Unicode</option>
      </select>
    </label>
    <label>
      <span>Asc</span>
      <input type="radio" name="direction" value="asc" checked />
    </label>
    <label>
      <span>Desc</span>
      <input type="radio" name="direction" value="desc" />
    </label>
    <label>
      <span>Kanji Set</span>
      <select>
        <option>Regular Use Kanji</option>
        <option>Name Kanji</option>
      </select>
    </label>
  </div>
</template>

<style lang="scss" scoped>
  .search-form {
    display: flex;
    justify-items: space-between;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TextInput from '@/components/formControls/TextInput.vue'
  import KanaKeyboard from '@/components/formControls/KanaKeyboard.vue'
  import { getKanjiByRomaji } from '../workers/getKanjiByRomaji.wrapper'
  import { getAllKanji } from '../workers/getAllKanji.wrapper'

  @Component({
    components: {
      TextInput,
      KanaKeyboard
    }
  })
  export default class SearchForm extends Vue {
    async onReadingInput(newReading: string) {
      // TODO: This is just testing; should be in parent?
      const allKanji = await getAllKanji()
      const foundKanji = await getKanjiByRomaji(newReading, allKanji, 'start')
      console.log(foundKanji)
    }
  }
</script>

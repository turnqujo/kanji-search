<template>
  <div class="home">
    <div class="home__header">
      <search-form v-on:change="onSearchFormChanged"></search-form>
    </div>
    <pick-list
      v-bind:kanji-set="kanjiSet"
      v-bind:romaji="enteredRomaji"
      v-on:onKanjiPicked="onPickedKanji"
    ></pick-list>
  </div>
</template>

<style lang="scss">
  .home {
    &__header {
      background-color: white;
      border-bottom: 2px solid black;
      padding: 6px;
      position: sticky;
      top: 0;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Kanji } from '../models/kanji'
  import PickList from '@/components/PickList.vue'
  import SearchForm from '@/components/SearchForm.vue'
  import { getKanjiByRomaji } from '../workers/getKanjiByRomaji.wrapper'
  import { getAllKanji } from '../workers/getAllKanji.wrapper'

  @Component({
    components: {
      SearchForm,
      PickList
    }
  })
  export default class HomeComponent extends Vue {
    async onSearchFormChanged(options: any) {
      const allKanji = await getAllKanji()
      this.kanjiSet = await getKanjiByRomaji(options.reading, allKanji, 'start')
    }

    kanjiSet: Kanji[] = []
    enteredRomaji = ''

    onFoundKanji(newKanji: Kanji[]) {
      this.kanjiSet = newKanji
    }

    onRomajiEntered(romaji: string) {
      this.enteredRomaji = romaji
    }

    onPickedKanji(picked: Kanji) {
      console.log(picked.char)
    }
  }
</script>

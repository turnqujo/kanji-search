<template>
  <div class="home">
    <div class="home__header">
      <search-form v-on:change="onSearchFormChanged"></search-form>
    </div>
    <pick-list :kanji-set="kanjiSet"></pick-list>
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
  import { SearchFormState } from '../components/SearchForm.vue'
  import PickList from '../components/PickList.vue'
  import SearchForm from '../components/SearchForm.vue'
  import { getAllKanji, getKanjiByRomaji, filterKanjiByMeaning, sortKanji } from '../workers'

  @Component({
    components: {
      SearchForm,
      PickList
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []

    async onSearchFormChanged(options: SearchFormState) {
      const allKanji = options.kanjiSet === 'jooyoo' ? await getAllKanji() : []

      const kanjiFromReading = await getKanjiByRomaji(
        options.reading,
        allKanji,
        options.matchSetting
      )

      const kanjiFromMeaning = await filterKanjiByMeaning(kanjiFromReading, options.meaning)

      const sortedKanji = await sortKanji(kanjiFromMeaning, options.sortBy, options.orderBy)

      this.kanjiSet = sortedKanji
    }
  }
</script>

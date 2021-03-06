<template>
  <div>
    <div class="kanji-form-container">
      <kanji-form :conversionTable="conversionTable" @submit="onFormSubmit" @form-reset="onFormReset"></kanji-form>
    </div>
    <div class="kanji-results-container">
      <kanji-results :kanji-set="kanjiSet"></kanji-results>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kanji-results-container {
    border-top: 1px solid var(--kn-foreground--aux);
    margin-top: 1em;
    padding-top: 1em;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { getKanjiBySet, filterKanjiByMeaning, sortKanji, getKanjiByConversion } from '../workers'
  import { Kanji } from '../models/kanji'
  import fetchConversionTable, { ConversionItem } from '../data/conversion-table'
  import KanjiForm, { KanjiFormSubmit } from '../components/KanjiForm.vue'
  import KanjiResults from '../components/kanjiResults/kanjiResults.vue'
  import { fetchAllKanji } from '../data/kanji'

  @Component({
    components: {
      KanjiResults,
      KanjiForm
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []
    conversionTable: ConversionItem[] = []

    async mounted() {
      this.conversionTable = await fetchConversionTable()
    }

    async onFormSubmit(values: KanjiFormSubmit) {
      const startingKanji = await getKanjiBySet(await fetchAllKanji(), values.kanjiSet)

      let readingMeaningFiltered = []
      if (values.readingConverted.length === 0 && !!values.meaning) {
        readingMeaningFiltered = await filterKanjiByMeaning(startingKanji, values.meaning, values.meaningMatchOption)
      } else if (values.readingConverted.length > 0 && !values.meaning) {
        readingMeaningFiltered = await getKanjiByConversion(
          startingKanji,
          values.readingConverted,
          values.readingMatchOption,
          values.readingType
        )
      } else if (values.readingConverted.length > 0 && !!values.meaning) {
        const meaningFiltered = await filterKanjiByMeaning(startingKanji, values.meaning)
        readingMeaningFiltered = await getKanjiByConversion(
          meaningFiltered,
          values.readingConverted,
          values.readingMatchOption,
          values.readingType
        )
      } else {
        readingMeaningFiltered = startingKanji
      }

      const sorted = await sortKanji(
        readingMeaningFiltered,
        values.primarySort,
        values.secondarySort.field === null ? null : values.secondarySort
      )

      this.kanjiSet = sorted
    }

    onFormReset() {
      this.kanjiSet = []
    }
  }
</script>

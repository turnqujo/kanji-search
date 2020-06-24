<template>
  <div class="home">
    <div class="kanji-form-container">
      <kanji-form :conversionTable="conversionTable" @submit="onFormSubmit" @form-reset="onFormReset"></kanji-form>
    </div>
    <div class="kanji-table-container">
      <div class="" v-if="kanjiSet.length <= 0 && !firstSearch">
        <h2>No kanji found</h2>
      </div>
      <KanjiTable :kanjiSet="kanjiSet" v-if="kanjiSet.length > 0"></KanjiTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kanji-table-container {
    margin-top: 1em;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { getKanji, filterKanjiByMeaning, sortKanji, getKanjiByConversion } from '../workers'
  import { Kanji } from '../models/kanji'
  import fetchConversionTable, { ConversionItem } from '../data/conversion-table'
  import KanjiForm, { KanjiFormSubmit } from '../components/KanjiForm.vue'
  import KanjiTable from '../components/kanjiTable.vue'

  @Component({
    components: {
      KanjiTable,
      KanjiForm
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []
    conversionTable: ConversionItem[] = []
    firstSearch = true

    async mounted() {
      this.conversionTable = await fetchConversionTable()
    }

    async onFormSubmit(values: KanjiFormSubmit) {
      this.firstSearch = false

      const unfilteredKanji = await getKanji(values.kanjiSet)

      let readingMeaningFiltered = []
      if (values.readingConverted.length === 0 && !!values.meaning) {
        readingMeaningFiltered = await filterKanjiByMeaning(unfilteredKanji, values.meaning, values.meaningMatchOption)
      } else if (values.readingConverted.length > 0 && !values.meaning) {
        readingMeaningFiltered = await getKanjiByConversion(
          unfilteredKanji,
          values.readingConverted,
          values.readingMatchOption,
          values.readingType
        )
      } else if (values.readingConverted.length > 0 && !!values.meaning) {
        const meaningFiltered = await filterKanjiByMeaning(unfilteredKanji, values.meaning)
        readingMeaningFiltered = await getKanjiByConversion(
          meaningFiltered,
          values.readingConverted,
          values.readingMatchOption,
          values.readingType
        )
      } else {
        readingMeaningFiltered = unfilteredKanji
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
      this.firstSearch = true
    }
  }
</script>

<template>
  <div class="home">
    <div class="kanji-form-container">
      <kanji-form @submit="onFormSubmit" @form-reset="onFormReset"></kanji-form>
    </div>
    <div class="pick-list-container">
      <pick-list :kanji-set="kanjiSet"></pick-list>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Kanji } from '../models/kanji'
  import PickList from '../components/PickList.vue'
  import KanjiForm, { KanjiFormState } from '../components/KanjiForm.vue'
  import { getKanji, filterKanjiByMeaning, sortKanji, getKanjiByConversion } from '../workers'

  @Component({
    components: {
      PickList,
      KanjiForm
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []

    async onFormSubmit(values: KanjiFormState) {
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
    }
  }
</script>

<template>
  <div class="home">
    <div class="kanji-form-container">
      <kanji-form @submit="onFormSubmit"></kanji-form>
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
  import KanjiForm, { SubmitProps } from '../components/KanjiForm.vue'
  import { getKanji, filterKanjiByMeaning, sortKanji, getKanjiByConversion } from '../workers'

  @Component({
    components: {
      PickList,
      KanjiForm
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []

    /**
     * TODO: This is obviously a trash way to handle this
     */
    async onFormSubmit(values: SubmitProps) {
      const unfilteredKanji = await getKanji(values.kanjiSet)

      let readingMeaningFiltered = []
      if (values.readingConverted.length === 0 && !!values.meaning) {
        readingMeaningFiltered = await filterKanjiByMeaning(unfilteredKanji, values.meaning)
      } else if (values.readingConverted.length > 0 && !values.meaning) {
        readingMeaningFiltered = await getKanjiByConversion(
          unfilteredKanji,
          values.readingConverted,
          values.readingMatchOption,
          values.readingType
        )
      } else if (values.readingConverted.length > 0 && !!values.meaning) {
        // TODO: Add some control to order these, or query & join both?
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
        readingMeaningFiltered.slice(),
        values.primarySort,
        values.secondarySort.field === null ? null : values.secondarySort
      )

      this.kanjiSet = sorted
    }
  }
</script>

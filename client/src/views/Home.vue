<template>
  <div class="home">
    <div class="kanji-form-container">
      <kanji-form @submit="onFormSubmit"></kanji-form>
    </div>
    <pick-list :kanji-set="kanjiSet"></pick-list>
  </div>
</template>

<style lang="scss"></style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Kanji } from '../models/kanji'
  import PickList from '../components/PickList.vue'
  import KanjiForm, { SubmitProps } from '../components/KanjiForm.vue'
  import { getAllKanji, filterKanjiByMeaning, sortKanji, getKanjiByConversion } from '../workers'

  @Component({
    components: {
      PickList,
      KanjiForm
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []

    async onFormSubmit(values: SubmitProps) {
      const unfilteredKanji = await getAllKanji(values.kanjiSet)

      // TODO: Just pass the conversions to a reworked worker which accepts them
      const romajiReading = values.readingConverted.map((x) => x.romaji).join()

      let readingMeaningFiltered = []
      if (!romajiReading && !!values.meaning) {
        readingMeaningFiltered = await filterKanjiByMeaning(unfilteredKanji, values.meaning)
      } else if (!!romajiReading && !values.meaning) {
        readingMeaningFiltered = await getKanjiByConversion(
          unfilteredKanji,
          values.readingConverted,
          values.readingMatchOption
        )
      } else if (!!romajiReading && !!values.meaning) {
        // TODO: Add some control to order these, or query & join both?
        const meaningFiltered = await filterKanjiByMeaning(unfilteredKanji, values.meaning)
        readingMeaningFiltered = await getKanjiByConversion(
          meaningFiltered,
          values.readingConverted,
          values.readingMatchOption
        )
      } else {
        readingMeaningFiltered = unfilteredKanji
      }

      const sorted = await sortKanji(readingMeaningFiltered, values.sortField, values.sortDirection)

      this.kanjiSet = sorted
    }
  }
</script>

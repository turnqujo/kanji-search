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
  import { getKanji, filterKanjiByMeaning, sortKanji, getKanjiByConversion } from '../workers'

  @Component({
    components: {
      PickList,
      KanjiForm
    }
  })
  export default class HomeComponent extends Vue {
    kanjiSet: Kanji[] = []

    async onFormSubmit(values: SubmitProps) {
      const unfilteredKanji = await getKanji(values.kanjiSet)

      let readingMeaningFiltered = []
      if (values.readingConverted.length === 0 && !!values.meaning) {
        readingMeaningFiltered = await filterKanjiByMeaning(unfilteredKanji, values.meaning)
      } else if (values.readingConverted.length > 0 && !values.meaning) {
        readingMeaningFiltered = await getKanjiByConversion(
          unfilteredKanji,
          values.readingConverted,
          values.readingMatchOption
        )
      } else if (values.readingConverted.length > 0 && !!values.meaning) {
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

      this.kanjiSet = sorted.slice(0, 100)
    }
  }
</script>

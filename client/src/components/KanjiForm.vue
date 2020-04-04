<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Kanji Set</legend>
      <div class="radio-container">
        <label class="radio-label">
          <span class="radio-label__text">Jōyō</span>
          <input type="radio" name="kanji-set" value="jooyoo" v-model="kanjiSet" class="radio" />
        </label>
        <label class="radio-label">
          <span class="radio-label__text">Jinmeiyō</span>
          <input type="radio" name="kanji-set" value="jinmeiyoo" v-model="kanjiSet" class="radio" />
        </label>
      </div>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Kun &amp; On Readings</legend>
      <label class="input-label">
        <span class="input-label__text">Matching</span>
        <select v-model="readingMatchOption">
          <option value="start">Starts with</option>
          <option value="anywhere">Contains</option>
          <option value="exact">Exact</option>
        </select>
      </label>
      <label class="input-label">
        <span class="input-label__text">Reading</span>
        <input type="text" v-model="reading" @blur="onReadingBlur" />
        <span v-if="readingError !== ''">{{ readingError }}</span>
      </label>
      <button type="button"><i class="far fa-keyboard" /></button>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Search by Meaning</legend>
      <label class="input-label">
        <span class="input-label__text">Text</span>
        <input type="text" v-model="meaning" />
      </label>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Sort Options</legend>
      <label class="input-label">
        <span class="input-label__text">Sort By</span>
        <select v-model="sortField">
          <option value="frequency">Popularity</option>
          <option value="strokeCount">Stroke Count</option>
          <option value="unicode">Unicode</option>
        </select>
      </label>
      <div class="radio-container">
        <label class="radio-label">
          Ascending
          <input type="radio" name="sort-direction" value="asc" v-model="sortDirection" />
        </label>
        <label class="radio-label">
          Descending
          <input type="radio" name="sort-direction" value="desc" v-model="sortDirection" />
        </label>
      </div>
    </fieldset>
    <button type="submit">Search</button>
  </form>
</template>

<style lang="scss" scoped>
  .fieldset {
    display: flex;
    align-items: last baseline;
    border: 1px solid lightgray;
    padding: 8px 12px;

    &:not(:first-of-type) {
      margin-top: 12px;
    }

    & > .fieldset-legend {
      font-weight: bold;
    }
  }

  .radio-label:not(:first-of-type) {
    margin-left: 8px;
  }

  .input-label__text {
    display: block;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { KanjiSet, MatchOption } from '../models'
  import { SortBy, OrderBy, convertText } from '../workers'
  import conversionTable, { ConversionItem } from '../data/conversion-table'

  export interface SubmitProps {
    kanjiSet: KanjiSet
    readingMatchOption: MatchOption
    readingConverted: ConversionItem[]
    meaning: string
    sortField: SortBy
    sortDirection: OrderBy
  }

  @Component({})
  export default class KanjiForm extends Vue {
    private kanjiSet: KanjiSet = 'jooyoo'
    private readingMatchOption: MatchOption = 'start'
    private reading = ''
    private readingError = ''
    private readingConverted: ConversionItem[] = []
    private meaning = ''
    private meaningError = false
    private sortField: SortBy = 'frequency'
    private sortDirection: OrderBy = 'asc'

    async onReadingBlur() {
      this.readingError = ''
      this.readingConverted = []

      try {
        this.readingConverted = await convertText(this.reading, conversionTable)
      } catch (e) {
        this.readingError = e
      }
    }

    onSubmit() {
      if (!!this.readingError || !!this.meaningError) {
        return
      }

      this.$emit('submit', {
        kanjiSet: this.kanjiSet,
        readingMatchOption: this.readingMatchOption,
        readingConverted: this.readingConverted,
        meaning: this.meaning,
        sortField: this.sortField,
        sortDirection: this.sortDirection
      } as SubmitProps)
    }
  }
</script>

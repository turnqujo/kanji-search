<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Kanji Set</legend>
      <div class="checkbox-container">
        <label class="checkbox-label">
          <span class="checkbox-label__text">Jōyō</span>
          <input
            type="checkbox"
            name="kanji-set"
            value="jouyou"
            v-model="kanjiSet"
            class="checkbox"
          />
        </label>
        <label class="checkbox-label">
          <span class="checkbox-label__text">Jinmeiyō</span>
          <input
            type="checkbox"
            name="kanji-set"
            value="jinmeiyou"
            v-model="kanjiSet"
            class="checkbox"
          />
        </label>
        <label class="checkbox-label">
          <span class="checkbox-label__text">Kyōiku</span>
          <input
            type="checkbox"
            name="kanji-set"
            value="kyouiku"
            v-model="kanjiSet"
            class="checkbox"
          />
        </label>
        <label class="checkbox-label">
          <span class="checkbox-label__text">JLPT</span>
          <input
            type="checkbox"
            name="kanji-set"
            value="jlpt"
            v-model="kanjiSet"
            class="checkbox"
          />
        </label>
        <label class="checkbox-label">
          <span class="checkbox-label__text">Hyōgai</span>
          <input
            type="checkbox"
            name="kanji-set"
            value="hyougai"
            v-model="kanjiSet"
            class="checkbox"
          />
        </label>
      </div>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Search by Reading</legend>
      <label class="input-label">
        <span class="input-label__text">Matching</span>
        <select v-model="readingMatchOption">
          <option value="start">Starts with</option>
          <option value="anywhere">Contains</option>
          <option value="exact">Exact</option>
        </select>
      </label>
      <label class="input-label">
        <span class="input-label__text">Text</span>
        <input type="text" v-model="reading" @blur="onReadingBlur" />
        <span v-if="readingError !== ''">{{ readingError }}</span>
      </label>
      <kana-keyboard @kana-picked="onPickedKana"></kana-keyboard>
      <div>
        <label class="checkbox-label">
          <span class="checkbox-label__text">On</span>
          <input
            type="checkbox"
            name="reading-type"
            value="on"
            v-model="readingType"
            class="checkbox"
          />
        </label>
        <label class="checkbox-label">
          <span class="checkbox-label__text">Kun</span>
          <input
            type="checkbox"
            name="reading-type"
            value="kun"
            v-model="readingType"
            class="checkbox"
          />
        </label>
        <label class="checkbox-label">
          <span class="checkbox-label__text">Nanori</span>
          <input
            type="checkbox"
            name="reading-type"
            value="nanori"
            v-model="readingType"
            class="checkbox"
          />
        </label>
      </div>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Search by Meaning</legend>
      <label class="input-label">
        <span class="input-label__text">Text</span>
        <input type="text" v-model="meaning" />
      </label>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Misc. Options</legend>
      <label class="input-label">
        <span class="input-label__text">Grade</span>
        <select v-model="grade">
          <option value="-1">Any</option>
          <option v-for="g in 10" :key="g" :value="g">{{ g }}</option>
        </select>
      </label>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Sorting</legend>
      <label class="input-label">
        <span class="input-label__text">Primary Sort</span>
        <select v-model="sortField">
          <option value="frequency">Popularity</option>
          <option value="grade">Grade</option>
          <option value="jlpt">JLPT</option>
          <option value="strokeCount">Stroke Count</option>
          <option value="unicode">Unicode</option>
        </select>
      </label>
      <div class="radio-container">
        <label class="radio-label">
          Ascending
          <input type="radio" name="primary-sort-dir" value="asc" v-model="sortDirection" />
        </label>
        <label class="radio-label">
          Descending
          <input type="radio" name="primary-sort-dir" value="desc" v-model="sortDirection" />
        </label>
      </div>
      <label class="input-label">
        <span class="input-label__text">Secondary Sort</span>
        <select v-model="sortField">
          <option value="frequency">Popularity</option>
          <option value="grade">Grade</option>
          <option value="jlpt">JLPT</option>
          <option value="strokeCount">Stroke Count</option>
          <option value="unicode">Unicode</option>
        </select>
      </label>
      <div class="radio-container">
        <label class="radio-label">
          Ascending
          <input type="radio" name="secondary-sort-dir" value="asc" v-model="sortDirection" />
        </label>
        <label class="radio-label">
          Descending
          <input type="radio" name="secondary-sort-dir" value="desc" v-model="sortDirection" />
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

  .checkbox-label {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .checkbox-label:not(:first-of-type) {
    margin-left: 16px;
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
  import { KanjiSet, ReadingType, MatchOption, SortBy, OrderBy } from '../models'
  import { convertText } from '../workers'
  import conversionTable, { ConversionItem } from '../data/conversion-table'
  import KanaKeyboard from './KanaKeyboard.vue'

  export interface SubmitProps {
    kanjiSet: KanjiSet
    readingMatchOption: MatchOption
    readingConverted: ConversionItem[]
    readingType: ReadingType
    meaning: string
    sortField: SortBy
    sortDirection: OrderBy
    grade: number | string | null
  }

  @Component({
    components: {
      KanaKeyboard
    }
  })
  export default class KanjiForm extends Vue {
    private kanjiSet: KanjiSet = ['jouyou', 'jinmeiyou', 'hyougai', 'kyouiku', 'jlpt']
    private readingMatchOption: MatchOption = 'start'
    private reading = ''
    private readingError = ''
    private readingConverted: ConversionItem[] = []
    private readingType: ReadingType = ['on', 'kun', 'nanori']
    private meaning = ''
    private meaningError = false
    private grade = '-1'
    private sortField: SortBy = 'frequency'
    private sortDirection: OrderBy = 'asc'

    async onReadingBlur() {
      this.readingError = ''
      this.readingConverted = []

      // TODO: Don't use try / catch for this; pass back errors
      try {
        this.readingConverted = await convertText(this.reading, conversionTable)
      } catch (e) {
        this.readingError = e
      }
    }

    onPickedKana(kana: ConversionItem) {
      this.readingConverted.push(kana)
      this.reading = this.readingConverted
        .map((x) => {
          if (!x.original) {
            throw new Error('Conversion property "original" unexpectedly empty.')
          }
          return x[x.original]
        })
        .join('')
    }

    onSubmit() {
      if (!!this.readingError || !!this.meaningError) {
        return
      }

      this.$emit('submit', {
        kanjiSet: this.kanjiSet,
        readingMatchOption: this.readingMatchOption,
        readingConverted: this.readingConverted,
        readingType: this.readingType,
        meaning: this.meaning,
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        grade: this.grade === '-1' ? null : this.grade
      } as SubmitProps)
    }
  }
</script>

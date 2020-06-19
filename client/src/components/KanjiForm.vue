<template>
  <form @submit.prevent="onSubmit" class="kanji-form">
    <fieldset class="kanji-form__section kanji-form__section--meaning">
      <legend>Search by Meaning</legend>
      <ul class="kanji-form__control-list">
        <li>
          <label class="kn-input">
            <input
              type="text"
              class="kn-input__control"
              placeholder="Sun, dog, etc."
              v-model="meaning"
              data-tid="meaning-text"
            />
            <span class="kn-input__label">Text</span>
          </label>
        </li>
        <li>
          <label class="kn-select">
            <select class="kn-select__control" v-model="meaningMatchOption">
              <option value="exact">Exactly</option>
              <option value="start">Start only</option>
              <option value="anywhere">Anywhere</option>
            </select>
            <span class="kn-select__label">Matches</span>
          </label>
        </li>
      </ul>
    </fieldset>
    <fieldset class="kanji-form__section kanji-form__section--readings">
      <legend>Search by Reading</legend>
      <ul class="kanji-form__control-list">
        <li>
          <label class="kn-input">
            <span v-if="readingError !== ''" data-tid="reading-error">{{ readingError }}</span>
            <input
              type="text"
              class="kn-input__control"
              placeholder="Kana or Romaji"
              v-model="reading"
              data-tid="reading-input"
            />
            <span class="kn-input__label">Text</span>
          </label>
        </li>
        <li>
          <kana-keyboard @kana-picked="onPickedKana"></kana-keyboard>
        </li>
        <li>
          <label class="kn-select">
            <select class="kn-select__control" v-model="readingMatchOption">
              <option value="exact">Exactly</option>
              <option value="start">Start only</option>
              <option value="anywhere">Anywhere</option>
            </select>
            <span class="kn-select__label">Matches</span>
          </label>
        </li>
      </ul>
      <ul class="kanji-form__control-list kanji-form__control-list--spaced">
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="reading-type"
              v-model="readingType"
              value="on"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">On'yomi</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="reading-type"
              v-model="readingType"
              value="kun"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Kun'yomi</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="reading-type"
              v-model="readingType"
              value="nanori"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Nanori</span>
          </label>
        </li>
      </ul>
    </fieldset>
    <fieldset class="kanji-form__section kanji-form__section--sets">
      <legend>Kanji Set</legend>
      <ul class="kanji-form__control-list kanji-form__control-list--spaced">
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="kanji-set"
              v-model="kanjiSet"
              value="jouyou"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Jōyō</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="kanji-set"
              v-model="kanjiSet"
              value="jinmeiyou"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Jinmeiyō</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="kanji-set"
              v-model="kanjiSet"
              value="kyouiku"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Kyōiku</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="kanji-set"
              v-model="kanjiSet"
              value="jlpt"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">JLPT</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              name="kanji-set"
              v-model="kanjiSet"
              value="hyougai"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Hyōgai</span>
          </label>
        </li>
      </ul>
    </fieldset>
    <fieldset class="kanji-form__section kanji-form__section--sorting">
      <legend>Sorting</legend>
      <ol class="kanji-form__control-list kanji-form__control-list--spaced">
        <li>
          <label class="kn-select">
            <select class="kn-select__control" v-model="primarySortField">
              <option value="frequency">Popularity</option>
              <option value="grade">Grade</option>
              <option value="jlpt">JLPT</option>
              <option value="strokeCount">Stroke Count</option>
              <option value="unicode">Unicode</option>
            </select>
            <span class="kn-select__label">Primary</span>
          </label>
        </li>
        <li>
          <ol>
            <li>
              <label class="kn-selection-item kn-radio">
                <input
                  type="radio"
                  name="primary-sort-dir"
                  value="asc"
                  class="kn-selection-item__control"
                  v-model="primarySortDirection"
                />
                <span class="kn-selection-item__label">Asc</span>
              </label>
            </li>
            <li>
              <label class="kn-selection-item kn-radio">
                <input
                  type="radio"
                  name="primary-sort-dir"
                  value="desc"
                  class="kn-selection-item__control"
                  v-model="primarySortDirection"
                />
                <span class="kn-selection-item__label">Desc</span>
              </label>
            </li>
          </ol>
        </li>
        <li>
          <label class="kn-select">
            <select
              class="kn-select__control"
              v-model="secondarySortField"
              :disabled="primarySortField === 'frequency' || primarySortField === 'unicode'"
            >
              <option value="none">None</option>
              <option value="frequency">Popularity</option>
              <option value="grade" :disabled="primarySortField === 'grade'">Grade</option>
              <option value="jlpt" :disabled="primarySortField === 'jlpt'">JLPT</option>
              <option value="strokeCount" :disabled="primarySortField === 'strokeCount'">Stroke Count</option>
              <option value="unicode">Unicode</option>
            </select>
            <span class="kn-select__label">Secondary</span>
          </label>
        </li>
        <li>
          <ol>
            <li>
              <label class="kn-selection-item kn-radio">
                <input
                  type="radio"
                  name="secondary-sort-dir"
                  value="asc"
                  class="kn-selection-item__control"
                  v-model="secondarySortDirection"
                  :disabled="
                    primarySortField === 'frequency' || primarySortField === 'unicode' || secondarySortField === 'none'
                  "
                />
                <span class="kn-selection-item__label">Asc</span>
              </label>
            </li>
            <li>
              <label class="kn-selection-item kn-radio">
                <input
                  type="radio"
                  name="secondary-sort-dir"
                  value="desc"
                  class="kn-selection-item__control"
                  v-model="secondarySortDirection"
                  :disabled="
                    primarySortField === 'frequency' || primarySortField === 'unicode' || secondarySortField === 'none'
                  "
                />
                <span class="kn-selection-item__label">Desc</span>
              </label>
            </li>
          </ol>
        </li>
      </ol>
    </fieldset>
    <fieldset class="kanji-form__section kanji-form__section--form-options">
      <legend>Options</legend>
      <ol class="kanji-form__control-list kanji-form__control-list--spaced">
        <li>
          <button type="button" data-tid="clear-button" class="kn-btn kn-danger" @click="setDefaultValues">
            Clear
          </button>
        </li>
        <li>
          <button type="submit" class="kn-btn kn-primary">Search</button>
        </li>
      </ol>
    </fieldset>
  </form>
</template>

<style lang="scss">
  .kanji-form {
    &__section:not(:first-child),
    &__control-list:not(:first-of-type) {
      margin-top: 1em;
    }

    &__control-list {
      align-items: center;
      display: flex;
      flex-direction: row;
    }

    &__control-list--spaced > li:not(:first-of-type) {
      margin-left: 1.5em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
  import { KanjiSet, ReadingType, MatchOption, SortBy, OrderBy, SortOptions } from '../models'
  import { convertText } from '../workers'
  import { ConversionItem } from '../data/conversion-table'
  import KanaKeyboard from './KanaKeyboard.vue'

  export interface KanjiFormSubmit {
    kanjiSet: KanjiSet
    meaning: string
    meaningMatchOption: MatchOption
    primarySort: SortOptions
    readingConverted: ConversionItem[]
    readingMatchOption: MatchOption
    readingType: ReadingType
    secondarySort: SortOptions
  }

  @Component({
    components: {
      KanaKeyboard
    }
  })
  export default class KanjiForm extends Vue {
    @Prop({ default: 300 })
    debounceTime!: number

    @Prop({ default: [] })
    conversionTable!: ConversionItem[]

    hasMeaningError = false
    kanjiSet: KanjiSet = ['jouyou', 'jinmeiyou', 'hyougai', 'kyouiku', 'jlpt']
    meaning = ''
    meaningMatchOption: MatchOption = 'start'
    primarySortDirection: OrderBy = 'asc'
    primarySortField: SortBy = 'frequency'
    reading = ''
    readingConverted: ConversionItem[] = []
    readingError = ''
    readingMatchOption: MatchOption = 'start'
    readingType: ReadingType = ['on', 'kun', 'nanori']
    secondarySortDirection: OrderBy = 'asc'
    secondarySortField: SortBy | 'none' = 'none'

    readingDebounceId: number | null = null
    submitDebounceId: number | null = null

    // TODO: This could be handled much better (Vuex?), but works for now
    setDefaultValues() {
      if (this.readingDebounceId !== null) {
        window.clearTimeout(this.readingDebounceId)
        this.readingDebounceId = null
      }

      if (this.submitDebounceId !== null) {
        window.clearTimeout(this.submitDebounceId)
        this.submitDebounceId = null
      }

      this.hasMeaningError = false
      this.kanjiSet = ['jouyou', 'jinmeiyou', 'hyougai', 'kyouiku', 'jlpt']
      this.meaning = ''
      this.meaningMatchOption = 'start'
      this.primarySortDirection = 'asc'
      this.primarySortField = 'frequency'
      this.reading = ''
      this.readingConverted = []
      this.readingError = ''
      this.readingDebounceId = null
      this.readingMatchOption = 'start'
      this.readingType = ['on', 'kun', 'nanori']
      this.secondarySortDirection = 'asc'
      this.secondarySortField = 'none'

      this.$emit('form-reset')
    }

    @Watch('reading')
    onReadingChanged() {
      if (this.readingDebounceId !== null) {
        window.clearTimeout(this.readingDebounceId)
        this.readingDebounceId = null
      }

      this.readingDebounceId = window.setTimeout(
        () => this.convertReadingStatefully(this.reading, this.conversionTable),
        this.debounceTime
      )
    }

    async convertReadingStatefully(reading: string, conversionTable: ConversionItem[]): Promise<void> {
      try {
        this.readingConverted = await convertText(this.reading, conversionTable)
        this.readingError = ''
      } catch (e) {
        this.readingError = e.message ? e.message : e
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
      if (this.submitDebounceId !== null) {
        window.clearTimeout(this.submitDebounceId)
        this.submitDebounceId = null
      }

      this.submitDebounceId = window.setTimeout(async () => {
        // If a debounce is currently waiting, cancel it and compute the reading early
        if (this.readingDebounceId !== null) {
          window.clearTimeout(this.readingDebounceId)
          this.readingDebounceId = null

          await this.convertReadingStatefully(this.reading, this.conversionTable)
        }

        if (!!this.readingError || !!this.hasMeaningError) {
          return
        }

        this.$emit('submit', {
          kanjiSet: this.kanjiSet,
          readingMatchOption: this.readingMatchOption,
          readingConverted: this.readingConverted,
          readingType: this.readingType,
          meaning: this.meaning,
          meaningMatchOption: this.meaningMatchOption,
          primarySort: {
            field: this.primarySortField,
            direction: this.primarySortDirection
          },
          secondarySort: {
            field: this.secondarySortField === 'none' ? null : this.secondarySortField,
            direction: this.secondarySortDirection
          }
        } as KanjiFormSubmit)
      }, this.debounceTime)
    }
  }
</script>

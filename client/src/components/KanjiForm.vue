<template>
  <form @submit.prevent="onSubmit" class="kn-kanji-form container">
    <fieldset class="kn-fieldset">
      <legend class="kn-fieldset__legend">Search by Meaning</legend>
      <ul class="kn-fieldset__content columns">
        <li class="column is-narrow">
          <kn-text-input
            label="Definition"
            placeholder="Sun, dog, etc."
            data-tid="meaning-text"
            v-model="meaning"
          ></kn-text-input>
        </li>
        <li class="column is-narrow">
          <kn-select-list label="Matches" v-model="meaningMatchOption">
            <option value="exact">Exactly</option>
            <option value="start">Start only</option>
            <option value="anywhere">Anywhere</option>
          </kn-select-list>
        </li>
      </ul>
    </fieldset>
    <fieldset class="kn-fieldset">
      <legend class="kn-fieldset__legend">Search by Reading</legend>
      <div class="kn-fieldset__content">
        <ul class="kn-kanji-form__reading-options columns">
          <li class="column is-narrow">
            <kn-text-input
              label="Pronunciation"
              placeholder="Kana or Romaji"
              data-tid="reading-input"
              v-model="reading"
            ></kn-text-input>
          </li>
          <li class="column is-narrow is-hidden-touch">
            <kana-keyboard @kana-picked="onPickedKana"></kana-keyboard>
          </li>
          <li class="column is-narrow">
            <kn-select-list label="Matches" v-model="readingMatchOption">
              <option value="exact">Exactly</option>
              <option value="start">Start only</option>
              <option value="anywhere">Anywhere</option>
            </kn-select-list>
          </li>
        </ul>
        <kn-select-list v-model="readingType" class="is-hidden-desktop" label="Use these readings" size="3" multiple>
          <option value="on">On'yomi</option>
          <option value="kun">Kun'yomi</option>
          <option value="nanori">Nanori</option>
        </kn-select-list>
        <ul class="columns is-hidden-touch">
          <li class="column is-narrow">
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
          <li class="column is-narrow">
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
          <li class="column is-narrow">
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
      </div>
    </fieldset>
    <fieldset class="kn-fieldset">
      <legend class="kn-fieldset__legend">Kanji Sets</legend>
      <div class="kn-fieldset__content">
        <kn-select-list v-model="kanjiSet" class="is-hidden-desktop" label="Draw from these sets" size="5" multiple>
          <option value="jouyou">General Use</option>
          <option value="jinmeiyou">Name Kanji</option>
          <option value="kyouiku">Gradeschool Kanji</option>
          <option value="jlpt">JLPT</option>
          <option value="hyougai">Unlisted Kanji</option>
        </kn-select-list>
        <ul class="columns is-hidden-touch">
          <li class="column is-narrow">
            <label class="kn-selection-item">
              <input
                type="checkbox"
                name="kanji-set"
                v-model="kanjiSet"
                value="jouyou"
                class="kn-selection-item__control"
              />
              <span class="kn-selection-item__label">General</span>
            </label>
          </li>
          <li class="column is-narrow">
            <label class="kn-selection-item">
              <input
                type="checkbox"
                name="kanji-set"
                v-model="kanjiSet"
                value="jinmeiyou"
                class="kn-selection-item__control"
              />
              <span class="kn-selection-item__label">Name</span>
            </label>
          </li>
          <li class="column is-narrow">
            <label class="kn-selection-item">
              <input
                type="checkbox"
                name="kanji-set"
                v-model="kanjiSet"
                value="kyouiku"
                class="kn-selection-item__control"
              />
              <span class="kn-selection-item__label">School</span>
            </label>
          </li>
          <li class="column is-narrow">
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
          <li class="column is-narrow">
            <label class="kn-selection-item">
              <input
                type="checkbox"
                name="kanji-set"
                v-model="kanjiSet"
                value="hyougai"
                class="kn-selection-item__control"
              />
              <span class="kn-selection-item__label">Unlisted</span>
            </label>
          </li>
        </ul>
      </div>
    </fieldset>
    <fieldset class="kn-fieldset">
      <legend class="kn-fieldset__legend">Sorting</legend>
      <div class="kn-fieldset__content">
        <ol class="columns is-mobile">
          <li class="column is-narrow">
            <kn-select-list label="Primary" v-model="primarySortField" class="kanji-form__primary-sort">
              <option value="frequency">Popularity</option>
              <option value="grade" :disabled="secondarySortField === 'grade'">Grade</option>
              <option value="jlpt" :disabled="secondarySortField === 'jlpt'">JLPT</option>
              <option value="strokeCount" :disabled="secondarySortField === 'strokeCount'">Stroke Count</option>
              <option value="unicode">Unicode</option>
            </kn-select-list>
            <ol class="columns is-mobile">
              <li class="column is-narrow">
                <label class="kn-selection-item">
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
              <li class="column is-narrow">
                <label class="kn-selection-item">
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
          <li class="column is-narrow">
            <kn-select-list
              label="Secondary"
              v-model="secondarySortField"
              class="kanji-form__secondary-sort"
              :disabled="primarySortField === 'frequency' || primarySortField === 'unicode'"
            >
              <option value="none">None</option>
              <option value="frequency">Popularity</option>
              <option value="grade" :disabled="primarySortField === 'grade'">Grade</option>
              <option value="jlpt" :disabled="primarySortField === 'jlpt'">JLPT</option>
              <option value="strokeCount" :disabled="primarySortField === 'strokeCount'">Stroke Count</option>
              <option value="unicode">Unicode</option>
            </kn-select-list>
            <ol class="columns is-mobile">
              <li class="column is-narrow">
                <label class="kn-selection-item">
                  <input
                    type="radio"
                    name="secondary-sort-dir"
                    value="asc"
                    class="kn-selection-item__control"
                    v-model="secondarySortDirection"
                    :disabled="isSecondarySortDirDisabled"
                  />
                  <span class="kn-selection-item__label">Asc</span>
                </label>
              </li>
              <li class="column is-narrow">
                <label class="kn-selection-item">
                  <input
                    type="radio"
                    name="secondary-sort-dir"
                    value="desc"
                    class="kn-selection-item__control"
                    v-model="secondarySortDirection"
                    :disabled="isSecondarySortDirDisabled"
                  />
                  <span class="kn-selection-item__label">Desc</span>
                </label>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </fieldset>
    <fieldset class="kn-fieldset">
      <ol class="columns is-mobile">
        <li class="column is-narrow">
          <button type="button" data-tid="clear-button" class="kn-btn kn-negative" @click="setDefaultValues">
            Clear
          </button>
        </li>
        <li class="column is-narrow">
          <button type="submit" class="kn-btn kn-positive">Search</button>
        </li>
      </ol>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>
  .kn-kanji-form {
    .kn-fieldset:not(:first-of-type) {
      margin-top: 1.5rem;
    }

    &__reading-options {
      align-items: flex-end;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
  import { KanjiSet, ReadingType, MatchOption, SortBy, OrderBy, SortOptions } from '../models'
  import { convertText } from '../workers'
  import { ConversionItem } from '../data/conversion-table'
  import KanaKeyboard from './KanaKeyboard.vue'
  import KnSelectList from './SelectList.vue'
  import KnTextInput from './TextInput.vue'

  export interface KanjiFormSubmit {
    kanjiSet: KanjiSet[]
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
      KanaKeyboard,
      KnSelectList,
      KnTextInput
    }
  })
  export default class KanjiForm extends Vue {
    @Prop({ default: 300 }) debounceTime!: number
    @Prop({ default: [] }) conversionTable!: ConversionItem[]

    hasMeaningError = false
    kanjiSet: KanjiSet[] = ['jouyou', 'jinmeiyou', 'kyouiku', 'jlpt']
    meaning = ''
    meaningMatchOption: MatchOption = 'start'
    primarySortDirection: OrderBy = 'asc'
    primarySortField: SortBy = 'frequency'
    reading = ''
    readingConverted: ConversionItem[] = []
    readingError = ''
    readingMatchOption: MatchOption = 'start'
    readingType: ReadingType = ['on', 'kun']
    secondarySortDirection: OrderBy = 'asc'
    secondarySortField: SortBy | 'none' = 'none'

    readingDebounceId: number | null = null
    submitDebounceId: number | null = null

    get isSecondarySortDirDisabled() {
      return (
        this.primarySortField === 'frequency' ||
        this.primarySortField === 'unicode' ||
        this.secondarySortField === 'none'
      )
    }

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
      this.kanjiSet = ['jouyou', 'jinmeiyou', 'kyouiku', 'jlpt']
      this.meaning = ''
      this.meaningMatchOption = 'start'
      this.primarySortDirection = 'asc'
      this.primarySortField = 'frequency'
      this.reading = ''
      this.readingConverted = []
      this.readingError = ''
      this.readingDebounceId = null
      this.readingMatchOption = 'start'
      this.readingType = ['on', 'kun']
      this.secondarySortDirection = 'asc'
      this.secondarySortField = 'none'

      this.$emit('form-reset')
    }

    // TODO: Does this need a watch?
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

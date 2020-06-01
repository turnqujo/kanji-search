<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <fieldset>
      <legend>Search by Meaning</legend>
      <label class="kn-input">
        <input type="text" class="kn-input__control" placeholder="Sun, dog, etc." v-model="meaning" />
        <span class="kn-input__label">Text</span>
      </label>
      <label class="kn-select">
        <select class="kn-select__control" v-model="meaningMatchOption">
          <option value="exact">Exactly</option>
          <option value="start">Start only</option>
          <option value="anywhere">Anywhere</option>
        </select>
        <span class="kn-select__label">Matches</span>
      </label>
    </fieldset>
    <fieldset>
      <legend>Search by Reading</legend>
      <label class="kn-input">
        <span v-if="readingError !== ''">{{ readingError }}</span>
        <input
          type="text"
          class="kn-input__control"
          placeholder="Kana or Romaji"
          v-model="reading"
          @blur="onReadingBlur"
        />
        <span class="kn-input__label">Text</span>
      </label>
      <kana-keyboard @kana-picked="onPickedKana"></kana-keyboard>
      <label class="kn-select">
        <select class="kn-select__control" v-model="readingMatchOption">
          <option value="exact">Exactly</option>
          <option value="start">Start only</option>
          <option value="anywhere">Anywhere</option>
        </select>
        <span class="kn-select__label">Matches</span>
      </label>
      <div>
        <ul class="selection-group">
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
      </div>
    </fieldset>
    <fieldset>
      <legend>Kanji Set</legend>
      <ul class="selection-group">
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
    <fieldset>
      <legend>Sorting</legend>
      <label class="kn-select">
        <select class="kn-select__control" v-model="primarySortField">
          <option value="frequency">Popularity</option>
          <option value="grade">Grade</option>
          <option value="jlpt">JLPT</option>
          <option value="strokeCount">Stroke Count</option>
          <option value="unicode">Unicode</option>
        </select>
        <span class="kn-select__label">Primary Sort</span>
      </label>
      <ol class="selection-group">
        <li>
          <label class="kn-selection-item kn-radio">
            <input
              type="radio"
              name="primary-sort-dir"
              value="asc"
              class="kn-selection-item__control"
              v-model="primarySortDirection"
            />
            <span class="kn-selection-item__label">Ascending</span>
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
            <span class="kn-selection-item__label">Descending</span>
          </label>
        </li>
      </ol>
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
        <span class="kn-select__label">Secondary Sort</span>
      </label>
      <ol class="selection-group">
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
            <span class="kn-selection-item__label">Ascending</span>
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
            <span class="kn-selection-item__label">Descending</span>
          </label>
        </li>
      </ol>
    </fieldset>
    <button type="button" class="kn-btn kn-danger">Clear</button>
    <button type="submit" class="kn-btn kn-primary">Search</button>
  </form>
</template>

<style lang="scss">
  .selection-group {
    display: flex;
    flex-direction: row;

    & > li:not(:first-of-type) {
      margin-left: 1em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { KanjiSet, ReadingType, MatchOption, SortBy, OrderBy, SortOptions } from '../models'
  import { convertText } from '../workers'
  import conversionTable, { ConversionItem } from '../data/conversion-table'
  import KanaKeyboard from './KanaKeyboard.vue'

  export interface SubmitProps {
    kanjiSet: KanjiSet
    readingMatchOption: MatchOption
    readingConverted: ConversionItem[]
    readingType: ReadingType
    meaning: string
    meaningMatchOption: MatchOption
    primarySort: SortOptions
    secondarySort: SortOptions
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
    private meaningMatchOption: MatchOption = 'start'
    private primarySortField: SortBy = 'frequency'
    private primarySortDirection: OrderBy = 'asc'
    private secondarySortField: SortBy | 'none' = 'none'
    private secondarySortDirection: OrderBy = 'asc'

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
        meaningMatchOption: this.meaningMatchOption,
        primarySort: {
          field: this.primarySortField,
          direction: this.primarySortDirection
        },
        secondarySort: {
          field: this.secondarySortField === 'none' ? null : this.secondarySortField,
          direction: this.secondarySortDirection
        }
      } as SubmitProps)
    }
  }
</script>

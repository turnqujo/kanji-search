<template>
  <div class="kn-kanji-table__container">
    <ul class="kn-kanji-table__paginator">
      <li>
        <label class="kn-select kn-positive">
          <select v-model="perPage" class="kn-select__control">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option :value="adjustedKanji.length">All ({{ adjustedKanji.length }})</option>
          </select>
          <span class="kn-select__label">Per Page</span>
        </label>
      </li>
      <li>
        <button type="button" class="kn-btn kn-neutral" @click="onPreviousPage" data-tid="previous">Previous</button>
      </li>
      <li>
        <button type="button" class="kn-btn kn-neutral" @click="onNextPage" data-tid="next">Next</button>
      </li>
    </ul>
    <div class="kn-kanji-table__options">
      <label class="kn-selection-item kn-neutral">
        <input
          type="checkbox"
          name="checkboxes"
          value="true"
          class="kn-selection-item__control"
          v-model="displayNanori"
        />
        <span class="kn-selection-item__label">Show Nanori</span>
      </label>
    </div>
    <table class="kn-kanji-table">
      <caption class="kn-kanji-table__caption">
        A set of kanji, with information about each one.
      </caption>
      <thead class="kn-kanji-table__header">
        <tr class="kn-kanji-table__row">
          <th class="kn-kanji-table__cell" scope="col">Character</th>
          <th class="kn-kanji-table__cell" scope="col">Frequency</th>
          <th class="kn-kanji-table__cell" scope="col">Grade</th>
          <th class="kn-kanji-table__cell" scope="col">JLPT</th>
          <th class="kn-kanji-table__cell" scope="col">Strokes</th>
          <th class="kn-kanji-table__cell" scope="col">On</th>
          <th class="kn-kanji-table__cell" scope="col">Kun</th>
          <th class="kn-kanji-table__cell" scope="col" v-if="displayNanori">Nanori</th>
        </tr>
      </thead>
      <tbody class="kn-kanji-table__body">
        <tr class="kn-kanji-table__row" v-for="kanji in adjustedKanji" :key="kanji.char">
          <td class="kn-kanji-table__cell kn-kanji-table__cell--char" v-once>{{ kanji.char }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--frequency" v-once>{{ kanji.frequency }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--grade" v-once>{{ kanji.grade }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--jlpt" v-once>{{ kanji.jlpt }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--stroke" v-once>{{ kanji.stroke }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--on" v-once>{{ kanji.readings.on }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--kun" v-once>{{ kanji.readings.kun }}</td>
          <td class="kn-kanji-table__cell kn-kanji-table__cell--nanori" v-once v-if="displayNanori">{{ kanji.readings.nanori }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .kn-kanji-table {
    border: 1px solid var(--kn-background--aux);

    &__container {
      display: inline-block;
    }

    &__paginator,
    &__options {
      display: flex;
      align-items: center;
    }

    &__paginator > li:not(:first-of-type) {
      margin-left: 0.5em;
    }

    &__header > &__row {
      border-bottom: 1px solid var(--kn-background--aux);
      // text-align: left;
    }

    &__header &__cell {
      font-weight: bold;
      padding: 0.2em 0.5em;
    }

    &__body > &__row {
      border-bottom: 1px solid var(--kn-background--aux);
    }

    &__body &__cell {
      padding: 0 0.5em;
    }

    &__cell {
      vertical-align: middle;

      &--char {
        font-size: 1.5em;
        line-height: 1.5em;
        text-align: center;
        color: var(--kn-main);
      }
    }

    &__cell:not(:first-of-type) {
      border-left: 1px solid var(--kn-background--aux);
    }

    @media only screen {
      &__caption {
        display: none;
      }
    }

    @media only screen and (max-width: 760px) {
      .kn-kanji-table,
      .kn-kanji-table__header,
      .kn-kanji-table__row,
      .kn-kanji-table__header-cell,
      .kn-kanji-table__body-cell,
      .kn-kanji-table__row {
        background-color: pink;
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { Kanji } from '../models'

  // TODO: Move the sort fields & calls to webworkers in here

  @Component({})
  export default class KanjiTable extends Vue {
    // TODO: Passing around a massive array of kanji is seriously impacting performance
    @Prop({ default: [] }) kanjiSet!: Kanji[]

    displayNanori = false
    perPage = 10
    dirtyState = false

    get adjustedKanji() {
      this.dirtyState = true
      return this.kanjiSet.map((x) => ({
        ...x,
        stroke: this.adjustStrokeDisplay(x.stroke),
        frequency: Number(x.frequency).toLocaleString(),
        readings: {
          on: this.adjustReadingDisplay(x.readings.on),
          kun: this.adjustReadingDisplay(x.readings.kun),
          nanori: this.adjustReadingDisplay(x.readings.nanori)
        }
      }))
    }

    adjustStrokeDisplay(stroke: string | number | number[]): number | string {
      return Array.isArray(stroke) ? stroke.sort((x, y) => (Number(x) > Number(y) ? 1 : -1)).join(', ') : stroke
    }

    adjustReadingDisplay(reading: string[] | null): string {
      return reading === null ? '' : reading.slice(0, 3).join(', ')
    }

    onPreviousPage() {
      console.log('previous')
    }

    onNextPage() {
      console.log('next')
    }
  }
</script>

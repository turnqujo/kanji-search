<template>
  <table class="kn-kanji-table">
    <caption class="kn-kanji-table__caption">
      A set of kanji, with information about each one.
    </caption>
    <thead class="kn-kanji-table__header">
      <tr class="kn-kanji-table__row">
        <th class="kn-kanji-table__cell kn-kanji-table__cell--char" scope="col">Character</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('frequency')">Frequency</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('grade')">Grade</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('jlpt')">JLPT</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('stroke')">Strokes</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('on')">On</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('kun')">Kun</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('nanori')">Nanori</th>
        <th class="kn-kanji-table__cell" scope="col" v-if="filters.includes('meanings')">Meanings</th>
      </tr>
    </thead>
    <tbody class="kn-kanji-table__body">
      <tr class="kn-kanji-table__row" v-for="kanji in adjustedKanji" :key="kanji.char" :data-tid="kanji.char">
        <td class="kn-kanji-table__cell kn-kanji-table__cell--char" v-once>{{ kanji.char }}</td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--frequency" v-if="filters.includes('frequency')">
          {{ kanji.frequency }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--grade" v-if="filters.includes('grade')">
          {{ kanji.grade }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--jlpt" v-if="filters.includes('jlpt')">
          {{ kanji.jlpt }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--stroke" v-if="filters.includes('stroke')">
          {{ kanji.stroke }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--on" v-if="filters.includes('on')">
          {{ kanji.readings.on }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--kun" v-if="filters.includes('kun')">
          {{ kanji.readings.kun }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--nanori" v-if="filters.includes('nanori')">
          {{ kanji.readings.nanori }}
        </td>
        <td class="kn-kanji-table__cell kn-kanji-table__cell--meanings" v-if="filters.includes('meanings')">
          {{ kanji.meanings[0] }}
        </td>
      </tr>
      <tr class="kn-kanji-table__row kn-kanji-table__empty-message" v-if="adjustedKanji.length <= 0">
        <td class="kn-kanji-table__cell kn-kanji-table__cell--empty" :colspan="numVisibleRows">No Kanji Found</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
  .kn-kanji-table {
    --table-border-color: var(--kn-default);
    background-color: var(--kn-background);
    border: 2px solid var(--table-border-color);
    display: inline-block;
    margin-top: 1em;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;

    &__header {
      border-bottom: 1px solid var(--table-border-color);
      color: var(--kn-background);
      font-weight: bold;
      position: sticky;
      text-align: left;
      top: 0;
      z-index: 1;
    }

    &__header &__cell {
      background-color: var(--kn-default);
    }

    &__body > &__row {
      border-bottom: 1px solid var(--table-border-color);
    }

    &__cell {
      vertical-align: middle;
      white-space: nowrap;
      padding: 0.2em 0.5em;

      &--meanings {
        text-transform: capitalize;
      }

      &--empty {
        padding: 1em;
        text-align: center;
      }
    }

    &__cell:not(:last-of-type) {
      border-right: 2px solid var(--table-border-color);
    }

    &__cell--char {
      position: sticky;
    }

    &__header &__cell--char {
      top: 0;
      left: 0;
    }

    &__body &__cell--char {
      position: sticky;
      border: 0;
      color: var(--kn-main);
      font-size: 1.5em;
      left: 0;
      line-height: 1.5em;
      padding: 0;
      text-align: center;

      // This pseudo-element is essentially acting as a background fill
      &::before {
        background-color: var(--kn-background);
        border-right: 2px solid var(--table-border-color);
        bottom: 0;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
      }
    }

    @media only screen {
      &__caption {
        display: none;
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { Kanji } from '../../models'
  import { KanjiFilterOptions } from './kanjiFilters.vue'

  @Component({})
  export default class KanjiTable extends Vue {
    @Prop({ default: () => [] }) kanjiSet!: Kanji[]
    @Prop({ default: () => [] }) filters!: KanjiFilterOptions[]

    get numVisibleRows() {
      return this.filters.length + 1
    }

    get adjustedKanji() {
      return this.kanjiSet.map((x: Kanji) => ({
        ...x,
        stroke: this.adjustStrokeDisplay(x.stroke),
        frequency: Number(x.frequency).toLocaleString(),
        readings: {
          on: this.adjustReadingDisplay(x.readings.on),
          kun: this.adjustReadingDisplay(x.readings.kun),
          nanori: this.adjustReadingDisplay(x.readings.nanori)
        },
        meanings: this.adjustTextListDisplay(x.meanings)
      }))
    }

    adjustStrokeDisplay(stroke: string | number | number[]): number | string {
      return Array.isArray(stroke) ? stroke.sort((x, y) => (Number(x) > Number(y) ? 1 : -1)).join(', ') : stroke
    }

    adjustReadingDisplay(reading: string[] | null): string {
      return reading === null ? '' : reading.slice(0, 3).join(', ')
    }

    adjustTextListDisplay(texts: string[]): string[] {
      return [texts.slice().join(', ')]
    }
  }
</script>

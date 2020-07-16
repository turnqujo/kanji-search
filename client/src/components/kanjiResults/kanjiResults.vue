<template>
  <div class="kn-results">
    <div class="kn-results__supplements">
      <div class="kn-results-filters__container">
        <kanji-filters :state="filterState" @onOptionsChanged="onFiltersChanged"></kanji-filters>
      </div>
      <div class="kn-results-paginator__container">
        <kanji-paginator :state="paginatorState" @onChange="onPaginatorChanged"></kanji-paginator>
      </div>
    </div>
    <div class="kn-results-table__container">
      <kanji-table :kanji-set="limitedKanjiSet" :filters="filterState"></kanji-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kn-results {
    &__supplements {
      display: flex;
    }

    &-filters__container {
      align-self: center;
    }

    &-paginator__container {
      margin-left: 1em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import { Kanji } from '../../models'
  import KanjiFilters, { KanjiFilterOptions } from './kanjiFilters.vue'
  import KanjiPaginator, { KanjiPaginatorState } from './paginator.vue'
  import KanjiTable from './kanjiTable.vue'

  @Component({
    components: {
      KanjiFilters,
      KanjiTable,
      KanjiPaginator
    }
  })
  export default class KanjiResults extends Vue {
    @Prop({ default: [] }) kanjiSet!: Kanji[]

    get limitedKanjiSet(): Kanji[] {
      return this.kanjiSet.slice(
        this.paginatorState.pageIndex,
        this.paginatorState.pageIndex + this.paginatorState.perPageLimit
      )
    }

    private filterState: KanjiFilterOptions[] = ['frequency', 'grade', 'jlpt', 'stroke', 'on', 'kun', 'meanings']

    private currentPaginatorState: KanjiPaginatorState = {
      perPageLimit: 10,
      pageIndex: 0,
      listLength: this.kanjiSet.length
    }

    get paginatorState(): KanjiPaginatorState {
      return this.kanjiSet.length !== this.currentPaginatorState.listLength
        ? { ...this.currentPaginatorState, pageIndex: 0, listLength: this.kanjiSet.length }
        : { ...this.currentPaginatorState, listLength: this.kanjiSet.length }
    }

    set paginatorState(newState: KanjiPaginatorState) {
      this.currentPaginatorState = newState
    }

    onPaginatorChanged(pageIndex: number, perPageLimit: number) {
      this.paginatorState =
        this.paginatorState.perPageLimit !== perPageLimit
          ? { ...this.paginatorState, pageIndex: 0, perPageLimit: Number(perPageLimit) }
          : { ...this.paginatorState, pageIndex: Number(pageIndex), perPageLimit: Number(perPageLimit) }
    }

    onFiltersChanged(newState: KanjiFilterOptions[]) {
      this.filterState = newState
    }
  }
</script>

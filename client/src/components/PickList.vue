<template>
  <div class="kn-results">
    <span
      ><span data-tid="result-count">{{ kanjiSet.length }}</span> Found</span
    >
    <div class="page-control__container">
      <span>Index: {{ pageIndex }}</span>
      <button type="button" @click="onPreviousPage" data-tid="previous">Previous</button>
      <button type="button" @click="onNextPage" data-tid="next">Next</button>
      <label class="input-label">
        <span class="input-label__text">Kanji per Page</span>
        <select v-model="perPage">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option :value="kanjiSet.length">All ({{ kanjiSet.length }})</option>
        </select>
      </label>
    </div>
    <ol class="kanji-card__container">
      <li class="kanji-card" v-for="kanji in pagedSet" :key="kanji.char">
        <kanji-card v-once :kanji="kanji"></kanji-card>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
  .kanji-card__container {
    margin: 16px 32px;
  }

  .kanji-card:not(:first-of-type) {
    margin-top: 8px;
  }
</style>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Kanji } from '../models/kanji'
  import KanjiCard from './KanjiCard.vue'

  @Component({
    components: {
      KanjiCard
    }
  })
  export default class PickList extends Vue {
    @Prop() kanjiSet!: Kanji[]

    pagedSet: Kanji[] = new Array<Kanji>()
    pageIndex = 0
    perPage = 10

    @Watch('kanjiSet')
    onKanjiSetChanged() {
      // Reset these values to their defaults
      this.pageIndex = 0
      this.perPage = 10

      this.updatePagedSet()
    }

    @Watch('perPage')
    onPerPageChanged(newVal: number | string) {
      this.perPage = Number(newVal)

      if (this.perPage === this.kanjiSet.length) {
        this.pageIndex = 0
      }

      this.updatePagedSet()
    }

    onNextPage() {
      if (this.pageIndex + this.perPage >= this.kanjiSet.length) {
        return
      }

      this.pageIndex += this.perPage
      this.updatePagedSet()
    }

    onPreviousPage() {
      if (this.pageIndex - this.perPage < 0) {
        this.pageIndex = 0
        return
      }

      this.pageIndex -= this.perPage
      this.updatePagedSet()
    }

    updatePagedSet() {
      this.pagedSet = this.kanjiSet.slice(this.pageIndex, this.pageIndex + this.perPage)
    }
  }
</script>

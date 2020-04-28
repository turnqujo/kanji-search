<template>
  <div>
    <span>{{ kanjiSet.length.toLocaleString() }} Kanji Found</span>
    <div class="page-control__container">
      <span>Index: {{ pageIndex }}</span>
      <button type="button" @click="onPreviousPage">Previous</button>
      <button type="button" @click="onNextPage">Next</button>
      <label class="input-label">
        <span class="input-label__text">Kanji per Page</span>
        <select v-model="perPage">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option :value="kanjiSet.length">All ({{ kanjiSet.length.toLocaleString() }})</option>
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

<style lang="scss">
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
      this.pageIndex = 0
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
      } else {
        this.pageIndex += this.perPage
      }

      this.updatePagedSet()
    }

    onPreviousPage() {
      if (this.pageIndex - this.perPage < 0) {
        this.pageIndex = 0
      } else {
        this.pageIndex -= this.perPage
      }

      this.updatePagedSet()
    }

    updatePagedSet() {
      this.pagedSet = this.kanjiSet.slice(this.pageIndex, this.pageIndex + this.perPage)
    }
  }
</script>

<template>
  <ul class="kn-kanji-paginator" v-if="state.listLength > 0">
    <li>
      <label class="kn-select kn-positive">
        <select v-model="perPage" class="kn-select__control">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="100">100</option>
        </select>
        <span class="kn-select__label">Per Page</span>
      </label>
    </li>
    <li>
      <button
        type="button"
        class="kn-btn kn-ghost"
        @click="onFirstPageClicked"
        data-tid="first"
        :disabled="atStartOfList"
      >
        First
      </button>
    </li>
    <li>
      <button
        type="button"
        class="kn-btn kn-ghost"
        @click="onPreviousPageClicked"
        data-tid="previous"
        :disabled="atStartOfList"
      >
        Previous
      </button>
    </li>
    <li>
      <span class="kn-kanji-paginator__state">{{ statusMessage }}</span>
    </li>
    <li>
      <button type="button" class="kn-btn kn-ghost" @click="onNextPageClicked" data-tid="next" :disabled="atEndOfList">
        Next
      </button>
    </li>
    <li>
      <button type="button" class="kn-btn kn-ghost" @click="onLastPageCLicked" data-tid="last" :disabled="atEndOfList">
        Last
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .kn-kanji-paginator {
    display: flex;
    align-items: center;

    & > li:not(:first-of-type) {
      margin-left: 1em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  export interface KanjiPaginatorState {
    perPageLimit: number
    pageIndex: number
    listLength: number
  }

  @Component({})
  export default class KanjiPaginator extends Vue {
    @Prop() state!: KanjiPaginatorState

    get perPage() {
      return this.state.perPageLimit
    }
    set perPage(newPerPage: number) {
      if (this.state.perPageLimit === newPerPage) {
        return
      }

      this.$emit('onChange', this.pageIndex, newPerPage)
    }

    get pageIndex() {
      return this.state.pageIndex
    }
    set pageIndex(newIndex: number) {
      if (this.state.pageIndex === newIndex) {
        return
      }

      this.$emit('onChange', newIndex, this.perPage)
    }

    get atStartOfList() {
      return this.pageIndex - this.perPage < 0
    }

    get atEndOfList() {
      return this.pageIndex + this.perPage >= this.state.listLength
    }

    get statusMessage() {
      const start = Number(this.pageIndex).toLocaleString()
      const end = Math.min(Number(this.pageIndex) + Number(this.perPage), this.state.listLength).toLocaleString()
      const total = this.state.listLength.toLocaleString()
      return `(${start} - ${end}) of ${total}`
    }

    onFirstPageClicked() {
      this.pageIndex = 0
    }

    onPreviousPageClicked() {
      if (this.atStartOfList) {
        this.pageIndex = 0
        return
      }

      this.pageIndex -= this.perPage
    }

    onNextPageClicked() {
      if (this.atEndOfList) {
        return
      }

      this.pageIndex += this.perPage
    }

    onLastPageCLicked() {
      const hasPartialPage = this.state.listLength % this.perPage !== 0
      const totalPages = Math.floor(this.state.listLength / this.perPage)
      this.pageIndex = (hasPartialPage ? totalPages : totalPages - 1) * this.perPage
    }
  }
</script>

<template>
  <div class="kn-kanji-paginator" v-if="state.listLength > 0">
    <kn-select-list v-model="perPage" label="Per Page">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="100">100</option>
    </kn-select-list>
    <div class="kn-kanji-paginator__state-container">
      <span class="kn-kanji-paginator__state-message">{{ statusMessage }}</span>
      <ol class="kn-kanji-paginator__state-controls">
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
          <button
            type="button"
            class="kn-btn kn-ghost"
            @click="onNextPageClicked"
            data-tid="next"
            :disabled="atEndOfList"
          >
            Next
          </button>
        </li>
        <li>
          <button
            type="button"
            class="kn-btn kn-ghost"
            @click="onLastPageCLicked"
            data-tid="last"
            :disabled="atEndOfList"
          >
            Last
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kn-kanji-paginator {
    display: flex;

    &__state-container {
      margin-left: 1em;
      text-align: center;
    }

    &__state-message {
      display: inline-block;
      margin-bottom: 0.3em;
    }

    &__state-controls {
      display: flex;
      flex-direction: row;

      & > li:not(:first-of-type) {
        margin-left: 1em;
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import KnSelectList from '../SelectList.vue'

  export interface KanjiPaginatorState {
    perPageLimit: number
    pageIndex: number
    listLength: number
  }

  @Component({
    components: {
      KnSelectList
    }
  })
  export default class KanjiPaginator extends Vue {
    @Prop() state!: KanjiPaginatorState

    get perPage() {
      return Number(this.state.perPageLimit)
    }
    set perPage(newPerPage: number) {
      if (Number(this.state.perPageLimit) === Number(newPerPage)) {
        return
      }

      this.$emit('onChange', Number(this.pageIndex), Number(newPerPage))
    }

    get pageIndex() {
      return Number(this.state.pageIndex)
    }
    set pageIndex(newIndex: number) {
      if (Number(this.state.pageIndex) === Number(newIndex)) {
        return
      }

      this.$emit('onChange', Number(newIndex), Number(this.perPage))
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
      if (this.atStartOfList) {
        return
      }

      this.pageIndex = 0
    }

    onPreviousPageClicked() {
      if (this.atStartOfList) {
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
      if (this.atEndOfList) {
        return
      }

      const hasPartialPage = this.state.listLength % this.perPage !== 0
      const totalPages = Math.floor(this.state.listLength / this.perPage)
      this.pageIndex = (hasPartialPage ? totalPages : totalPages - 1) * this.perPage
    }
  }
</script>

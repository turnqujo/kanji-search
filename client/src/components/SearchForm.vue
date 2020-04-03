<template>
  <div class="search-form">
    <label class="input-label">
      <span class="input-label-text">Kanji Set</span>
      <select v-model="formState.kanjiSet">
        <option value="jooyoo">Jōyō</option>
        <option value="jinmeiyoo">Jinmeiyō</option>
      </select>
    </label>
    <div class="kana-input">
      <kana-keyboard
        @input="onReadingInput"
        @matchSettingChanged="onMatchSettingChange"
      ></kana-keyboard>
    </div>
    <div>
      <label class="input-label">
        <span class="input-label-text">Meaning</span>
        <input type="text" v-model="formState.meaning" />
      </label>
    </div>
    <div>
      <label>
        <span>Sort by</span>
        <select v-model="formState.sortBy">
          <option value="frequency">Frequency</option>
          <option value="strokeCount">Stroke Count</option>
          <option value="unicode">Unicode</option>
        </select>
      </label>
      <label>
        <span>Asc</span>
        <input type="radio" name="direction" value="asc" v-model="formState.orderBy" />
      </label>
      <label>
        <span>Desc</span>
        <input type="radio" name="direction" value="desc" v-model="formState.orderBy" />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-form {
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
  }

  .kana-input {
    display: flex;
  }
</style>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { MatchOption } from '../workers/getKanjiByRomaji.wrapper'
  import KanaKeyboard from '../components/formControls/KanaKeyboard.vue'
  import { SortBy, OrderBy, convertText } from '../workers'
  import conversionTable from '../data/conversion-table'

  export type KanjiSet = 'jooyoo' | 'jinmeiyoo'

  export interface SearchFormState {
    kanjiSet: KanjiSet
    meaning: string
    reading: string
    matchSetting: MatchOption
    sortBy: SortBy
    orderBy: OrderBy
  }

  @Component({
    components: {
      KanaKeyboard
    }
  })
  export default class SearchForm extends Vue {
    private formState: SearchFormState = {
      kanjiSet: 'jooyoo',
      meaning: '',
      reading: '',
      matchSetting: 'start',
      sortBy: 'strokeCount',
      orderBy: 'asc'
    }

    @Watch('formState', { deep: true })
    onFormChange() {
      this.$emit('change', this.formState)
    }

    // TODO: This should accept an array of conversion items
    async onReadingInput(reading: string) {
      // TODO: Move this conversion down so that validation occurs there
      const conversion = await convertText(reading, conversionTable)
      this.formState = { ...this.formState, reading: conversion.map(x => x.romaji).join('') }
    }

    onMatchSettingChange(matchSetting: MatchOption) {
      this.formState = { ...this.formState, matchSetting }
    }

    onSortByChanged(sortBy: SortBy) {
      this.formState = { ...this.formState, sortBy }
    }
  }
</script>

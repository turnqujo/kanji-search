<template>
  <div class="search-form">
    <div class="kana-input">
      <kana-keyboard @input="onReadingInput"></kana-keyboard>
    </div>
    <label>
      <span>Sort by</span>
      <select>
        <option>Frequency</option>
        <option>Stroke Count</option>
        <option>Unicode</option>
      </select>
    </label>
    <label>
      <span>Asc</span>
      <input type="radio" name="direction" value="asc" checked />
    </label>
    <label>
      <span>Desc</span>
      <input type="radio" name="direction" value="desc" />
    </label>
    <label>
      <span>Kanji Set</span>
      <select>
        <option>Regular Use Kanji</option>
        <option>Name Kanji</option>
      </select>
    </label>
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
  import { Component, Vue } from 'vue-property-decorator'
  import KanaKeyboard from '@/components/formControls/KanaKeyboard.vue'

  @Component({
    components: {
      KanaKeyboard
    }
  })
  export default class SearchForm extends Vue {
    async onReadingInput(reading: string) {
      this.$emit('change', { reading })
    }
  }
</script>

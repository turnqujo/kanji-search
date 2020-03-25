<template>
  <div class="search-form">
    <text-input
      @input="onReadingInput"
      :label="'Reading'"
      :placeholder="'ボ'"
      :current-value="'test'"
      :name="'reading-input'"
    >
      <template v-slot:input-prefix>
        <select>
          <option>Starts with</option>
          <option>Matches</option>
          <option>Contains</option>
        </select>
      </template>
      <template v-slot:input-postfix>
        <button type="button">
          <span class="far fa-keyboard"></span>
        </button>
      </template>
    </text-input>
    <text-input :label-text="'Meaning'" :name="'meaning-input'"></text-input>
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
    justify-content: space-around;
    align-items: center;
    margin: 16px 16px 0 16px;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TextInput from '@/components/formControls/TextInput.vue'

  @Component({
    components: {
      TextInput
    }
  })
  export default class SearchForm extends Vue {
    public onReadingInput(newReading: string) {
      console.log(newReading)
    }

    public onInput(e: InputEvent) {
      console.log(e)
    }
  }
</script>

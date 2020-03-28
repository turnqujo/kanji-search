<template>
  <div class="kana-keyboard">
    <div class="kana-keyboard__options-container">
      <select>
        <option>Starts with</option>
        <option>Matches</option>
        <option>Contains</option>
      </select>
      <label>
        <input type="text" v-model="currentInput" />
      </label>
      <select @change="onModeChange">
        <option value="hiragana">Hiragana</option>
        <option value="katakana">Katakana</option>
        <option value="romaji">Romaji</option>
      </select>
      <select @change="onModifierChange">
        <option value="unmodified">Unmodified</option>
        <option value="dakuten">Dakuten</option>
        <option value="handakuten">Handakuten</option>
      </select>
    </div>
    <div class="kana-keyboard__table">
      <ul class="kana-keyboard__table-row" v-for="(set, index) in kanaSet" :key="index">
        <li class="kana-keyboard__table-item" v-for="(item, itemIndex) in set" :key="itemIndex">
          <button v-if="item !== null" @click="() => onKanaClicked(item)">
            {{ item[mode] }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .kana-keyboard {
    position: relative;
    color: black;

    &__toggle-icon {
      font-size: 28px;
    }

    &__options-container {
      display: flex;
    }

    &__table {
      background-color: white;
      display: inline-block;

      &-row {
        display: flex;
      }

      &-item {
        font-size: 18px;
        border: solid gray 1px;
        border-radius: 2px;
        margin: 2px;
        text-align: center;
        width: 2em;

        & > button {
          padding: 8px;
          width: 100%;
        }
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { ConversionItem } from '../../data/conversion-table'
  import { gojuonOrdered } from '../../data/gojuon-ordered-kana'

  type ModeType = 'hiragana' | 'katakana' | 'romaji'
  type Modifier = 'unmodified' | 'dakuten' | 'handakuten'

  @Component({})
  export default class KanaKeyboard extends Vue {
    mode: ModeType = 'hiragana'
    modifier: Modifier = 'unmodified'
    kanaSet: (ConversionItem | null)[][] = gojuonOrdered

    private realCurrentInput = ''
    get currentInput() {
      return this.realCurrentInput
    }
    set currentInput(newVal: string) {
      this.realCurrentInput = newVal
      this.$emit('input', this.realCurrentInput)
    }

    private onModeChange(e: Event) {
      const selectElement = e.target as HTMLSelectElement
      this.mode = selectElement.value as ModeType
    }

    private onModifierChange(e: Event) {
      const selectElement = e.target as HTMLSelectElement
      this.modifier = selectElement.value as Modifier
    }

    private onKanaClicked(kana: ConversionItem) {
      this.currentInput += kana.romaji
    }
  }
</script>

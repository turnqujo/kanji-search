<template>
  <div class="kana-keyboard">
    <div class="options-container">
      <label class="input-label">
        <span class="input-label-text">Match Setting</span>
        <select>
          <option>Starts with</option>
          <option>Exact</option>
          <option>Contains</option>
        </select>
      </label>
      <label class="input-label">
        <span class="input-label-text">Reading</span>
        <input class="kana-input" type="text" v-model="currentInput" placeholder="ヘン" />
      </label>
      <button @click="onToggleKeyboard"><i class="toggle-icon far fa-keyboard" /></button>
    </div>
    <div class="popup" v-if="open">
      <div class="kana-table">
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
        <ul class="kana-table-row" v-for="(set, index) in kanaSet" :key="index">
          <li class="kana-table-item" v-for="(item, itemIndex) in set" :key="itemIndex">
            <button v-if="item !== null" @click="() => onKanaClicked(item)">
              {{ item[mode] }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kana-keyboard {
    position: relative;
    color: black;
  }

  .options-container {
    display: flex;
    align-items: flex-end;
  }

  .input-label {
    text-align: left;
  }

  .input-label-text {
    display: block;
    margin-bottom: 4px;
    margin-left: 4px;
  }

  .kana-input {
    margin-left: 4px;
  }

  .toggle-icon {
    font-size: 28px;
    margin-left: 4px;
  }

  .popup {
    position: absolute;
  }

  .kana-table {
    background-color: white;
    display: inline-block;
  }

  .kana-table-row {
    display: flex;
  }

  .kana-table-item {
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
    open = false

    /**
     * TODO: Store & Emit an array of conversion items instead of a string
     *  - This would help with mixed-kana inputs
     */
    realCurrentInput = ''
    get currentInput() {
      return this.realCurrentInput
    }
    set currentInput(newVal: string) {
      this.realCurrentInput = newVal
      this.$emit('input', this.realCurrentInput)
    }

    onModeChange(e: Event) {
      const selectElement = e.target as HTMLSelectElement
      this.mode = selectElement.value as ModeType
    }

    onModifierChange(e: Event) {
      const selectElement = e.target as HTMLSelectElement
      this.modifier = selectElement.value as Modifier
    }

    onToggleKeyboard() {
      this.open = !this.open

      // TODO: Stateful error, closing the keyboard causes the kana set to not change
      if (this.open) {
        this.mode = 'hiragana'
      }
    }

    onKanaClicked(kana: ConversionItem) {
      this.currentInput += kana.romaji
    }
  }
</script>

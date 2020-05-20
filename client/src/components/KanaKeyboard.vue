<template>
  <div class="kana-keyboard">
    <button type="button" @click="onToggleKeyboard">
      <i class="toggle-icon far fa-keyboard" />
    </button>
    <div class="popup" v-if="open">
      <div class="kana-table" v-on-click-outside="onToggleKeyboard">
        <select @change="onModeChange">
          <option value="hiragana">Hiragana</option>
          <option value="katakana">Katakana</option>
          <option value="romaji">Romaji</option>
        </select>
        <select @change="onModifierChange">
          <option value="unmodified">Unmodified</option>
          <option value="chiisai">Chiisai</option>
          <option value="dakuten">Dakuten</option>
          <option value="handakuten">Handakuten</option>
        </select>
        <ul class="kana-table-row" v-for="(set, index) in kanaSet" :key="index">
          <li class="kana-table-item" v-for="(item, itemIndex) in set" :key="itemIndex">
            <button type="button" v-if="item !== null" @click="() => onKanaClicked(item)">
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
  import { gojuonOrdered, gojuonDakuten, gojuonHandakuten } from '../data/gojuon-ordered-kana'
  import { chiisaiKana } from '../data/chiisai-kana'
  import { ConversionItem } from '../data/conversion-table'
  import onClickOutside from '../directives/OnClickOutside.vue'

  type ModeType = 'hiragana' | 'katakana' | 'romaji'
  type Modifier = 'unmodified' | 'chiisai' | 'dakuten' | 'handakuten'

  @Component({
    directives: {
      onClickOutside
    }
  })
  export default class KanaKeyboard extends Vue {
    mode: ModeType = 'hiragana'
    modifier: Modifier = 'unmodified'
    kanaSet: (ConversionItem | null)[][] = gojuonOrdered
    open = false

    onModeChange(e: Event) {
      const selectElement = e.target as HTMLSelectElement
      this.mode = selectElement.value as ModeType
    }

    onModifierChange(e: Event) {
      const selectElement = e.target as HTMLSelectElement
      this.modifier = selectElement.value as Modifier

      switch (this.modifier) {
        case 'unmodified':
          this.kanaSet = gojuonOrdered
          break
        case 'chiisai':
          this.kanaSet = chiisaiKana
          break
        case 'dakuten':
          this.kanaSet = gojuonDakuten
          break
        case 'handakuten':
          this.kanaSet = gojuonHandakuten
          break
      }
    }

    onToggleKeyboard() {
      this.open = !this.open

      // TODO: Stateful error, closing the keyboard causes the kana set to not change
      if (this.open) {
        // Reset to defaults
        this.mode = 'hiragana'
        this.modifier = 'unmodified'
        this.kanaSet = gojuonOrdered
      }
    }

    async onKanaClicked(kana: ConversionItem) {
      this.$emit('kana-picked', { ...kana, original: this.mode })
    }
  }
</script>
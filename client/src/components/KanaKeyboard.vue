<template>
  <div class="kana-keyboard">
    <button type="button" @click="onToggleKeyboard" data-tid="toggle-keyboard" class="toggle-btn">
      <svg class="kn-icon">
        <use xlink:href="img/icons/regular.svg#keyboard"></use>
      </svg>
    </button>
    <div class="popup" v-if="open">
      <div class="kana-table" v-on-click-outside="onToggleKeyboard">
        <ul class="keyboard-options">
          <li>
            <label class="kn-select">
              <select class="kn-select__control" v-model="mode">
                <option value="hiragana">Hiragana</option>
                <option value="katakana">Katakana</option>
                <option value="romaji">Romaji</option>
              </select>
              <span class="kn-select__label">Kana</span>
            </label>
          </li>
          <li>
            <label class="kn-select">
              <select class="kn-select__control" v-model="modifier">
                <option value="unmodified">Unmodified</option>
                <option value="chiisai">Chiisai</option>
                <option value="dakuten">Dakuten</option>
                <option value="handakuten">Handakuten</option>
              </select>
              <span class="kn-select__label">Modifier</span>
            </label>
          </li>
        </ul>
        <ul class="kana-table-row" v-for="(set, index) in kanaSet" :key="index">
          <li class="kana-table-item" v-for="(item, itemIndex) in set" :key="itemIndex">
            <button
              type="button"
              v-if="item !== null"
              @click="() => onKanaClicked(item)"
              :data-tid="`kana-${item[mode]}`"
            >
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

  .toggle-btn {
    margin-right: 0.5em;
  }

  .popup {
    position: absolute;
    z-index: 10;
  }

  .keyboard-options {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 0.5em 0;
  }

  .kana-table {
    display: inline-block;
    background-color: var(--kn-background);
    border: 1px solid var(--kn-foreground);
    padding: 0.5em;
  }

  .kana-table-row {
    display: flex;
  }

  .kana-table-item {
    background-color: var(--kn-background);
    border-radius: 2px;
    border: 1px solid var(--kn-foreground--aux);
    color: var(--kn-foreground);
    font-size: 1.2em;
    line-height: 1em;
    margin: 2px;
    text-align: center;
    width: 3.5em;

    & > button {
      padding: 8px;
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import {
    fetchGojuonHandakuten,
    fetchGojuonOrderedKana,
    fetchGojuonDakuten,
    fetchChiisaiKana
  } from '../data/gojuon-ordered-kana'
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
    kanaSet: (ConversionItem | null)[][] = []
    gojuonOrdered: (ConversionItem | null)[][] = []
    gojuonDakuten: (ConversionItem | null)[][] = []
    gojuonHandakuten: (ConversionItem | null)[][] = []
    chiisaiKana: (ConversionItem | null)[][] = []
    open = false

    async mounted() {
      this.gojuonOrdered = await fetchGojuonOrderedKana()
      this.gojuonDakuten = await fetchGojuonDakuten()
      this.gojuonHandakuten = await fetchGojuonHandakuten()
      this.chiisaiKana = await fetchChiisaiKana()

      this.kanaSet = this.gojuonOrdered.slice()
    }

    @Watch('modifier')
    onModifierChange() {
      switch (this.modifier) {
        case 'unmodified':
          this.kanaSet = this.gojuonOrdered.slice()
          break
        case 'chiisai':
          this.kanaSet = this.chiisaiKana.slice()
          break
        case 'dakuten':
          this.kanaSet = this.gojuonDakuten.slice()
          break
        case 'handakuten':
          this.kanaSet = this.gojuonHandakuten.slice()
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
        this.kanaSet = this.gojuonOrdered.slice()
      }
    }

    async onKanaClicked(kana: ConversionItem) {
      this.$emit('kana-picked', { ...kana, original: this.mode })
    }
  }
</script>

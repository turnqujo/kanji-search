<template>
  <div class="kn-kanji-filters">
    <button type="button" class="kn-kanji-filters__popup-toggle" @click="onTogglePopup">
      <svg class="kn-icon">
        <use xlink:href="img/icons/regular.svg#list-alt"></use>
      </svg>
    </button>
    <div class="kn-kanji-filters__popup" v-if="open" v-on-click-outside="onTogglePopup">
      <ul class="kn-kanji-filters__options-list">
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="frequency"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Frequency</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="grade"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Grade</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="jlpt"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">JLPT</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="stroke"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Strokes</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="on"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">On</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="kun"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Kun</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="nanori"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Nanori</span>
          </label>
        </li>
        <li>
          <label class="kn-selection-item">
            <input
              type="checkbox"
              v-model="filterOptions"
              name="checkboxes"
              value="meanings"
              class="kn-selection-item__control"
            />
            <span class="kn-selection-item__label">Meanings</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kn-kanji-filters {
    position: relative;

    &__popup {
      background-color: var(--kn-background);
      border-radius: 4px;
      border: 2px solid var(--kn-background--aux);
      padding: 0.5em 1em;
      position: absolute;
      z-index: 10;
    }

    &__options-list > li:not(:first-of-type) {
      margin-top: 1em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import onClickOutside from '../../directives/OnClickOutside.vue'

  export type KanjiFilterOptions = 'frequency' | 'grade' | 'jlpt' | 'stroke' | 'on' | 'kun' | 'nanori' | 'meanings'

  @Component({
    directives: {
      onClickOutside
    }
  })
  export default class KanjiFilters extends Vue {
    @Prop({ default: () => ['frequency', 'grade', 'jlpt', 'stroke', 'on', 'kun', 'meanings'] })
    state!: KanjiFilterOptions[]

    open = false

    private currentOptions: KanjiFilterOptions[] = this.state
    get filterOptions() {
      return this.currentOptions.slice()
    }
    set filterOptions(newOptions: KanjiFilterOptions[]) {
      this.currentOptions = newOptions
      this.$emit('onOptionsChanged', newOptions)
    }

    onTogglePopup() {
      this.open = !this.open
    }
  }
</script>

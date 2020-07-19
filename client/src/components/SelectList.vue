<template>
  <label class="kn-select-list">
    <select
      class="kn-select-list__control"
      v-model="currentValue"
      :disabled="noOptionsGiven || disabled"
      :multiple="multiple"
      :size="adjustedSize"
    >
      <slot>
        <option v-once :class="defaultOptionClass" value="" disabled>N/A</option>
      </slot>
    </select>
    <svg class="kn-icon" v-if="!isMulti">
      <use href="img/icons/solid.svg#chevron-down"></use>
    </svg>
    <svg class="kn-icon kn-icon--disabled" v-if="!isMulti">
      <use href="img/icons/solid.svg#minus-circle"></use>
    </svg>
    <span class="kn-select-list__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
  @import '../theme/mixins/_transitions.scss';
  @import '../theme/_colors.scss';

  .kn-select-list {
    --select-icon-size: 0.5em;
    --label-offset: 1.3em;
    display: inline-block;
    margin: var(--label-offset) 0 0.5em 0;
    position: relative;

    @each $variation in $semanticColors {
      &.#{$variation} &__control:not(:disabled) {
        border-color: var(--#{$variation});

        &:not(:focus) ~ .kn-icon {
          fill: var(--#{$variation});
        }

        ~ .kn-select-list__label {
          color: var(--#{$variation});
        }

        ~ .kn-select-list__label::selection {
          background-color: var(--#{$variation});
          color: var(--kn-background);
        }
      }

      &.#{$variation} &__control:not([multiple]):focus {
        background-color: var(--#{$variation});
      }
    }

    &__control {
      @include quickTransition(border-color, color, background-color);
      appearance: none;
      background-color: transparent;
      border-radius: 0;
      border: 1px solid var(--kn-foreground);
      color: var(--kn-foreground);
      box-sizing: border-box;
      font-size: 1em;
      padding: 0.25em calc(var(--select-icon-size) * 4) 0.25em 0.5em;
    }

    &__control:not([multiple]) {
      height: 2em;
    }

    &__control[multiple] {
      min-height: 2em;
    }

    &__control:focus {
      outline: 0;

      ~ .kn-select-list__label {
        text-decoration: underline;
      }
    }

    &__control:not([multiple]):focus {
      background-color: var(--kn-foreground);
      color: var(--kn-background);

      ~ .kn-icon {
        fill: var(--kn-background);
      }
    }

    &__control:disabled {
      border-color: var(--kn-disabled);
      color: var(--kn-disabled);

      ~ .kn-icon {
        display: none;
      }

      ~ .kn-icon--disabled {
        display: block;
        fill: var(--kn-disabled);
      }

      ~ .kn-select-list__label {
        color: var(--kn-disabled);
        font-style: italic;
      }
    }

    &__control option {
      background-color: var(--kn-background);
      color: var(--kn-foreground);
      width: 100%;
    }

    &__control option:disabled {
      color: var(--kn-disabled);
      font-style: italic;
    }

    .kn-icon {
      fill: var(--kn-foreground);
      height: var(--select-icon-size);
      pointer-events: none;
      position: absolute;
      right: calc(var(--select-icon-size) / 2);
      top: 50%;
      transform: translateY(-50%);
      width: var(--select-icon-size);
    }

    .kn-icon--disabled {
      display: none;
    }

    &__label {
      position: absolute;
      top: calc(var(--label-offset) * -1);
      left: 0;
      white-space: nowrap;
    }

    &__control[multiple] {
      overflow-y: auto;
      padding: 0.25em 0.5em;
      min-width: 5em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop, Model } from 'vue-property-decorator'

  @Component({})
  export default class KnSelectList extends Vue {
    @Model('change', { default: '' }) value!: string | string[]
    @Prop() multiple!: string
    @Prop() disabled!: string
    @Prop({ default: '' }) label!: string
    @Prop({ default: null }) size!: number | null

    private defaultOptionClass = 'kn-select-list__default-option'
    private fallbackValue: string | string[] = this.isMulti ? [] : ''
    private noOptionsGiven = false
    private observer: MutationObserver | null = null

    get currentValue(): string | string[] {
      return this.value ? this.value : this.fallbackValue
    }

    set currentValue(newVal: string | string[]) {
      this.fallbackValue = newVal
      this.$emit('change', newVal)
    }

    get isMulti(): boolean {
      return this.multiple === ''
    }

    get adjustedSize(): number {
      if (!this.isMulti) {
        // Default given to selects without a specified size
        return 1
      }

      if (this.noOptionsGiven) {
        return 1
      }

      if (this.size) {
        return this.size
      }

      // Default given to multi-selects without a specified size
      return 4
    }

    mounted() {
      this.observer = new MutationObserver(this.updateSelectState)

      this.observer.observe(this.$el.querySelector('.kn-select-list__control') as Node, {
        childList: true,
        subtree: true // Subtree observation needed in case of <optgroup> -> <option> content
      })

      this.updateSelectState()
    }

    updateSelectState() {
      const currentlySelected = this.$el.querySelector(`option[value='${this.currentValue}']`) as HTMLOptionElement
      if (currentlySelected) {
        this.noOptionsGiven = currentlySelected.classList.contains(this.defaultOptionClass)

        if (!this.isMulti && currentlySelected.value === '') {
          this.$emit('change', '')
        }

        return
      }

      const firstOptionInList = this.$el.querySelector('option')
      if (firstOptionInList) {
        this.noOptionsGiven = firstOptionInList.classList.contains(this.defaultOptionClass)

        if (!this.isMulti && this.currentValue !== firstOptionInList.value) {
          this.currentValue = firstOptionInList.value
        }

        return
      }

      // No options available - shouldn't happen with the default option declared
      throw new Error('Kn Select List is unexpectedly empty.')
    }
  }
</script>

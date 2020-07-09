<template>
  <label class="kn-input kn-input--select">
    <div class="kn-input__control-container">
      <select class="kn-input__control" v-model="currentModel" :disabled="noOptionsGiven">
        <slot>
          <option value="default" disabled>N/A</option>
        </slot>
      </select>
      <svg class="kn-icon kn-input__control-icon">
        <use href="img/icons/solid.svg#chevron-down"></use>
      </svg>
      <svg class="kn-icon kn-input__control-icon kn-input__control-icon--disabled">
        <use href="img/icons/solid.svg#minus-circle"></use>
      </svg>
      <span class="kn-input__label">{{ label }}</span>
    </div>
  </label>
</template>

<style lang="scss" scoped>
  @import '../../theme/_inputs.scss';

  .kn-input {
    --select-icon-size: 0.5em;

    &__control {
      appearance: none;
      padding-right: calc(var(--select-icon-size) * 3);

      &-container {
        margin-top: 1.5em;
        position: relative;
      }

      &-icon {
        height: var(--select-icon-size);
        pointer-events: none;
        position: absolute;
        right: calc(var(--select-icon-size) / 2);
        top: 50%;
        transform: translateY(-50%);
        width: var(--select-icon-size);
      }

      &-icon--disabled {
        display: none;
        fill: var(--kn-disabled);
      }

      &:disabled {
        color: var(--kn-disabled);
      }

      &:disabled ~ &-icon {
        display: none;
      }

      &:disabled ~ &-icon--disabled {
        display: block;
      }

      &:disabled ~ .kn-input__label {
        color: var(--kn-disabled);
        font-style: italic;
        pointer-events: none;
      }
    }

    // TODO: Move to the shared styling
    &__label {
      position: absolute;
      // TODO: Variables
      top: calc(-1em + -0.25em);
      left: 0;
      right: 0;
      white-space: nowrap;
    }

    @each $variation in $semanticColors {
      &.#{$variation} &__control:not(:disabled) + &__control-icon {
        fill: var(--#{$variation});
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop, Model } from 'vue-property-decorator'

  @Component({})
  export default class KnSelectList extends Vue {
    @Prop({ default: '' }) label!: string
    @Model('change', { default: '' }) value!: string

    noOptionsGiven = false

    private fallbackModel = ''

    get currentModel() {
      return this.value ? this.value : this.fallbackModel
    }
    set currentModel(newVal: string) {
      this.fallbackModel = newVal
      this.$emit('change', newVal)
    }

    private observer: MutationObserver | null = null

    mounted() {
      this.observer = new MutationObserver(async () => {
        // If a model is not defined, check to see if there's child options, and if so, set model to the first value
        const defaultSlot = this.$slots.default
        // console.log(defaultSlot)
        if (defaultSlot && defaultSlot.length > 0 && defaultSlot[0].elm) {
          this.noOptionsGiven = false

          //   this.currentModel = (defaultSlot[0].elm as HTMLOptionElement).value
          //   this.noOptionsGiven = false
          //   return
        }

        // If there is no model nor options, set to the default option
        // this.currentModel = 'default'
        // this.noOptionsGiven = true
      })

      this.observer.observe(this.$el.querySelector('.kn-input__control') as Node, {
        attributes: false,
        childList: true,
        characterData: true,
        subtree: true
      })

      // If a model is defined, the select should work as expected
      if (this.value) {
        return
      }

      // If a model is not defined, check to see if there's child options, and if so, set model to the first value
      const defaultSlot = this.$slots.default
      if (defaultSlot && defaultSlot.length > 0 && defaultSlot[0].elm) {
        this.currentModel = (defaultSlot[0].elm as HTMLOptionElement).value
        return
      }

      // If there is no model nor options, set to the default option
      this.currentModel = 'default'
      this.noOptionsGiven = true
    }

    beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect()
      }
    }
  }
</script>

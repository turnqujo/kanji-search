<template>
  <label :class="['kn-text-input', { 'kn-text-input--clearable': isClearable }]">
    <input class="kn-text-input__control" v-model="currentValue" :placeholder="placeholder" />
    <svg class="kn-icon kn-text-input__decorator">
      <use href="img/icons/solid.svg#terminal"></use>
    </svg>
    <svg class="kn-icon kn-text-input__decorator kn-text-input__decorator--invalid">
      <use href="img/icons/solid.svg#exclamation-circle"></use>
    </svg>
    <svg class="kn-icon kn-text-input__decorator kn-text-input__decorator--disabled">
      <use href="img/icons/solid.svg#minus-circle"></use>
    </svg>
    <button class="kn-text-input__decorator--clear" type="button" tabindex="-1" @click="onClear">
      <svg class="kn-icon">
        <use href="img/icons/solid.svg#backspace"></use>
      </svg>
    </button>
    <span class="kn-text-input__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
  @import '../theme/mixins/_transitions.scss';
  @import '../theme/_colors.scss';

  .kn-text-input {
    --select-icon-size: 1em;
    --label-offset: 1.3em;
    --control-border-width: 1px;
    --decorator-inset: 0.5em;
    display: inline-block;
    margin: var(--label-offset) 0 0.5em 0;
    position: relative;

    @each $variation in $semanticColors {
      &.#{$variation} &__control:not(:disabled) {
        border-color: var(--#{$variation});

        ~ .kn-text-input__decorator,
        ~ .kn-text-input__decorator--clear .kn-icon {
          fill: var(--#{$variation});
        }

        // TODO: How to better override this?
        ~ .kn-text-input__decorator--invalid {
          fill: var(--kn-error);
        }

        ~ .kn-text-input__label {
          color: var(--#{$variation});
        }

        ~ .kn-text-input__label::selection {
          background-color: var(--#{$variation});
          color: var(--kn-background);
        }

        &:focus {
          outline-color: var(--#{$variation});
        }
      }
    }

    // Input Control Styling
    &__control {
      --left-padding: calc(var(--decorator-inset) * 2 + var(--select-icon-size));
      --right-padding: calc(var(--control-border-width) + var(--decorator-inset) * 2 + var(--select-icon-size));
      @include quickTransition(border-color, color, background-color);
      appearance: none;
      background-color: transparent;
      border: var(--control-border-width) solid var(--kn-foreground);
      box-sizing: border-box;
      color: var(--kn-foreground);
      font-size: 1em;
      border-radius: 0;
      padding: 0.25em var(--right-padding) 0.25em var(--left-padding);
      height: 2em;
    }

    &__control:focus {
      outline: 1px solid var(--kn-foreground);
    }

    &__control:disabled {
      border-color: var(--kn-disabled);
      color: var(--kn-disabled);
    }

    // Icons (Decorators) styling
    &__decorator--clear .kn-icon,
    &__decorator.kn-icon {
      font-size: inherit;
      height: var(--select-icon-size);
      width: var(--select-icon-size);
    }

    &__decorator {
      left: calc(var(--decorator-inset));
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &--invalid {
        display: none;
        fill: var(--kn-error);
      }

      &--disabled {
        display: none;
        fill: var(--kn-disabled);
      }
    }

    &__control:disabled ~ &__decorator {
      display: none;

      &--disabled {
        display: block;
      }
    }

    &__control:invalid ~ &__decorator {
      display: none;

      &--invalid {
        display: block;
      }
    }

    // Clear button (also a decorator) styling
    &__decorator--clear {
      align-items: center;
      display: none;
      height: calc(100% - var(--control-border-width) * 2);
      justify-content: center;
      padding: 0 var(--decorator-inset);
      position: absolute;
      right: var(--control-border-width);
      top: var(--control-border-width);
    }

    &--clearable &__decorator--clear {
      display: flex;
    }

    &__decorator--clear .kn-icon {
      opacity: 0.2;
    }

    &__decorator--clear:hover .kn-icon,
    &__control:focus ~ &__decorator--clear .kn-icon {
      opacity: 1;
    }

    // Label styling
    &__label {
      left: 0;
      position: absolute;
      top: calc(var(--label-offset) * -1);
      white-space: nowrap;
    }

    &__control:focus ~ &__label {
      text-decoration: underline;
    }

    &__control:disabled ~ &__label {
      color: var(--kn-disabled);
      font-style: italic;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue, Prop, Model } from 'vue-property-decorator'

  @Component({})
  export default class KnTextInput extends Vue {
    @Model('change', { default: null }) value!: string
    @Prop({ default: '' }) label!: string
    @Prop({ default: '' }) placeholder!: string

    private fallbackValue = ''

    get currentValue(): string {
      if (this.value === null) {
        // v-model / :value are not defined, just use fallback
        return this.fallbackValue
      }

      if (this.value !== this.fallbackValue) {
        this.fallbackValue = this.value
        return this.value
      }

      return this.value ? this.value : this.fallbackValue
    }

    set currentValue(newVal: string) {
      this.fallbackValue = newVal
      this.$emit('change', newVal)
    }

    get isClearable(): boolean {
      return this.currentValue.length > 0
    }

    onClear() {
      this.currentValue = ''
      const control = this.$el.querySelector('.kn-text-input__control') as HTMLElement
      control.focus()
    }
  }
</script>

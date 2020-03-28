<template>
  <div class="text-input">
    <label class="text-input__label" :for="name" v-if="label">{{ label }}</label>
    <div class="text-input__control-container">
      <slot name="input-prefix"></slot>
      <input
        :id="name"
        :placeholder="placeholder"
        class="text-input__control"
        type="input"
        v-model.trim="currentValue"
      />
      <slot name="input-postfix"></slot>
    </div>
  </div>
</template>

<style lang="scss">
  .text-input {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;

    &__label {
      color: black;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    &__control-container {
      display: flex;
    }

    &__control {
      margin: 0 8px 0 8px;
    }
  }
</style>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component({})
  export default class TextInput extends Vue {
    @Prop({ required: true }) readonly name!: string | number
    @Prop({ default: null }) readonly label!: string
    @Prop({ default: '' }) readonly placeholder!: string
    @Prop({ default: '' }) readonly overrideValue!: string

    @Watch('overrideValue', { deep: false })
    overrideChanged(newVal: string) {
      this.realCurrentValue += newVal
      this.$emit('input', this.realCurrentValue)
    }

    private realCurrentValue = ''
    get currentValue(): string {
      return this.realCurrentValue
    }
    set currentValue(newVal: string) {
      this.realCurrentValue = newVal
      this.$emit('input', this.realCurrentValue)
    }
  }
</script>

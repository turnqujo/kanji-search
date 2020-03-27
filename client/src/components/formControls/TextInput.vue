<template>
  <div class="text-input">
    <label class="text-input__label" :for="name" v-if="label">{{ label }}</label>
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
</template>

<style lang="scss" scoped>
  .text-input {
    background-color: white;
    border-radius: 3px;
    padding: 8px;

    &__label {
      color: black;
      display: block;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
      text-align: center;
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
      this.currentValue = newVal
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

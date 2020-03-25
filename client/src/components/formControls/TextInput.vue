<template>
  <div class="text-input">
    <label class="text-input__label" :for="name" v-if="label">{{ label }}</label>
    <slot name="input-prefix"></slot>
    <input
      type="input"
      class="text-input__control"
      v-model.trim="currentValue"
      :placeholder="placeholder"
      :id="name"
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
  import { Component, Prop, Vue } from 'vue-property-decorator'

  // TODO: This computed value isn't working as I am expecting - definitely not
  //       using it correctly.
  @Component({
    computed: {
      currentValue: {
        get: function() {
          return ''
        },
        set: function(newValue: string) {
          this.$emit('input', newValue)
        }
      }
    }
  })
  export default class TextInput extends Vue {
    @Prop({ required: true }) name!: string | number
    @Prop({ default: null }) label!: string
    @Prop({ default: '' }) placeholder!: string
  }
</script>

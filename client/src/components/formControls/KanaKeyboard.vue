<template>
  <div>
    <button type="button" @click="onOpen">
      <span class="far fa-keyboard"></span>
    </button>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class KanaKeyboard extends Vue {
    onOpen() {
      console.log('click')
    }
  }
</script>

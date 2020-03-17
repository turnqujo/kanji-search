<template>
  <div class="kanji-card">
    <h2 class="header" v-once>
      <span class="char">{{ kanji.char }}</span>
      <span class="readings">{{ kanji.readings.join(', ') }}</span>
      <span class="stroke-count" v-once>{{
        Array.isArray(kanji.stroke)
          ? kanji.stroke.sort((x, y) => (x > y ? 1 : -1)).join(', ')
          : kanji.stroke
      }}</span>
    </h2>
    <p class="details">
      {{ kanji.meanings.join(', ') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .kanji-card {
    background-color: white;
    border-radius: 2px;
    border: 2px solid royalblue;
    overflow: hidden;

    .header {
      font-size: 16px;
      background-color: royalblue;
      color: white;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .char {
        font-size: 32px;
      }

      .stroke-count {
        height: 16px;
      }

      .char,
      .stroke-count {
        background-color: white;
        border-radius: 2px;
        color: royalblue;
        padding: 4px;
      }
    }

    .details {
      color: black;
      font-size: 16px;
      height: 60px;
      overflow-y: auto;
      padding: 4px;
      text-align: left;
      text-transform: capitalize;
    }
  }
</style>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Kanji } from '../../../shared/models/kanji'

  @Component({})
  export default class KanjiCard extends Vue {
    @Prop() private kanji!: Kanji
  }
</script>

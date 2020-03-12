<template>
  <div class="kanji-card">
    <h2 class="kanji" v-once>{{ kanji.char }}</h2>
    <p class="details">
      <strong class="detail-header readings">Readings: </strong><small>{{ kanji.readings.join(', ') }}</small>
      <strong class="detail-header meanings">Meanings: </strong><small>{{ kanji.meanings.join(', ') }}</small>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .kanji-card {
    border: 1px solid black;
    display: flex;
    width: 250px;
    box-sizing: border-box;

    .kanji {
      background-color: royalblue;
      color: white;
      height: 1em;
      padding: 2px;
    }

    .details {
      font-size: 14px;
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

<template>
  <div class="kanji-card">
    <h2 class="char" v-once>{{ kanji.char }}</h2>
    <ul class="metrics">
      <li class="metric-badge" v-if="kanji.frequency">
        <span class="metric-badge__label">Popularity:</span>
        <span class="metric-badge__data frequency" v-once>{{ kanji.frequency }}</span>
      </li>
      <li class="metric-badge" v-if="kanji.grade">
        <span class="metric-badge__label">Grade:</span>
        <span class="metric-badge__data grade" v-once>{{ kanji.grade }}</span>
      </li>
      <li class="metric-badge" v-if="kanji.jlpt">
        <span class="metric-badge__label">JLPT:</span>
        <span class="metric-badge__data jlpt" v-once>{{ kanji.jlpt }}</span>
      </li>
      <li class="metric-badge">
        <span class="metric-badge__label">Strokes:</span>
        <span class="metric-badge__data stroke" v-once>
          {{ Array.isArray(kanji.stroke) ? kanji.stroke.sort((x, y) => (x > y ? 1 : -1)).join(', ') : kanji.stroke }}
        </span>
      </li>
    </ul>
    <!-- TODO: the detail sections could be better structured -->
    <div class="details">
      <ul>
        <li class="detail" v-if="kanji.readings.on.length > 0">
          <span class="detail-label">On:&nbsp;</span>
          <span class="detail__content" v-once>{{ kanji.readings.on.join(', ') }}</span>
        </li>
        <li class="detail" v-if="kanji.readings.kun.length > 0">
          <span class="detail-label">Kun:&nbsp;</span>
          <span class="detail__content" v-once>{{ kanji.readings.kun.join(', ') }}</span>
        </li>
        <li class="detail" v-if="kanji.readings.nanori.length > 0">
          <span class="detail-label">Nanori:&nbsp;</span>
          <span class="detail__content" v-once>{{ kanji.readings.nanori.join(', ') }}</span>
        </li>
      </ul>
    </div>
    <div class="details">
      <h2 class="details__header">Meanings</h2>
      <span class="detail__content" v-once>{{ kanji.meanings.join(', ') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .kanji-card {
    border: 2px solid dodgerblue;
    display: flex;
    border-radius: 3px;
    overflow: hidden;
  }

  .char {
    font-size: 32px;
    color: white;
    background-color: dodgerblue;
    padding: 8px;
  }

  .metrics {
    padding: 4px 8px;
    flex: 1;
  }

  .metric-badge {
    align-items: center;
    display: flex;
    font-size: 12px;
    justify-content: space-between;

    &:not(:first-of-type) {
      margin-top: 4px;
    }

    &__label {
      font-size: 14px;
      margin-right: 8px;
    }

    &__data {
      border-radius: 4px;
      color: white;
      display: inline-block;
      font-weight: bold;
      min-width: 1em;
      padding: 4px;
      text-align: center;

      &.frequency {
        background-color: #f31f69;
      }

      &.grade {
        background-color: #af84f1;
      }

      &.jlpt {
        background-color: #1bc954;
      }

      &.stroke {
        background-color: #fe7711;
      }

      &:not(:first-of-type) {
        margin-left: 2px;
      }
    }
  }

  .details {
    border-left: 1px dashed black;
    padding: 4px 8px;
    flex: 4;

    &__header {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .detail__label {
    margin-right: 4px;
  }
</style>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Kanji } from '../models/kanji'

  @Component({})
  export default class KanjiCard extends Vue {
    @Prop() private kanji!: Kanji
  }
</script>

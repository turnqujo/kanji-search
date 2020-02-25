<template>
  <div class="kanji-card">
    <strong class="label">字</strong>
    <p class="meanings"></p>
    <p class="readings"></p>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue'
import { Kanji } from '../../../models/kanji'

@Component({})
export default class KanjiCard extends Vue {
  
}

// export default Vue.extend({
//   name: 'KanjiCard',
//   props: {
//     kanji
//   } as { kanji: Kanji }
// })
</script>

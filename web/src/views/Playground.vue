<template>
  <div class="playground">
    <h1>Hello, Playground!</h1>
    <div class="card-container">
      <kanji-card kanji=""></kanji-card>
      <kanji-card kanji=""></kanji-card>
      <kanji-card kanji=""></kanji-card>
      <kanji-card kanji=""></kanji-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  background-color: #eee;
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > .kanji-card {
    max-width: 250px;
  }
}
</style>

<script>
import KanjiCard from '../components/KanjiCard.vue'

export default {
  name: 'Playground',
  components: {
    KanjiCard
  }
}
</script>

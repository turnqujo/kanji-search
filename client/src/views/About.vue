<template>
  <div class="kn-about">
    <h1 class="kn-about__header">Kanji Search</h1>
    <h2 class="kn-about__header">What is this App for?</h2>
    <p>This app can be used to look up kanji based off of various options. Some example uses:</p>
    <ul class="kn-about__list">
      <li>Picking kanji for someone's name, based off of their sounds.</li>
      <li>Finding kanji with similar meanings.</li>
      <li>Just discovering new kanji for fun!</li>
    </ul>
    <h2 class="kn-about__header">Web Workers</h2>
    <p>
      Web Workers allow websites to run code alongside the app's main code. Kanji Search utilizes Web Workers to handle
      tasks such as filtering, sorting, and searching for kanji. Using Web Workers for these enables the app to go
      without having to talk with a server for each search.
    </p>
    <h2 class="kn-about__header">Data Sources</h2>
    <ul class="kn-about__list">
      <li>
        The kanji data, such as their character, meanings, readings, etc. were sourced from the
        <a href="http://www.edrdg.org/wiki/index.php/KANJIDIC_Project" target="_blank">KANJIDIC Project</a>, more
        specifically the KANJIDIC2 XML file. This file was parsed into JSON, keeping only the data relevant to the app.
      </li>
      <li>
        The frequency data (popularity of kanji) was derived from
        <a href="https://github.com/scriptin/kanji-frequency" target="_blank">this project</a>. More specifically, the
        <a href="https://github.com/scriptin/kanji-frequency/blob/master/data/wikipedia.json" target="_blank"
          >Wikipedia dump</a
        >. This data was referenced by a script which combined it with a set of kanji obtained from other sources.
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .kn-about {
    &__header:not(:first-child) {
      margin: 1em 0 0.5em 0;
    }

    // TODO: Turn this into a generic class
    &__list {
      margin-top: 0.5em;
      list-style: circle;
    }

    &__list > li {
      margin-left: 1em;
      margin-top: 0.3em;
    }

    @media screen and (min-width: 1280px) {
      width: 1280px;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class About extends Vue {}
</script>

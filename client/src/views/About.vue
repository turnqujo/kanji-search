<template>
  <div class="kn-about">
    <h1 class="kn-about__header">Kanji Search</h1>
    <ul>
      <li>
        <a
          href="https://github.com/turnqujo/kanji-search"
          target="_blank"
          title="View code on GitHub"
          class="kn-about__external-link"
        >
          <svg class="kn-icon">
            <use xlink:href="img/icons/brands.svg#github"></use></svg
          ><span class="kn-about__external-link__label">View the code on GitHub!</span></a
        >
      </li>
    </ul>
    <h2 class="kn-about__header">What is this App for?</h2>
    <p>This app can be used to look up kanji based off of various options. Some example uses:</p>
    <ul class="kn-about__list">
      <li>Picking kanji for someone's name, based off of their sounds.</li>
      <li>Finding kanji with similar meanings.</li>
      <li>Just discovering new kanji for fun!</li>
    </ul>
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
    max-width: 1280px;

    &__list {
      list-style: circle;
    }

    &__list > li {
      margin-left: 1em;
      margin-top: 0.3em;
    }

    &__external-link {
      align-items: center;
      display: flex;
      text-decoration: none;
      color: var(--kn-foreground);

      &__label {
        margin-left: 0.5em;
      }
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({})
  export default class About extends Vue {}
</script>

<template>
  <div>
    <search-form v-on:change="onSearchFormChanged"></search-form>
    <pick-list
      v-bind:kanji-set="kanjiSet"
      v-bind:romaji="enteredRomaji"
      v-on:onKanjiPicked="onPickedKanji"
    ></pick-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Kanji } from '../../../shared/models/kanji'
  import KanjiKeyboard from '@/components/KanjiKeyboard.vue'
  import PickList from '@/components/PickList.vue'
  import SearchForm from '@/components/SearchForm.vue'

  @Component({
    components: {
      SearchForm,
      KanjiKeyboard,
      PickList
    }
  })
  export default class HomeComponent extends Vue {
    public onSearchFormChanged(options: any) {
      console.log(options)
    }

    public kanjiSet: Kanji[] = []
    public enteredRomaji = ''

    public onFoundKanji(newKanji: Kanji[]) {
      this.kanjiSet = newKanji
    }

    public onRomajiEntered(romaji: string) {
      this.enteredRomaji = romaji
    }

    public onPickedKanji(picked: Kanji) {
      console.log(picked.char)
    }
  }
</script>

<template>
  <div>
    <kanji-keyboard
      v-on:foundKanji="onFoundKanji"
      v-on:romajiEntered="onRomajiEntered"
    ></kanji-keyboard>
    <pick-list
      v-bind:kanji-set="kanjiSet"
      v-bind:romaji="enteredRomaji"
      v-on:onKanjiPicked="onPickedKanji"
    ></pick-list>
  </div>
</template>

<script lang="ts">
  import KanjiKeyboard from '@/components/KanjiKeyboard.vue'
  import PickList from '@/components/PickList.vue'
  import { Component, Vue } from 'vue-property-decorator'
  import { Kanji } from '../../../shared/models/kanji'

  @Component({
    components: {
      KanjiKeyboard,
      PickList
    }
  })
  export default class HomeComponent extends Vue {
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

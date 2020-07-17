<template>
  <ul class="selection-container columns is-mobile">
    <li class="column is-narrow">
      <label class="kn-selection-item kn-radio">
        <input
          type="radio"
          name="dark-switch-radios"
          v-model="appearance"
          value="light"
          class="kn-selection-item__control"
        />
        <span class="kn-selection-item__label">
          <svg class="kn-icon">
            <use href="img/icons/regular.svg#sun"></use></svg
        ></span>
      </label>
    </li>
    <li class="column is-narrow">
      <label class="kn-selection-item kn-radio">
        <input
          type="radio"
          name="dark-switch-radios"
          v-model="appearance"
          value="dark"
          class="kn-selection-item__control"
        />
        <span class="kn-selection-item__label">
          <svg class="kn-icon">
            <use href="img/icons/regular.svg#moon"></use></svg
        ></span>
      </label>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .selection-container {
    // TODO: Why is this necessary?
    font-size: 0.5em;
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type AppearanceMode = 'dark' | 'light'

  @Component({})
  export default class DarkSwitch extends Vue {
    static storageKey = 'kn-theme-preference'

    private pAppearance: AppearanceMode | null = null
    get appearance() {
      return this.pAppearance
    }
    set appearance(newAppearance: AppearanceMode | null) {
      this.pAppearance = newAppearance

      const rootEle = document.querySelector(':root')
      newAppearance === 'dark' ? this.setDarkTheme(rootEle) : this.setLightTheme(rootEle)
    }

    mounted() {
      const rootEle = document.querySelector(':root')
      if (!rootEle) {
        this.appearance = 'dark'
        return
      }

      this.appearance = rootEle.hasAttribute('dark') ? 'dark' : 'light'
    }

    setLightTheme(ele: Element | null): void {
      ele?.removeAttribute('dark')
      localStorage.setItem(DarkSwitch.storageKey, 'light')
    }

    setDarkTheme(ele: Element | null): void {
      ele?.setAttribute('dark', 'true')
      localStorage.setItem(DarkSwitch.storageKey, 'dark')
    }
  }
</script>

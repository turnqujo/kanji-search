<template>
  <ul class="selection-container">
    <li>
      <label class="kn-selection-item kn-radio">
        <input
          type="radio"
          name="dark-switch-radios"
          v-model="appearance"
          value="light"
          class="kn-selection-item__control"
        />
        <span class="kn-selection-item__label">Light</span>
      </label>
    </li>
    <li>
      <label class="kn-selection-item kn-radio">
        <input
          type="radio"
          name="dark-switch-radios"
          v-model="appearance"
          value="dark"
          class="kn-selection-item__control"
        />
        <span class="kn-selection-item__label">Dark</span>
      </label>
    </li>
  </ul>
</template>

<style lang="scss">
  .selection-container {
    display: flex;

    & > li:not(:first-of-type) {
      margin-left: 12px;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type AppearanceMode = 'dark' | 'light'

  @Component({})
  export default class DarkSwitch extends Vue {
    static themeStorageKey = 'kn-theme-preference'

    private pAppearance: AppearanceMode | null = null
    get appearance() {
      return this.pAppearance
    }
    set appearance(newAppearance: AppearanceMode | null) {
      this.pAppearance = newAppearance

      const rootEle = document.querySelector(':root')
      if (newAppearance === 'dark') {
        this.setDarkTheme(rootEle)
        return
      }

      this.setLightTheme(rootEle)
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
      localStorage.setItem(DarkSwitch.themeStorageKey, 'light')
    }

    setDarkTheme(ele: Element | null): void {
      ele?.setAttribute('dark', 'true')
      localStorage.setItem(DarkSwitch.themeStorageKey, 'dark')
    }
  }
</script>

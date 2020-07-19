<template>
  <div class="kn-animation-toggle">
    <p class="kn-animation-toggle__title">Toggle Animation</p>
    <ul class="kn-animation-toggle__controls columns">
      <li class="column is-narrow">
        <label class="kn-selection-item kn-radio">
          <input
            type="radio"
            name="animation-switch-radios"
            v-model="animationEnabled"
            value="enabled"
            class="kn-selection-item__control"
          />
          <span class="kn-selection-item__label">On</span>
        </label>
      </li>
      <li class="column is-narrow">
        <label class="kn-selection-item kn-radio">
          <input
            type="radio"
            name="animation-switch-radios"
            v-model="animationEnabled"
            value="disabled"
            class="kn-selection-item__control"
          />
          <span class="kn-selection-item__label">Off</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .kn-animation-toggle {
    &__controls {
      margin-top: 0.5em;
    }
  }
</style>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  type AnimationMode = 'enabled' | 'disabled'

  @Component({})
  export default class AnimationSwitch extends Vue {
    static storageKey = 'kn-animation-preference'

    private pAnimationEnabled: AnimationMode | null = null
    get animationEnabled() {
      return this.pAnimationEnabled
    }
    set animationEnabled(newVal: AnimationMode | null) {
      this.pAnimationEnabled = newVal

      const rootEle = document.querySelector(':root')
      newVal === 'enabled' ? this.enableAnimations(rootEle) : this.disableAnimations(rootEle)
    }

    mounted() {
      const storedPreference = localStorage.getItem(AnimationSwitch.storageKey)
      if (storedPreference !== null && ['enabled', 'disabled'].indexOf(storedPreference) > -1) {
        this.animationEnabled = storedPreference as AnimationMode
        return
      }

      this.animationEnabled = 'enabled'
    }

    enableAnimations(ele: Element | null): void {
      ele?.classList.remove('transitions-disabled')
      localStorage.setItem(AnimationSwitch.storageKey, 'enabled')
    }

    disableAnimations(ele: Element | null): void {
      ele?.classList.add('transitions-disabled')
      localStorage.setItem(AnimationSwitch.storageKey, 'disabled')
    }
  }
</script>

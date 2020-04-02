<script lang="ts">
  import Vue from 'vue'
  import { DirectiveBinding } from 'vue/types/options'

  const bodyListeners: ((e: MouseEvent) => void)[] = []
  function registerBodyListener(listener: (e: MouseEvent) => void) {
    bodyListeners.push(listener)
    return bodyListeners.indexOf(listener)
  }

  export default Vue.directive('clickElsewhere', {
    bind(element: HTMLElement, binding: DirectiveBinding) {
      let first = true

      const listenerId = registerBodyListener((e: MouseEvent) => {
        const clickedNode = e.target as Node
        if (element.contains(clickedNode)) {
          return
        }

        if (first) {
          first = false
          return
        }

        binding.value()
      })

      element.dataset.clickElsewhereId = String(listenerId)
      window.addEventListener('click', bodyListeners[listenerId])
    },
    unbind: function(element: HTMLElement) {
      const listenerId = Number(element.dataset.clickElsewhereId)
      const listener = bodyListeners[listenerId]
      window.removeEventListener('click', listener)
      element.dataset.clickElsewhereId = undefined
    }
  })
</script>

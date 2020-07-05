import './registerServiceWorker'
import './theme/index.scss'
import App from './App.vue'
import router from './router'
import Vue from 'vue'

const rootEle = document.querySelector(':root')
if (rootEle) {
  if (localStorage.getItem('kn-theme-preference') === 'dark') {
    rootEle.setAttribute('dark', 'true')
  }

  const fontSizePreference = localStorage.getItem('kn-font-size-preference')
  if (fontSizePreference && ['xsmall', 'small', 'medium', 'large', 'xlarge'].indexOf(fontSizePreference) > -1) {
    rootEle.setAttribute('font-size', fontSizePreference)
  }

  const animationPreference = localStorage.getItem('kn-animation-preference')
  if (animationPreference === 'disabled') {
    rootEle.classList.add('transitions-disabled')
  }
}

Vue.config.productionTip = false

window.onload = () =>
  new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app')

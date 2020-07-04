import './theme/index.scss'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Kanji } from './models/kanji'

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

// TODO: This is not the best place for these
function fetchAllKanji(): Promise<any> {
  return fetch('data/allKanji.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .catch((e) => console.error(e))
}

function init(allKanji: Kanji[]) {
  new Promise((resolve, reject) => {
    indexedDB.deleteDatabase('kanjiStore')

    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onupgradeneeded = async () => {
      const kanjiStore = openRequest.result.createObjectStore('kanji', {
        keyPath: 'char'
      })

      allKanji.forEach((kanji: Kanji) => kanjiStore.add(kanji))

      openRequest.result.close()
      resolve(true)
    }

    openRequest.onblocked = () => {
      openRequest.result.close()
      reject('Blocked')
    }

    openRequest.onerror = (e) => {
      reject(e)
    }

    openRequest.onsuccess = () => {
      openRequest.result.close()
      resolve(true)
    }
  })
}

window.onload = () =>
  fetchAllKanji()
    .then((allKanji) => init(allKanji))
    .finally(function() {
      new Vue({
        router,
        render: (h) => h(App)
      }).$mount('#app')
    })

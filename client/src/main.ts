import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Kanji } from './models/kanji'

// @ts-ignore TODO: This is actually loading fine
import jinmeiyoo from './data/jinmeiyoo.json'

Vue.config.productionTip = false

// TODO: This is not the best place for this
async function init() {
  await new Promise((resolve, reject) => {
    indexedDB.deleteDatabase('kanjiStore')

    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onupgradeneeded = () => {
      const storedKanji = openRequest.result.createObjectStore('kanji', {
        keyPath: 'char'
      })

      storedKanji.createIndex('stroke', 'stroke', { unique: false })
      storedKanji.createIndex('meanings', 'meanings', {
        unique: false,
        multiEntry: true
      })
      storedKanji.createIndex('readings', 'readings', { unique: false })

      jinmeiyoo.forEach((kanji: Kanji) => storedKanji.add(kanji))

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

  new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app')
}
init()

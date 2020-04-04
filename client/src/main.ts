import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Kanji } from './models/kanji'

// @ts-ignore TODO: This is actually loading fine
import jinmeiyoo from './data/jinmeiyoo.json'

// @ts-ignore TODO: This is actually loading fine
import jooyoo from './data/joyo.json'

Vue.config.productionTip = false

// TODO: This is not the best place for this
async function init() {
  await new Promise((resolve, reject) => {
    indexedDB.deleteDatabase('kanjiStore')

    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onupgradeneeded = () => {
      const storedJooyooKanji = openRequest.result.createObjectStore('kanji-jooyoo', {
        keyPath: 'char'
      })

      storedJooyooKanji.createIndex('stroke', 'stroke', { unique: false })
      storedJooyooKanji.createIndex('meanings', 'meanings', {
        unique: false,
        multiEntry: true
      })
      storedJooyooKanji.createIndex('readings', 'readings', { unique: false })

      jooyoo.forEach((kanji: Kanji) => storedJooyooKanji.add(kanji))

      const storedJinmeiyooKanji = openRequest.result.createObjectStore('kanji-jinmeiyoo', {
        keyPath: 'char'
      })

      storedJinmeiyooKanji.createIndex('stroke', 'stroke', { unique: false })
      storedJinmeiyooKanji.createIndex('meanings', 'meanings', {
        unique: false,
        multiEntry: true
      })
      storedJinmeiyooKanji.createIndex('readings', 'readings', { unique: false })

      jinmeiyoo.forEach((kanji: Kanji) => storedJinmeiyooKanji.add(kanji))

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

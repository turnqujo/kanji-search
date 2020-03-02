import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

// TODO: Forcing things like webworker scope and indexedDB population here, don't need to
async function init() {
  await new Promise((resolve, reject) => {
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

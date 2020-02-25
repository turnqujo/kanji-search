/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

/*
 * TODO
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    new Promise((resolve, reject) => {
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
  )
})
*/

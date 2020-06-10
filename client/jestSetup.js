class Worker {
  constructor(stringUrl) {
    this.url = stringUrl
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onmessage = () => {}
  }

  postMessage(msg) {
    this.onmessage(msg)
  }
}

window.Worker = Worker

// NOTE: From this article: https://www.npmjs.com/package/jest-fetch-mock
// adds the 'fetchMock' global variable and rewires 'fetch' global to call 'fetchMock' instead of the real implementation
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()
// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.dontMock()

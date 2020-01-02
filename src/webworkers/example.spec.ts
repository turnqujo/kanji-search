import { loadWorker } from "../../test-utils/webworker"

describe('The Example Webworker', () => {
  it('Should have sanity', async done => {
    const worker = loadWorker('example.js')

    const response = await new Promise(resolve => {
      worker.onmessage = data => resolve(data)
      worker.postMessage(2)
    })

    worker.terminate()

    expect(response).toEqual({data: 4})
    done()
  })
})

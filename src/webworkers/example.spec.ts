import JestWorker from "../../test-utils/jest-worker"

describe('The Example Webworker', () => {
  it('Should have sanity', async done => {
    const worker = new JestWorker('src/webworkers/example.ts')

    const response = await new Promise(resolve => {
      worker.onmessage = (data: any) => resolve(data)
      worker.postMessage(2)
    })

    worker.terminate()

    expect(response).toEqual({data: 200})
    done()
  })
})
